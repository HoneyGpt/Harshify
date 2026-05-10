// server.ts - Express + Socket.IO (Standalone)
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { setupSocket } from './src/lib/socket';
import { spawn } from 'child_process';
import axios from 'axios';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  path: '/api/socketio',
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const currentPort = Number(process.env.PORT) || 3001;

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://melodymentor.netlify.app',
    'https://melodymentor.mentozy.app'
  ],
  credentials: true
}));
app.use(express.json());

// --- Types ---
interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  preview: string;
  isFavorite: boolean;
  source: string;
}

// --- Helper for Python Bridge ---
const runPythonBridge = (command: string, args: string[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Try python3 first (standard on Linux/Render), fallback to python
    const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
    const python = spawn(pythonCmd, ['yt_bridge.py', command, ...args]);
    
    let data = '';
    let error = '';

    python.stdout.on('data', (chunk) => {
      data += chunk.toString();
    });

    python.stderr.on('data', (chunk) => {
      error += chunk.toString();
    });

    python.on('close', (code) => {
      if (code !== 0) {
        console.error(`Python script failed (${pythonCmd}): ${error}`);
        reject(new Error(`Python script failed with code ${code}`));
        return;
      }
      try {
        if (data.trim().startsWith('[') || data.trim().startsWith('{')) {
          resolve(JSON.parse(data));
        } else {
          resolve(data.trim());
        }
      } catch (e) {
        resolve(data.trim());
      }
    });
  });
};

// --- Routes ---

app.get('/api/songs', async (req, res) => {
  const query = (req.query.search as string) || "trending hits 2024 global";
  
  try {
    // We are now ONLY using YouTube to guarantee full-length, unlimited songs
    const youtube = await runPythonBridge('search', [query]);
    res.json({ songs: youtube.slice(0, 50) });
  } catch (e) {
    console.error("Search error:", e);
    res.status(500).json({ error: "Failed to fetch songs", details: e instanceof Error ? e.message : String(e) });
  }
});

// Endpoint to stream audio directly through the server (fixes IP mismatch & CORS)
app.get('/api/stream', async (req, res) => {
  const videoId = req.query.id as string;
  if (!videoId) return res.status(400).json({ error: "Missing video id" });

  try {
    const streamUrl = await runPythonBridge('stream', [videoId]);
    if (!streamUrl) throw new Error("Failed to resolve stream URL");

    // Proxy the stream to the client
    const response = await axios({
      method: 'get',
      url: streamUrl,
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.youtube.com/'
      }
    });

    res.setHeader('Content-Type', 'audio/mpeg');
    response.data.pipe(res);
  } catch (e) {
    console.error("Streaming error:", e);
    res.status(500).json({ error: "Failed to stream audio", details: e instanceof Error ? e.message : String(e) });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'express', python: 'active' });
});

setupSocket(io);

server.listen(currentPort, () => {
  console.log(`> API Server ready on port ${currentPort}`);
});

// server.ts - Express + Socket.IO (Standalone)
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { setupSocket } from './src/lib/socket';
import { spawn } from 'child_process';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  path: '/api/socketio',
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const currentPort = 3001; // Use 3001 for API, Vite will proxy to it
const hostname = '127.0.0.1';

app.use(cors());
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

// Obsolete Python bridge removed

// --- Ported API Logic ---

const fetchFromJioSaavn = async (query: string): Promise<Song[]> => {
  try {
    const response = await fetch(`http://127.0.0.1:5100/result/?query=${encodeURIComponent(query)}`);
    if (response.ok) {
      const data = await response.json();
      if (!Array.isArray(data)) return [];
      return data.map((track: any) => ({
        id: `jiosaavn_${track.id}`,
        title: track.song || track.title || 'Unknown',
        artist: track.singers || track.primary_artists || 'Unknown Artist',
        album: track.album || 'Unknown Album',
        duration: track.duration ? 
          `${Math.floor(parseInt(track.duration) / 60)}:${Math.floor(parseInt(track.duration) % 60).toString().padStart(2, '0')}` : 
          '0:00',
        coverUrl: track.image || track.image_url || `https://via.placeholder.com/600`,
        preview: track.media_url || track.url,
        isFavorite: false,
        source: 'jiosaavn'
      }));
    }
    return [];
  } catch (error) {
    console.error("JioSaavn API error:", error);
    return [];
  }
};

const getPopularSongs = (): Song[] => [
  { id: 'popular_husn', title: 'Husn', artist: 'Anuv Jain', album: 'Husn', duration: '3:19', coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734c5c432d73af64860d7d5d2e', preview: 'https://cdns-preview-4.dzcdn.net/stream/c-4e4b1b1c2f0b7a4b5e8c7b8d9e5f5a6-3.mp3', isFavorite: false, source: 'popular' },
  { id: 'popular_seven', title: 'Seven', artist: 'Jungkook ft. Latto', album: 'Seven', duration: '3:04', coverUrl: 'https://i.scdn.co/image/ab67616d0000b2738c5c432d73af64860d7d5e3f', preview: 'https://cdns-preview-5.dzcdn.net/stream/c-5f5c2c2d3g1c8b5c9d8c8e9f0a6b7c7-4.mp3', isFavorite: false, source: 'popular' }
];

// --- Routes ---

app.get('/api/songs', async (req, res) => {
  const query = req.query.search as string;
  let songs: Song[] = [];

  if (query && query.trim() !== '') {
    try {
      songs = await fetchFromJioSaavn(query);
      songs = songs.slice(0, 30);
    } catch (e) {
      console.error("Search error:", e);
    }
  } else {
    songs = getPopularSongs();
  }

  res.json({ songs });
});

// Endpoint to get full audio stream URL
app.get('/api/stream', async (req, res) => {
  // Since JioSaavn provides the direct media_url in the search results,
  // we can just echo it back or the frontend can skip this endpoint.
  // We'll keep it for backwards compatibility if needed, but it's largely obsolete.
  const videoId = req.query.id as string;
  if (!videoId) return res.status(400).json({ error: "Missing video id" });

  res.json({ url: videoId }); 
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'express', python: 'active' });
});

// Setup Socket.IO
setupSocket(io);

// Start the server
server.listen(currentPort, hostname, () => {
  console.log(`> API Server ready on http://${hostname}:${currentPort}`);
  console.log(`> JioSaavn API Bridge active on port 5100`);
});

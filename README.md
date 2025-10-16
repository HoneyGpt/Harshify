# 🎵 Harshify - Your Personal Music Discovery Platform

A beautiful, feature-rich music streaming application with Spotify integration, real-time search, and AI-powered song analysis.

## ✨ Features

### 🎵 Core Music Features
- **Multi-Platform Search**: Search across 9 music platforms (Spotify, iTunes, Deezer, Jamendo, Last.fm, SoundCloud, YouTube Music, Bandcamp, Popular Database)
- **Real Spotify Integration**: Authentic Spotify API integration with client credentials
- **Floating Song Cards**: Beautiful floating cards with detailed song information
- **Preview Playback**: Play 30-second previews directly from the app
- **Favorites System**: Save your favorite songs with persistent storage

### 🎨 Floating Card Features
- **Three Information Tabs**:
  - **Details**: Track information, album details, audio features visualization
  - **Lyrics**: Full song lyrics from multiple APIs
  - **AI Analysis**: Intelligent song analysis using AI
- **Audio Features Visualization**: Danceability, energy, valence, tempo with progress bars
- **Direct Spotify Integration**: Open songs directly in Spotify
- **Gradient Headers**: Beautiful artwork display with song information

### 🌍 International Music Library
- **40+ Popular Songs**: Curated database of international hits
- **Bollywood, K-Pop, Latin, Western, African, European, Middle Eastern, Japanese, Chinese, Russian**
- **Smart Deduplication**: Removes duplicates with source priority
- **Color-Coded Sources**: Visual badges for each music platform

### 🤖 AI-Powered Features
- **Song Analysis**: Genre, mood, and what makes each song special
- **Intelligent Search**: Multi-strategy search across platforms
- **Lyrics Integration**: Multiple lyrics APIs with fallback services

### 🎯 User Experience
- **Responsive Design**: Works perfectly on all devices
- **Keyboard Shortcuts**: Space (play/pause), ← → (seek), ↑ ↓ (volume), F (favorite)
- **Smooth Animations**: Beautiful transitions and micro-interactions
- **Dark/Light Theme**: Easy theme switching
- **Real-time Search**: Instant results as you type

## 🚀 Technology Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript 5** for type safety
- **Tailwind CSS 4** for styling
- **shadcn/ui** components
- **Framer Motion** for animations
- **Zustand** for state management

### Backend & APIs
- **Spotify Web API** with real authentication
- **iTunes/Apple Music API**
- **Deezer API**
- **Jamendo API**
- **Last.fm API**
- **Multiple Lyrics APIs**
- **Z.ai Web Dev SDK** for AI analysis

### Database & Storage
- **Prisma ORM** with SQLite
- **LocalStorage** for favorites persistence
- **Real-time audio streaming**

## 🎵 Music Sources

| Platform | Features | Access |
|----------|----------|---------|
| **Spotify** | Full track data, audio features, previews | ✅ Real API |
| **iTunes** | Comprehensive catalog, preview URLs | ✅ Available |
| **Deezer** | Radio, top tracks, album data | ✅ Available |
| **Jamendo** | Full audio tracks, independent artists | ✅ Available |
| **Last.fm** | Music discovery, recommendations | ✅ Available |
| **Popular Database** | Curated international hits | ✅ Available |
| **SoundCloud** | Independent artists, exclusives | 🔄 Mock |
| **YouTube Music** | Official videos, live versions | 🔄 Mock |
| **Bandcamp** | Independent music support | 🔄 Mock |

## 🎨 Visual Features

### Source Badges
- 🟢 **Spotify** - Green badge for official Spotify tracks
- 🔵 **iTunes** - Blue badge for Apple Music catalog
- 🟣 **Deezer** - Purple badge for Deezer tracks
- 🟦 **Jamendo** - Teal badge for independent music
- 🩷 **Popular** - Pink badge for curated hits
- 🔴 **Last.fm** - Red badge for music discovery
- 🟠 **SoundCloud** - Orange badge for indie content
- 🔴 **YouTube** - Red badge for video content
- 🔵 **Bandcamp** - Blue badge for artist support

### Audio Features Visualization
- **Danceability**: Yellow to orange gradient
- **Energy**: Yellow to orange gradient  
- **Valence**: Green to blue gradient
- **Acousticness**: Amber to orange gradient
- **Tempo**: Blue to purple gradient
- **Instrumentalness**: Blue to purple gradient
- **Liveness**: Blue to purple gradient
- **Speechiness**: Blue to purple gradient

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/HoneyGpt/Harshify.git
cd Harshify

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser
# Navigate to http://localhost:3000
```

## 🎮 How to Use

### Basic Usage
1. **Search for any song** using the search bar
2. **Click on any song** to open the floating card
3. **Play preview** directly from the floating card
4. **Add to favorites** with the heart button
5. **Switch between tabs** for details, lyrics, and AI analysis

### Keyboard Shortcuts
- **Space**: Play/Pause current track
- **← / →**: Seek backward/forward 10 seconds
- **↑ / ↓**: Volume up/down
- **F**: Add current track to favorites

### Advanced Features
- **Multi-source search**: Results from 9 different platforms
- **Smart filtering**: Automatic deduplication and relevance sorting
- **Detailed analysis**: Audio features and AI-powered insights
- **Direct integration**: Open tracks in Spotify for full experience

## 🎵 Featured Songs

The app includes a curated selection of international hits:

### Bollywood
- Husn - Anuv Jain
- Chinnari Talli - Ghantasala
- Tum Hi Ho - Arijit Singh
- Dilbar - Neha Kakkar

### K-Pop
- Seven - Jungkook ft. Latto
- Dynamite - BTS
- Gangnam Style - PSY
- Kill This Love - BLACKPINK

### Latin/Reggaeton
- Despacito - Luis Fonsi ft. Daddy Yankee
- Bichota - KAROL G
- Dákiti - Bad Bunny & Jhay Cortez

### Western Pop
- Blinding Lights - The Weeknd
- Shape of You - Ed Sheeran
- Lemon - N.E.R.D & Rihanna
- Watermelon Sugar - Harry Styles

### And many more from African, European, Middle Eastern, Japanese, Chinese, and Russian music!

## 🔧 Development

### Project Structure
```
src/
├── app/
│   ├── api/
│   │   ├── songs/          # Music search API
│   │   └── song-details/   # Song details API
│   └── page.tsx            # Main application
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── SongFloatingCard.tsx # Floating song card
└── lib/
    └── db.ts               # Database configuration
```

### API Endpoints
- `GET /api/songs?search={query}` - Search for songs
- `GET /api/song-details?trackId={id}&artist={artist}&title={title}` - Get detailed song information

### Environment Variables
Create a `.env.local` file for additional configuration:
```env
# Spotify API (already configured)
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret

# Additional API keys (optional)
LASTFM_API_KEY=your_lastfm_key
```

## 🎨 Customization

### Adding New Music Sources
1. Create a new fetch function in `src/app/api/songs/route.ts`
2. Add the source to the `getSourceIcon` function
3. Update the source priority in the search results

### Styling
- Modify Tailwind classes in components
- Update color schemes in CSS variables
- Add new animations with Framer Motion

### Features
- Add new tabs to the floating card
- Implement additional audio features
- Create new API endpoints for extended functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Spotify** for the amazing Web API
- **Z.ai** for the AI-powered analysis capabilities
- **shadcn/ui** for the beautiful component library
- **All music platforms** for providing access to their catalogs

## 🎵 Built with ❤️ for Music Lovers

Created with passion for music discovery and enhanced by [Z.ai](https://claude.ai/code) 🚀

---

**Harshify** - Where every song tells a story, and every story deserves to be heard. 🎶✨
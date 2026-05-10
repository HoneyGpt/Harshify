from flask import Flask, request, jsonify
import os
import sys
# Add the current directory to sys.path to allow importing local modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import jiosaavn
import math
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def format_duration(duration_seconds):
    if not duration_seconds:
        return "0:00"
    try:
        total_seconds = int(duration_seconds)
        minutes = total_seconds // 60
        seconds = total_seconds % 60
        return f"{minutes}:{seconds:02d}"
    except:
        return "0:00"

def map_jiosaavn_to_song(track):
    return {
        "id": f"jiosaavn_{track.get('id', 'unknown')}",
        "title": track.get('song') or track.get('title') or 'Unknown',
        "artist": track.get('singers') or track.get('primary_artists') or 'Unknown Artist',
        "album": track.get('album') or 'Unknown Album',
        "duration": format_duration(track.get('duration')),
        "coverUrl": track.get('image') or track.get('image_url') or "https://via.placeholder.com/600",
        "preview": track.get('media_url') or track.get('url') or "",
        "isFavorite": False,
        "source": "jiosaavn"
    }

@app.route('/api/songs')
def get_songs():
    query = request.args.get('search')
    if query and query.strip():
        try:
            results = jiosaavn.search_for_song(query, False, True)
            if isinstance(results, list):
                songs = [map_jiosaavn_to_song(t) for t in results[:30]]
                return jsonify({"songs": songs})
            return jsonify({"songs": []})
        except Exception as e:
            return jsonify({"songs": [], "error": str(e)}), 500
    else:
        # Default popular songs (matching server.ts)
        popular = [
            { "id": 'popular_husn', "title": 'Husn', "artist": 'Anuv Jain', "album": 'Husn', "duration": '3:19', "coverUrl": 'https://i.scdn.co/image/ab67616d0000b2734c5c432d73af64860d7d5d2e', "preview": 'https://cdns-preview-4.dzcdn.net/stream/c-4e4b1b1c2f0b7a4b5e8c7b8d9e5f5a6-3.mp3', "isFavorite": False, "source": 'popular' },
            { "id": 'popular_seven', "title": 'Seven', "artist": 'Jungkook ft. Latto', "album": 'Seven', "duration": '3:04', "coverUrl": 'https://i.scdn.co/image/ab67616d0000b2738c5c432d73af64860d7d5e3f', "preview": 'https://cdns-preview-5.dzcdn.net/stream/c-5f5c2c2d3g1c8b5c9d8c8e9f0a6b7c7-4.mp3', "isFavorite": False, "source": 'popular' }
        ]
        return jsonify({"songs": popular})

@app.route('/api/stream')
def get_stream():
    video_id = request.args.get('id')
    return jsonify({"url": video_id})

@app.route('/api/health')
def health():
    return jsonify({"status": "ok", "server": "serverless-python"})

@app.route('/api/modules')
def get_modules():
    languages = request.args.get('language', 'english,hindi')
    data = jiosaavn.get_home_data(languages)
    if not data:
        return jsonify({"trending": [], "charts": []})
    
    trending = []
    if 'new_trending' in data:
        trending = [map_jiosaavn_to_song(t) for t in data['new_trending']]
    
    charts = []
    if 'charts' in data:
        for chart in data['charts']:
            charts.append({
                "id": chart.get('id'),
                "title": chart.get('title'),
                "image": chart.get('image'),
                "subtitle": chart.get('subtitle'),
                "type": chart.get('type'),
                "perma_url": chart.get('perma_url')
            })
            
    return jsonify({
        "trending": trending,
        "charts": charts
    })

@app.route('/api/playlist')
def get_playlist_songs():
    list_id = request.args.get('id')
    if not list_id:
        return jsonify({"songs": []})
    data = jiosaavn.get_playlist(list_id, False)
    if data and 'songs' in data:
        songs = [map_jiosaavn_to_song(t) for t in data['songs']]
        return jsonify({"songs": songs, "name": data.get('listname')})
    return jsonify({"songs": []})

# For local development
if __name__ == '__main__':
    app.run(port=3001)

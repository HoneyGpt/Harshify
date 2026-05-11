import sys
import os
# Add the current directory to sys.path to allow importing local modules
sys.path.append(os.path.join(os.getcwd(), 'api'))
import jiosaavn
import json

try:
    results = jiosaavn.search_for_song('trending', False, True)
    print(json.dumps(results[:1], indent=2))
except Exception as e:
    print(f"Error: {e}")

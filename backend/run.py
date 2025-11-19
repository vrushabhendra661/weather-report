#!/usr/bin/env python
"""
Script to run the Flask backend server with proper configuration
"""
import os
import sys

# Add the backend directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import app

if __name__ == '__main__':
    print("=" * 50)
    print("Weather Dashboard Backend Server")
    print("=" * 50)
    print(f"Starting server on http://localhost:5000")
    print("Press CTRL+C to quit")
    print("=" * 50)
    
    app.run(
        debug=True,
        host='0.0.0.0',
        port=5000
    )


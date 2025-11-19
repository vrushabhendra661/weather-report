# 🚀 Quick Setup Guide

This guide will help you set up and run the Weather Dashboard application in minutes.

## 📋 Prerequisites Checklist

Before you begin, make sure you have:

- [ ] Python 3.8 or higher installed
- [ ] Node.js 16.x or higher installed
- [ ] Git installed
- [ ] A free OpenWeatherMap API key ([Get it here](https://openweathermap.org/api))

### Check Your Installations

```bash
# Check Python version
python --version  # or python3 --version

# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

## 🎯 Quick Start (Automated Setup)

### For Windows Users

1. **Run the setup script:**
   ```bash
   setup.bat
   ```

2. **Add your API key:**
   - Open `backend/.env`
   - Replace `your_api_key_here` with your actual OpenWeatherMap API key

3. **Start the application:**
   ```bash
   start.bat
   ```

4. **Access the app:**
   - Open your browser
   - Navigate to `http://localhost:3000`

### For macOS/Linux Users

1. **Make scripts executable:**
   ```bash
   chmod +x setup.sh start.sh
   ```

2. **Run the setup script:**
   ```bash
   ./setup.sh
   ```

3. **Add your API key:**
   - Open `backend/.env`
   - Replace `your_api_key_here` with your actual OpenWeatherMap API key

4. **Start the application:**
   ```bash
   ./start.sh
   ```

5. **Access the app:**
   - Open your browser
   - Navigate to `http://localhost:3000`

## 🔧 Manual Setup (Step by Step)

If you prefer manual setup or if the automated scripts don't work:

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
# Windows:
echo OPENWEATHER_API_KEY=your_api_key_here > .env
# macOS/Linux:
echo "OPENWEATHER_API_KEY=your_api_key_here" > .env

# Edit the .env file and add your actual API key
```

### Step 2: Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

### Step 3: Get Your OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. Navigate to "API Keys" section
4. Copy your API key
5. Paste it in `backend/.env` file

### Step 4: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
# Activate virtual environment first
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Access the Application

Open your browser and go to:
```
http://localhost:3000
```

## ✅ Verification

### Backend Verification

1. **Check if backend is running:**
   ```bash
   curl http://localhost:5000
   ```

2. **Test weather endpoint:**
   ```bash
   curl "http://localhost:5000/api/weather?city=London"
   ```

### Frontend Verification

1. Open `http://localhost:3000` in your browser
2. You should see the Weather Dashboard interface
3. Try searching for a city (e.g., "London", "Paris", "Tokyo")

## 🧪 Running Tests

### Backend Tests

```bash
cd backend
# Activate virtual environment first
pytest test_app.py -v
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 🐛 Common Issues & Solutions

### Issue 1: Port Already in Use

**Problem:** Backend port 5000 or Frontend port 3000 is already in use

**Solution:**

Windows:
```bash
# Find process using port
netstat -ano | findstr :5000
# Kill the process
taskkill /PID <process_id> /F
```

macOS/Linux:
```bash
# Find and kill process using port
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### Issue 2: Python Virtual Environment Issues

**Problem:** Virtual environment activation fails

**Solution:**
```bash
# Recreate virtual environment
rm -rf venv  # or rmdir /s venv on Windows
python -m venv venv
```

### Issue 3: API Key Invalid

**Problem:** Getting "API key invalid" errors

**Solution:**
1. Double-check your API key in `backend/.env`
2. Make sure there are no extra spaces
3. Wait a few minutes (new API keys can take time to activate)
4. Verify the key at OpenWeatherMap dashboard

### Issue 4: CORS Errors

**Problem:** Frontend can't connect to backend

**Solution:**
1. Make sure backend is running on port 5000
2. Check that Flask-CORS is installed: `pip install flask-cors`
3. Restart both backend and frontend

### Issue 5: Database Errors

**Problem:** SQLAlchemy database errors

**Solution:**
```bash
# Delete existing database
cd backend
rm weather_history.db  # or del weather_history.db on Windows

# Restart the backend (database will be recreated)
python app.py
```

## 📱 Testing the Application

### Test Checklist

- [ ] Search for a valid city (e.g., "London")
- [ ] Verify weather data is displayed correctly
- [ ] Check that search history appears
- [ ] Click on a history item to search again
- [ ] Test error handling with an invalid city name
- [ ] Try clearing search history
- [ ] Test on mobile/tablet view (resize browser)

### Sample Cities to Test

- London
- Paris
- Tokyo
- New York
- Sydney
- Mumbai
- São Paulo
- Cairo

## 🎓 Next Steps

After successfully running the application:

1. **Explore the Code:**
   - Backend: `backend/app.py`
   - Frontend: `frontend/src/App.jsx`

2. **Review Documentation:**
   - Main README: `README.md`
   - Backend API Docs: `backend/README_BACKEND.md`

3. **Customize:**
   - Modify colors in `frontend/src/index.css`
   - Add new features or endpoints
   - Enhance the UI components

4. **Deploy:**
   - Consider deploying to Heroku (backend) and Vercel (frontend)
   - See deployment section in main README

## 🆘 Getting Help

If you're still having issues:

1. Check all prerequisites are installed correctly
2. Review error messages carefully
3. Search for the error on Stack Overflow
4. Check the main README.md for more detailed documentation
5. Create an issue on GitHub with:
   - Your operating system
   - Error messages
   - Steps you've tried

## 🎉 Success!

If everything is working:
- You should see the Weather Dashboard
- Searching for cities should return weather data
- History should be saved and displayed

**Congratulations! You're all set up! 🌤️**

---

**Need more help?** Check the [main README](README.md) for detailed documentation.


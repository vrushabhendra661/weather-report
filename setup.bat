@echo off
echo ========================================
echo Weather Dashboard Setup Script
echo ========================================
echo.

echo [1/4] Setting up Backend...
cd backend
echo Creating virtual environment...
python -m venv venv
call venv\Scripts\activate
echo Installing backend dependencies...
pip install -r requirements.txt
echo.

echo [2/4] Creating .env file for backend...
if not exist .env (
    echo OPENWEATHER_API_KEY=your_api_key_here > .env
    echo .env file created. Please add your OpenWeatherMap API key!
) else (
    echo .env file already exists.
)
echo.

cd ..

echo [3/4] Setting up Frontend...
cd frontend
echo Installing frontend dependencies...
call npm install
echo.

echo [4/4] Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Add your OpenWeatherMap API key to backend/.env
echo 2. Start backend: cd backend ^&^& python app.py
echo 3. Start frontend: cd frontend ^&^& npm run dev
echo 4. Open http://localhost:3000 in your browser
echo.
echo ========================================
pause


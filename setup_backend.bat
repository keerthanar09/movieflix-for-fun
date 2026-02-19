@echo off
echo Setting up Django Backend...
cd backend

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt

echo Creating database migrations...
python manage.py makemigrations

echo Running migrations...
python manage.py migrate

echo.
echo Backend setup complete!
echo To start the server, run: python manage.py runserver
echo.
pause

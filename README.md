# Registration and Login App

A full-stack authentication application with Django backend and React frontend, featuring a glassmorphic design with red-black color palette.

## Features

- User registration with username, userid, password, email, and phone number
- Secure password hashing using Django's password hashing
- User login with credential verification
- Automatic redirects:
  - After registration → Login page
  - After login → Netflix landing page (https://movieflixx.lovable.app/)
- Glassmorphic UI design with red-black theme
- MySQL database integration with Aiven

## Project Structure

```
kodnest-project/
├── backend/          # Django backend
│   ├── auth_project/    # Django project settings
│   ├── authentication/   # Authentication app
│   ├── manage.py
│   └── requirements.txt
├── frontend/        # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
```

3. Activate the virtual environment:
   - Windows:
   ```bash
   venv\Scripts\activate
   ```
   - Linux/Mac:
   ```bash
   source venv/bin/activate
   ```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. The `.env` file is already configured with your database credentials. Make sure it exists in the `backend` directory.

6. Run migrations to create database tables:
```bash
python manage.py makemigrations
python manage.py migrate
```

7. Start the Django development server:
```bash
python manage.py runserver
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Register
- **URL**: `http://localhost:8000/api/register/`
- **Method**: POST
- **Body**:
```json
{
  "username": "string",
  "userid": "string",
  "email": "string",
  "phone_number": "string",
  "password": "string",
  "confirm_password": "string"
}
```

### Login
- **URL**: `http://localhost:8000/api/login/`
- **Method**: POST
- **Body**:
```json
{
  "username": "string",
  "password": "string"
}
```

## Database Configuration

The application uses MySQL database hosted on Aiven. Database credentials are stored in the `.env` file:

- Host: mysql-1b3d95de-keerthana241495-bc79.b.aivencloud.com
- Port: 22280
- Database: defaultdb
- SSL Mode: REQUIRED

## Security Features

- Passwords are hashed using Django's password hashing system
- Prepared statements are used through Django ORM (prevents SQL injection)
- SSL connection to database
- CORS configured for frontend-backend communication

## Design

The application features a glassmorphic design with:
- Red-black color palette (#dc143c, #8b0000, #1a0000)
- Glassmorphic cards with backdrop blur effects
- Animated geometric shapes in the background
- Smooth transitions and hover effects

## Technologies Used

- **Backend**: Django 4.2.7, Django REST Framework
- **Frontend**: React 18.2.0, React Router DOM
- **Database**: MySQL (Aiven)
- **HTTP Client**: Axios

# Registration and Login App

A full-stack authentication application with Django backend and React frontend, featuring a glassmorphic design with red-black color palette. Deployed on **Render** (backend) and **Vercel** (frontend).

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
├── backend/          # Django backend (Render)
│   ├── auth_project/
│   ├── authentication/
│   ├── manage.py
│   └── requirements.txt
├── frontend/         # React + Vite frontend (Vercel)
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   └── vercel.json
└── README.md
```

## Deployment

### Backend (Render)

1. Create a Web Service on [Render](https://render.com).
2. Connect your repository and set **Root Directory** to `backend` (if deploying from monorepo) or deploy the backend folder.
3. Configure environment variables in Render dashboard:
   - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `SECRET_KEY`
   - Optional: `FRONTEND_URL` for custom frontend domain CORS
4. Build command: `pip install -r requirements.txt`
5. Start command: `gunicorn auth_project.wsgi:application`
6. Run migrations via Render Shell: `python manage.py migrate`

### Frontend (Vercel)

1. Create a new project on [Vercel](https://vercel.com).
2. Import your repository and set **Root Directory** to `frontend`.
3. Add environment variable:
   - **Name**: `VITE_API_URL`  
   - **Value**: Your Render backend URL (e.g., `https://movieflix-backend.onrender.com`)
4. Vercel will auto-detect Vite and use `npm run build` for build and `dist` for output.

**VITE_API_URL** is used for all API requests (register/login). Without it, the app falls back to `http://localhost:8000` for local development.

## Local Development

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
# Create .env with DB credentials
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
# Optional: create .env with VITE_API_URL=http://localhost:8000
npm run dev
```

## API Endpoints

- **Register**: `POST /api/register/`
- **Login**: `POST /api/login/`

## Environment Variables

### Backend (Render)

| Variable      | Description                          |
|---------------|--------------------------------------|
| DB_HOST       | MySQL host (Aiven)                   |
| DB_PORT       | MySQL port                           |
| DB_NAME       | Database name                        |
| DB_USER       | Database user                        |
| DB_PASSWORD   | Database password                    |
| SECRET_KEY    | Django secret key                    |
| FRONTEND_URL  | Optional: frontend URL for CORS      |

### Frontend (Vercel)

| Variable      | Description                          |
|---------------|--------------------------------------|
| VITE_API_URL  | Backend API base URL (required for production) |

## Technologies Used

- **Backend**: Django, DRF, PyMySQL, Gunicorn
- **Frontend**: React, Vite, React Router, Axios
- **Database**: MySQL (Aiven)
- **Hosting**: Render, Vercel

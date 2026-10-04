# Event Management Web Application

A modern, professional event management platform built with the MERN stack.

## Features

✅ Browse and search events  
✅ Filter events by category  
✅ View detailed event information  
✅ Register for events with validation  
✅ Real-time search and filtering  
✅ Responsive design (mobile, tablet, desktop)  
✅ Professional UI/UX  

## Tech Stack

**Frontend:**
- React.js with Hooks
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Vite as build tool

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- REST API architecture
- Error handling middleware

**Database:**
- MongoDB (local or Atlas)

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- MongoDB (local or Atlas account)

### Installation

1. **Clone repository**
```bash
git clone <your-repo-url>
cd event-management-app
```

2. **Backend Setup**
```bash
cd server
npm install
```

Create `.env`:


3. **Frontend Setup**
```bash
cd client
npm install
```

4. **Seed Database**
```bash
cd server
node seed.js
```

### Running Locally

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Open http://localhost:5173 in your browser.

---

## API Endpoints

### Events
- `GET /api/events` — Get all events (with search/filter)
- `GET /api/events/:id` — Get single event
- `POST /api/events` — Create event
- `PUT /api/events/:id` — Update event
- `DELETE /api/events/:id` — Delete event

### Registrations
- `POST /api/events/:id/register` — Register for event
- `GET /api/events/:id/registrations` — Get event registrations

---

## Project Structure

event-management-app/
├── server/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│ ├── seed.js
│ └── .env
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── hooks/
│ │ ├── services/
│ │ ├── context/
│ │ └── App.jsx
│ └── package.json
└── README.md


---

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions.

Quick deploy to Vercel (frontend) + Railway (backend):

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

---

## Features in Scope

✅ Event browsing and listing  
✅ Event search and filtering  
✅ Event details page  
✅ User registration form  
✅ Form validation  
✅ Responsive design  

---

## Features Out of Scope

❌ User authentication/login  
❌ Payment processing  
❌ Email notifications  
❌ Admin dashboard  
❌ Event editing by users  

---

## Development Tips

- Frontend runs on http://localhost:5173
- Backend runs on http://localhost:5000
- Check browser console (F12) for frontend errors
- Check terminal output for backend logs
- MongoDB should be running locally

---

## License

MIT

---

## Support

For issues or questions, please refer to the documentation or create an issue on GitHub.
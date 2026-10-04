# Deployment Guide — Event Management App

## Prerequisites

- Node.js v18+ and npm v9+
- MongoDB Atlas account (for production database)
- Hosting platform (Heroku, Vercel, Railway, AWS, etc.)

---

## Backend Deployment

### 1. Prepare MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create database user with strong password
4. Whitelist IP addresses (or allow all for testing)
5. Get connection string: `mongodb+srv://...`

### 2. Update Environment Variables

Create/update `server/.env.production`:


### 3. Deploy to Heroku (Example)

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_connection_string
heroku config:set NODE_ENV=production
heroku config:set CORS_ORIGIN=https://yourdomain.com

# Deploy
git push heroku main
```

### 4. Deploy to Railway (Recommended for Beginners)

1. Go to https://railway.app
2. Connect GitHub repository
3. Add MongoDB plugin
4. Set environment variables
5. Deploy

---

## Frontend Deployment

### 1. Build for Production

```bash
cd client
npm run build
```

This creates an optimized `dist/` folder.

### 2. Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 3. Update Environment Variable

In Vercel dashboard:
- Go to Settings → Environment Variables
- Add `VITE_API_URL=https://your-backend-domain.com/api`

### 4. Deploy to Netlify

1. Go to https://netlify.com
2. Connect GitHub repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables
6. Deploy

---

## Full Stack Deployment (Docker - Advanced)

### 1. Create Docker Compose

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: event-management
    volumes:
      - mongodb_data:/data/db

  server:
    build: ./server
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/event-management
      - NODE_ENV=production
      - PORT=5000

  client:
    build: ./client
    ports:
      - "3000:80"
    depends_on:
      - server

volumes:
  mongodb_data:
```

### 2. Create Dockerfile for Backend

Create `server/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### 3. Create Dockerfile for Frontend

Create `client/Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Testing Before Deployment

```bash
# Backend health check
curl http://localhost:5000/api/health

# Frontend build test
cd client
npm run build
npm run preview
```

---

## Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Environment variables set up
- [ ] CORS configured for production domain
- [ ] Frontend built without errors
- [ ] Backend tested with production database
- [ ] Security headers enabled
- [ ] Error logging configured
- [ ] Backup strategy in place
- [ ] Performance optimized
- [ ] HTTPS enabled

---

## Monitoring & Maintenance

- Monitor server logs regularly
- Set up automated backups for MongoDB
- Monitor API response times
- Keep dependencies updated
- Regular security audits
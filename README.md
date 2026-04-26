# 🏠 Hompata - Property Listing Platform for Kenya

A modern web-based property marketplace designed for users in Kenya to find rental houses, buy properties, list vacancies, and connect instantly via WhatsApp.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+) 
- MySQL Server
- npm or yarn

### 1. Clone and Setup
```bash
cd hompata
```

### 2. Database Setup
```bash
# Create database and tables
mysql -u root -p < database/schema.sql

# OR use the setup script
cd database
./setup.sh
```

### 3. Backend Setup
```bash
cd server
# Edit .env with your database credentials
npm install
npm run dev
```

### 4. Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 5. Build for Production
```bash
cd client
npm run build
```

### 6. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

### Troubleshooting
- If build fails with Tailwind CSS errors, ensure you're using Node.js 18+
- Clear node_modules and package-lock.json if encountering native binding errors

## 📁 Project Structure

```
hompata/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js Backend
│   ├── controllers/        # Route controllers
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   ├── config/           # Database configuration
│   └── uploads/          # File uploads
├── database/             # SQL schema and migrations
└── README.md
```

## 🔐 Default Users

### Admin
- Email: admin@hompata.com
- Password: admin123

### Landlord
- Email: john@hompata.com
- Password: landlord123

## 🎯 Features

- **Property Search**: Advanced search with filters for location, price, bedrooms
- **WhatsApp Integration**: Direct contact with property owners via WhatsApp
- **User Roles**: Admin, Landlord, and Customer roles with different permissions
- **Image Upload**: Multiple images and video support for properties
- **Responsive Design**: Mobile-first design that works on all devices

## 🛠️ Technology Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- Multer (File Uploads)
- Bcrypt (Password Hashing)

## 📱 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Listings
- `GET /api/listings` - Get all listings (with search filters)
- `GET /api/listings/:id` - Get specific listing
- `POST /api/listings` - Create new listing (auth required)
- `PUT /api/listings/:id` - Update listing (auth required)
- `DELETE /api/listings/:id` - Delete listing (auth required)

### User Management
- `GET /api/listings/user/listings` - Get user's listings (auth required)

### WhatsApp Integration
- `GET /api/whatsapp/:id` - Redirect to WhatsApp with property details

## 🔧 Configuration

### Environment Variables (server/.env)
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hompata
JWT_SECRET=your-secret-key
UPLOAD_DIR=./uploads
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder

### Backend (Heroku/DigitalOcean)
1. Set environment variables
2. Deploy with `npm start`

## 📝 Development Notes

- The backend runs on port 5000
- The frontend runs on port 3000 with proxy to backend
- Images are stored in `server/uploads/` directory
- Database uses MySQL with proper indexing for performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

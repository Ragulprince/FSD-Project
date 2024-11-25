# 🛍️ Ecommerce Admin Chatbot 

A powerful admin chatbot interface for managing your ecommerce store. Built with React, Golang, PostgreSQL, and Tailwind CSS.

## ✨ Features

- 📦 List all orders with detailed information
- 🔍 Get specific order status and details
- 📊 Real-time inventory management
- 💬 Interactive chatbot interface
- 🎯 Admin dashboard with analytics

## 🚀 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Golang
- **Database**: PostgreSQL
- **Development Tools**: Air (Live Reload)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- Go (v1.16 or higher)
- PostgreSQL (v12 or higher)
- Git

## 🛠️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/Ragulprince/FSD-Project
cd FSD-Project
```

2. **Setup Backend**
```bash
cd backend

# Create .env file with following variables
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432
PORT=8080

# Install Go dependencies
go mod tidy

# Run the server (with live reload)
air
```

3. **Setup Frontend**
```bash
cd frontend

# Install dependencies
npm install


# Start development server
npm start
```

## 📁 Project Structure

```
FSD-Project/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── bot.jsx      # Chatbot component
│   │   │   ├── dashboard.jsx
│   │   │   ├── footer.jsx
│   │   │   ├── header.jsx
│   │   │   └── landingpage.jsx
│   │   └── App.js          # Main application component
│   └── public/             # Static files
│
└── backend/                # Golang backend server
    ├── config/            # Database configuration
    ├── controllers/       # Request handlers
    ├── models/           # Database models
    ├── routes/           # API routes
    └── main.go          # Entry point
```

## 🌐 API Endpoints

- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get specific order details
- `GET /api/inventory` - Get inventory status

## 💻 Development

To run the project in development mode:

1. **Backend**: 
```bash
cd backend
air        # Runs with live reload
```

2. **Frontend**:
```bash
cd frontend
npm start  # Runs on http://localhost:3000
```

## 🔧 Configuration

### Backend Configuration (.env)
```
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=ecommerce_db
DB_PORT=5432
PORT=8080
```

### Frontend Configuration
- Update API endpoint in `src/config.js` if needed
- Tailwind configuration can be modified in `tailwind.config.js`

## 🚥 Running Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
go test ./...
```

## 📦 Building for Production

1. **Frontend**:
```bash
cd frontend
npm run build
```

2. **Backend**:
```bash
cd backend
go build -o main
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👥 Authors

- Ragul - Initial work



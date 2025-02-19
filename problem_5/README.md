# Problem 5: Backend Server

A Node.js backend application built with Express and TypeScript, featuring secure password hashing with bcrypt and Docker containerization support.

## Project Structure
```
problem_5/
├── src/
│   ├── configs/          # Application configurations
│   ├── controllers/      # Request handlers
│   ├── database/         # Database setup and connections
│   ├── exceptions/       # Custom error handling
│   ├── middlewares/      # Express middlewares
│   ├── models/           # Database models
│   ├── routers/          # API routes
│   ├── services/         # Business logic
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── index.ts          # Application entry point
├── node_modules/         # Dependencies
├── .env                  # Environment variables
├── docker-compose.yml    # Docker compose configuration
├── Dockerfile            # Docker build instructions
├── package.json          # Project dependencies and scripts
├── package-lock.json     # Locked dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## Prerequisites

- Node.js (version 18 or higher)
- Docker (optional, for containerization)
- npm (Node Package Manager)
- Git (optional, for version control)

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/dennis-nguyen0909/interview_99tech_backend.git
cd problem_5
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm run dev
```

### Using Docker

1. Build and start the container:
```bash
docker-compose up --build
```

## Troubleshooting TypeScript Issues

If you encounter TypeScript-related problems:

1. Remove node_modules:
```bash
rm -rf node_modules
```

2. Rebuild with Docker:
```bash
docker-compose up --build
```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm start` - Start production server
- `npm run build` - Build the TypeScript project

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## API Documentation

### Authentication Endpoints
```
POST /api/v1/users/login         - User login
POST /api/v1/users/register      - User registration
POST /api/v1/users/refresh-token - Refresh access token
GET  /api/v1/users              - Get all users (requires auth)
GET  /api/v1/users/:id          - Get user details (requires auth)
```

### Product Endpoints
```
POST   /api/v1/products         - Create new product (requires auth)
GET    /api/v1/products         - Get all products
GET    /api/v1/products/:id     - Get product details (requires auth)
PATCH  /api/v1/products/:id     - Update product (requires auth)
DELETE /api/v1/products         - Delete product (requires auth)
```

### Authentication
Many endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Request & Response Examples

#### Login
```
POST /api/v1/users/login
Body:
{
    "email": "minhduy@example.com",
    "password": "123"
}
```
Response:
{
    "status": 200,
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjFjZjMwODc1ZGNhYjQxMTAzY2U2YSIsImVtYWlsIjoibWluaGR1eUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzk5NDgyNzksImV4cCI6MTczOTk1MDA3OX0.TEu20fB1AabmAucbJ97yedYSF6k95Io-irgL0eArKlI",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjFjZjMwODc1ZGNhYjQxMTAzY2U2YSIsImVtYWlsIjoibWluaGR1eUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzk5NDgyNzksImV4cCI6MTc0MTE1Nzg3OX0.lvdLNe27yVZQm0jQkW0t1X2JdeD4qSoh-qW2vU79LvM",
        "user": {
            "id": "67b1cf30875dcab41103ce6a",
            "email": "minhduy@gmail.com",
            "fullName": "Nguyễn Mai Minh Duy",
            "role": "admin"
        }
    },
    "message": "Login successful"
}

#### Register
```
POST /api/v1/users/register
Body:
{
	"email":"user@gmail.com",
    "password":"Admin@@!23",
    "fullName":"Nguyễn Mai Minh Duy"
}
```
Response:
{
    "status": 201,
    "data": {
        "id": "67b5814b00a5bec545bd6b51",
        "email": "user@gmail.com",
        "fullName": "Nguyễn Mai Minh Duy",
        "phone": null,
        "role": "user"
    },
    "message": "Registration successful"
}

#### Refresh Token
```
POST /api/v1/users/refresh-token
Body:
{
	"refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjFjZjMwODc1ZGNhYjQxMTAzY2U2YSIsImVtYWlsIjoibWluaGR1eUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzk5NDgyNzksImV4cCI6MTc0MTE1Nzg3OX0.lvdLNe27yVZQm0jQkW0t1X2JdeD4qSoh-qW2vU79LvM"
}
```
Response:
{
    "data": {
        "status": 200,
        "message": "Success!",
        "data": {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjFjZjMwODc1ZGNhYjQxMTAzY2U2YSIsImVtYWlsIjoibWluaGR1eUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzk5NDg0OTksImV4cCI6MTczOTk1MDI5OX0.iCYk6_D1pYeEnb9YilhuAxoBkAmde7bxHxLoKNyytX4",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjFjZjMwODc1ZGNhYjQxMTAzY2U2YSIsImVtYWlsIjoibWluaGR1eUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzk5NDg0OTksImV4cCI6MTc0MTE1ODA5OX0.Ay_ekHH2ALX8kYWcZw-gdclfN19IBOcyvbronUH0e74"
        }
    },
    "message": "Success"
}

#### Create Product
```
POST /api/v1/products
Headers:
    Authorization: Bearer <token>
Body:
{
    "name":"áo thun",
    "description":"Áo thun làm từ lụa",
    "price":300000,
    "category":"ÁO",
    "stock":"20",
    "userId":"67b1cf30875dcab41103ce6a"
}
```
Response:
{
    "status": 201,
    "message": "Product created successfully",
    "data": {
        "name": "áo thun",
        "description": "Áo thun làm từ lụa",
        "price": 300000,
        "category": "ÁO",
        "stock": 20,
        "isAvailable": true,
        "sizes": [],
        "colors": [],
        "userId": "67b1cf30875dcab41103ce6a",
        "_id": "67b5822f00a5bec545bd6b55",
        "createdAt": "2025-02-19T07:03:11.090Z",
        "updatedAt": "2025-02-19T07:03:11.090Z"
    }
}

#### Get All Products
```
GET /api/v1/products
Response:
{
    "message": "Success",
    "status": 200,
    "data": {
        "items": [
            {
                "_id": "67b5822f00a5bec545bd6b55",
                "name": "áo thun",
                "description": "Áo thun làm từ lụa",
                "price": 300000,
                "category": "ÁO",
                "stock": 20,
                "isAvailable": true,
                "sizes": [],
                "colors": [],
                "userId": "67b1cf30875dcab41103ce6a",
                "createdAt": "2025-02-19T07:03:11.090Z",
                "updatedAt": "2025-02-19T07:03:11.090Z"
            }
        ],
        "meta":{
            "count": 10,
            "current_page": 1,
            "per_page": 10,
            "total": 11,
            "total_pages": 2
        }
    }
}
```


#### Delete Products
```
DELETE /api/v1/products
Headers:
    Authorization: Bearer <token>
```
Body:
{
    "ids":["67b5822f00a5bec545bd6b55","67b5821f00a5bec545bd6b53"]
}
```

Response:
{
    "status": 200,
    "message": "Products deleted successfully",
    "data": {
        "acknowledged": true,
        "deletedCount": 2
    }
}

```
#### Update Product
```
PATCH /api/v1/products/:id
Headers:
    Authorization: Bearer <token>
```
Body:
{
    "name":"áo thun",
    "description":"Áo thun làm từ lụa",
    "price":300000,
    "category":"ÁO",
    "stock":20,
}
```

Response:
{
    "status": 200,
    "data": {
        "_id": "67b1fb0690f6737d107a4c44",
        "name": "áo thun",
        "description": "Áo thun làm từ lụa",
        "price": 300000,
        "category": "ÁO",
        "stock": 20,
        "isAvailable": true,
        "sizes": [],
        "colors": [],
        "userId": "67b1cf30875dcab41103ce6a",
        "createdAt": "2025-02-16T14:49:42.148Z",
        "updatedAt": "2025-02-19T07:09:36.771Z"
    },
    "message": "Success"
}
```
#### Get Product Details
```
GET /api/v1/products/:id
Headers:
    Authorization: Bearer <token>
```

Response:
{
    "status": 200,
    "data": {
        "_id": "67b1fb0690f6737d107a4c44",
        "name": "áo thun",
        "description": "Áo thun làm từ lụa",
        "price": 300000,
        "category": "ÁO",
        "stock": 20,
        "isAvailable": true,
        "sizes": [],
        "colors": [],
        "userId": "67b1cf30875dcab41103ce6a",
        "createdAt": "2025-02-16T14:49:42.148Z",
        "updatedAt": "2025-02-19T07:09:36.771Z"
    },
    "message": "Success"
}




## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



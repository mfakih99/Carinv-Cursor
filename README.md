# Car Wholesaler Inventory Management System

A comprehensive full-stack web application for managing car wholesale operations, built with Next.js, TypeScript, Prisma, and PostgreSQL.

## 🚀 Features

### Core Functionality
- **Vehicle Management**: Complete CRUD operations with VIN decoder integration
- **Expense Tracking**: Track all vehicle-related expenses by category
- **Document Management**: Upload and manage titles, registrations, and other documents
- **Customer CRM**: Manage buyers and sellers with purchase history
- **User Authentication**: Secure login/registration with JWT tokens
- **Real-time Search**: Fast filtering and searching across all data

### Business Features
- **Profit Tracking**: Automatic profit calculation per vehicle
- **Expense Categories**: Repairs, maintenance, transportation, fees, etc.
- **Document Expiry Alerts**: Track expiring registrations and insurance
- **Customer Communication**: Notes and contact history
- **Multi-user Support**: Each user has their own isolated data

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT with bcrypt
- **File Storage**: Uploadthing / Cloudinary / AWS S3
- **Deployment**: Railway

## 📁 Project Structure

```
car-wholesaler-inv/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/          # API endpoints
│   │   ├── vehicles/     # Vehicle management
│   │   ├── expenses/     # Expense tracking
│   │   ├── documents/    # Document management
│   │   ├── customers/    # Customer CRM
│   │   └── (auth)/       # Authentication pages
│   ├── components/       # Reusable components
│   ├── lib/             # Utilities and configurations
│   └── types/           # TypeScript types
├── prisma/              # Database schema and migrations
└── public/              # Static assets
```

## 🚀 Quick Start (Deploy to Railway)

See [QUICK_START_RAILWAY.md](./QUICK_START_RAILWAY.md) for deploying in 5 minutes!

## 💻 Local Development

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd car-wholesaler-inv
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env
# Edit .env with your database URL and other configs
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
npx prisma db seed # Optional: adds demo data
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📝 Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# File Storage (choose one)
UPLOADTHING_SECRET="..."
UPLOADTHING_APP_ID="..."
# OR
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

## 🗄️ Database Schema

The application uses the following main models:
- **User**: Authentication and user profiles
- **Vehicle**: Core vehicle inventory
- **Expense**: Vehicle-related expenses
- **Document**: File metadata and links
- **Customer**: CRM data
- **Sale**: Transaction records
- **Note**: Customer communication log

## 🔐 Authentication

- JWT-based authentication
- Secure password hashing with bcrypt
- Protected API routes with middleware
- Automatic token refresh

## 📱 Key Pages

- `/` - Marketing landing page
- `/dashboard` - Main dashboard with statistics
- `/vehicles` - Vehicle inventory management
- `/expenses` - Expense tracking and reports
- `/documents` - Document storage and management
- `/customers` - Customer relationship management
- `/settings` - User and app settings
- `/profile` - User profile management

## 🎨 UI Features

- Responsive design for all screen sizes
- Modern, clean interface with Tailwind CSS
- Real-time form validation
- Loading states and error handling
- Drag-and-drop file uploads
- Interactive data tables with sorting/filtering

## 🚀 Deployment

The app is configured for easy deployment on Railway:

1. Push to GitHub
2. Connect to Railway
3. Add PostgreSQL database
4. Set environment variables
5. Deploy!

See [RAILWAY_BACKEND_SETUP.md](./RAILWAY_BACKEND_SETUP.md) for detailed instructions.

## 📦 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Vehicles
- `GET /api/vehicles` - List all vehicles
- `POST /api/vehicles` - Create vehicle
- `GET /api/vehicles/[id]` - Get vehicle details
- `PUT /api/vehicles/[id]` - Update vehicle
- `DELETE /api/vehicles/[id]` - Delete vehicle

### Expenses
- `GET /api/expenses` - List expenses (with filters)
- `POST /api/expenses` - Create expense

### Documents
- `GET /api/documents` - List documents
- `POST /api/documents` - Create document metadata

### Customers
- `GET /api/customers` - List customers
- `POST /api/customers` - Create customer
- `GET /api/customers/[id]` - Get customer details

## 🧪 Demo Credentials

```
Email: demo@carwholesaler.com
Password: password
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- Check the [documentation](./docs)
- Open an [issue](https://github.com/yourusername/car-wholesaler-inv/issues)
- Join our [Discord](https://discord.gg/your-discord)

---

Built with ❤️ for car wholesalers

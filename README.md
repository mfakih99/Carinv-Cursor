# Car Wholesaler Inventory Management System

A comprehensive web application for managing used car inventory with VIN decoding, expense tracking, document management, and custom fields functionality.

## 🚀 Features

### Core Features
- **VIN Decoding**: Automatic vehicle information retrieval using NHTSA API
- **Expense/Cost Tracking**: Track all costs associated with each vehicle
- **Notes & Updates**: Timestamped activity logging with user attribution
- **Document Storage**: Store and manage vehicle-related documents
- **Individual Vehicle Pages**: Detailed view for each vehicle
- **Custom Fields**: Add dynamic fields similar to Salesforce

### Additional Features
- **Dashboard Analytics**: Real-time business intelligence and KPIs
- **Advanced Search & Filtering**: Multi-criteria search capabilities
- **Customer Management**: Track buyers and sales
- **Mobile Responsive**: Works on all devices
- **Inventory Lifecycle**: Track vehicles from acquisition to sale

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: Radix UI, Lucide Icons
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Query (TanStack Query)

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Git

## 🚀 Getting Started

1. **Clone the repository**
```bash
cd car-wholesaler-inv
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/car_wholesaler_db?schema=public"

# NextAuth (for future authentication)
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# VIN Decoder API (NHTSA - Free)
VIN_DECODER_API_URL="https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin"
```

4. **Set up the database**
```bash
# Generate Prisma client
npx prisma generate

# Create database schema
npx prisma db push

# (Optional) Seed with sample data
npx prisma db seed
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Application Structure

```
car-wholesaler-inv/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── dashboard/    # Dashboard page
│   │   ├── vehicles/     # Vehicle management pages
│   │   ├── expenses/     # Expense tracking
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   ├── ui/           # Base UI components
│   │   ├── layout/       # Layout components
│   │   └── vehicles/     # Vehicle-specific components
│   ├── lib/              # Utility libraries
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Helper functions
│   └── types/            # TypeScript types
├── prisma/
│   └── schema.prisma     # Database schema
└── public/               # Static assets
```

## 🔧 Key Features Implementation

### VIN Decoder
The VIN decoder uses the free NHTSA API to automatically populate vehicle information:
- Make, Model, Year
- Trim, Body Type
- Engine Type, Transmission
- Drivetrain

### Expense Tracking
Track various expense categories:
- Purchase costs
- Repairs & maintenance
- Transportation fees
- Detailing
- Parts & accessories
- Inspection fees

### Document Management
Store and organize documents per vehicle:
- Title documents
- Purchase agreements
- Inspection reports
- Repair invoices
- Photos

### Custom Fields
Create dynamic fields for vehicles:
- Text, Number, Date fields
- Dropdown selections
- Validation rules
- Conditional visibility

## 🗄️ Database Schema

The application uses the following main models:
- **Vehicle**: Core vehicle information
- **User**: System users with roles
- **Expense**: Vehicle-related expenses
- **Document**: Uploaded documents
- **Note**: Activity notes
- **Customer**: Customer information
- **Sale**: Sales records
- **CustomField**: Dynamic field definitions
- **CustomFieldValue**: Values for custom fields

## 🔐 Security Features (To Be Implemented)

- User authentication with NextAuth
- Role-based access control (Admin, Manager, User)
- Secure document storage
- API rate limiting
- Data encryption

## 📈 Future Enhancements

1. **Marketplace Integration**
   - Auto-post to Craigslist, Facebook Marketplace
   - Sync with dealer websites

2. **Advanced Analytics**
   - Profit margin analysis
   - Market trends
   - Inventory turnover reports

3. **Mobile App**
   - React Native companion app
   - Barcode/VIN scanning
   - Offline capability

4. **Automation**
   - Automated pricing suggestions
   - Email/SMS notifications
   - Workflow automation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software for internal business use.

## 💬 Support

For support and questions, please contact the development team.

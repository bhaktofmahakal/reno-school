# 🏫 School Management System

A modern web application built with Next.js for managing school information with a responsive design that works seamlessly on both desktop and mobile devices.

## 🚀 Features

- **Add Schools**: Form with complete validation using react-hook-form
- **View Schools**: Responsive grid layout displaying schools in an ecommerce-style interface  
- **Image Upload**: Store school images with preview functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **MySQL Integration**: Full database operations for school data
- **Form Validation**: Email validation, contact number validation, required field checks
- **Modern UI**: Clean, professional interface with smooth animations

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, React Hook Form
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **Styling**: CSS3 with responsive design
- **Image Upload**: Multer for file handling
- **Validation**: Yup schema validation

## 📋 Database Schema

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(15) NOT NULL,
  image TEXT,
  email_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Database**
   - Create MySQL database named `school_management`
   - Run the SQL script in `database/init.sql`
   - Update database credentials in `.env.local`

3. **Configure Environment**
   ```bash
   cp .env.local.example .env.local
   # Update your database credentials
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages

### 1. View Schools (`/`)
- Displays all schools in a responsive grid layout
- Shows school name, address, city, and image
- Empty state when no schools exist
- Refresh functionality to reload data

### 2. Add School (`/addSchool`)
- Complete form with validation
- Fields: name, address, city, state, contact, email, image
- Image upload with preview
- Success/error message handling
- Responsive form layout

## 🎨 Design Features

- **Modern Gradient UI**: Beautiful color schemes and smooth transitions
- **Card-based Layout**: Clean product-card style for school listings
- **Mobile-First**: Responsive design that works on all screen sizes
- **Interactive Elements**: Hover effects and smooth animations
- **Form UX**: Real-time validation with clear error messages

## 📦 File Structure

```
├── components/
│   └── Layout.js          # Main layout component
├── database/
│   └── init.sql          # Database initialization
├── lib/
│   └── db.js             # Database connection
├── pages/
│   ├── api/schools/
│   │   └── index.js      # API routes for schools
│   ├── _app.js           # Next.js app component
│   ├── index.js          # Show schools page
│   └── addSchool.js      # Add school form page
├── public/
│   └── schoolImages/     # Uploaded school images
├── styles/
│   └── globals.css       # Global styles
└── README.md
```

## 🔧 Environment Variables

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
DB_PORT=3306
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 📸 Screenshots

The application features:
- Clean, modern interface with gradient backgrounds
- Responsive cards showing school information
- Professional form design with validation
- Mobile-optimized layouts

## 🚀 Deployment

This application is production-ready with deployment configurations for multiple platforms:

### Vercel (Recommended)
```bash
# Deploy with Vercel CLI
vercel --prod
```
Configuration: `vercel.json` included

### Netlify
```bash
# Deploy with Netlify CLI  
netlify deploy --prod
```
Configuration: `netlify.toml` included

### Railway
```bash
# Connect GitHub and deploy with one click
```
Configuration: `railway.json` included

### Docker
```bash
# Build and run with Docker
docker build -t school-management .
docker run -p 3000:3000 school-management
```
Configuration: `Dockerfile` and `.dockerignore` included

### Environment Variables for Production
Add these to your deployment platform:
```env
DB_HOST=your_production_db_host
DB_USER=your_production_db_user  
DB_PASSWORD=your_production_db_password
DB_NAME=your_production_db_name
DB_PORT=3306
```

✅ **Build Status**: Successfully tested and verified
- Zero build errors
- All static pages generated
- Production optimizations applied
- Mobile responsive design confirmed

## 📄 License

This project is created for educational purposes.
# KaramSaathi

🧱 A **production-grade, multilingual, mobile-first job portal** connecting employers with skilled and unskilled workers across India. Built with modern web technologies and designed to be highly intuitive for low-literacy users while providing powerful tools for employers.

## 🚀 Live Demo

- **Production URL**: [Deploy to Vercel]
- **Demo Credentials**: 
  - Worker Login: Any phone number with OTP `123456`
  - Employer Login: Any email with OTP `123456`
  - Admin Login: `admin@karamsathi.com` with OTP `123456`

## ⚙️ Tech Stack

### Frontend & Full-Stack
- **Next.js 14+** with App Router and Server Actions
- **TypeScript** for type safety
- **Tailwind CSS** + **ShadCN/UI** for modern, accessible components
- **React Hook Form** + **Zod** for form handling and validation
- **NextAuth.js** with OTP-based authentication
- **next-intl** for multilingual support (Hindi, Marathi, Tamil, English)
- **Framer Motion** for smooth animations
- **Mobile-first design** with bottom tab navigation

### Backend & Database
- **Node.js 20+** runtime
- **Prisma ORM** with **MySQL** database
- **Supabase** for database hosting
- **Cloudinary** for image storage
- **Twilio SMS** for OTP delivery (Phase 2)
- **WhatsApp Cloud API** for notifications (Phase 2)

### DevOps & Deployment
- **Vercel** for hosting and deployment
- **GitHub Actions** for CI/CD
- **ESLint** + **Prettier** for code quality

## 📁 Project Structure

```
karamsathi/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Internationalized routes
│   │   │   ├── auth/          # Authentication pages
│   │   │   ├── jobs/          # Job listing and details
│   │   │   ├── profile/       # User profiles
│   │   │   ├── employer/      # Employer dashboard
│   │   │   └── admin/         # Admin panel
│   │   └── api/               # API routes
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # ShadCN/UI components
│   │   ├── layout/           # Layout components
│   │   ├── jobs/             # Job-related components
│   │   └── categories/       # Category components
│   ├── lib/                  # Utility libraries
│   └── hooks/                # Custom React hooks
├── prisma/                   # Database schema and seeds
├── messages/                 # Internationalization files
└── public/                   # Static assets
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js 20+**
- **MySQL** database (or Supabase account)
- **Cloudinary** account for image storage

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/karamsathi.git
cd karamsathi

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/karamsathi"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# Twilio (Optional - Phase 2)
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_PHONE_NUMBER="your-twilio-phone-number"

# WhatsApp Cloud API (Optional - Phase 2)
WHATSAPP_ACCESS_TOKEN="your-whatsapp-access-token"
WHATSAPP_PHONE_NUMBER_ID="your-whatsapp-phone-number-id"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed the database with categories
npm run db:seed
```

### 4. Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### 5. Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deployment

### Vercel Deployment

1. **Connect to Vercel**:
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Environment Variables**: Set up all environment variables in Vercel dashboard

3. **Database**: Use Supabase or PlanetScale for production database

4. **Domain**: Configure custom domain in Vercel settings

### Manual Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy to your hosting platform** (AWS, DigitalOcean, etc.)

## 🗃️ Database Schema

### Core Models

- **User**: Workers, Employers, and Admins
- **Category**: Job categories with multilingual names
- **JobPost**: Job listings with details and requirements
- **Application**: Worker applications to jobs
- **Account/Session**: NextAuth.js authentication tables

### Pre-loaded Categories

The database includes **50+ job categories** across 8 sectors:

🧱 **Construction & Site Work**: Mason, Carpenter, Electrician, Plumber, Welder, Painter, etc.

🏠 **Household Services**: Domestic Help, Cook, Babysitter, Driver, Gardener, etc.

🛠️ **Maintenance & Repairs**: AC Technician, Mobile Repair, CCTV Installer, etc.

🏭 **Factory / Industrial Work**: Machine Operator, CNC Operator, Quality Checker, etc.

🚚 **Transportation & Delivery**: Auto Driver, Truck Driver, Delivery Boy, etc.

🏨 **Hospitality & Cleaning**: Hotel Staff, Waiter, Kitchen Helper, etc.

🏢 **Office & Commercial**: Security Guard, Office Boy, Data Entry Operator, etc.

🎨 **Skilled Artisans**: Tailor, Barber, Mehendi Artist, Event Setup, etc.

## 🎯 Key Features

### 👷 Worker Module
- **OTP-based registration** with phone number
- **Multilingual profile creation** (Name, Age, Gender, Category, Location, Experience)
- **Photo upload** via Cloudinary
- **Job discovery** by category and location
- **One-click applications** and direct contact
- **Voice navigation** (Phase 2)

### 🏢 Employer Module
- **Email/Phone authentication**
- **Job posting and management**
- **Applicant tracking system**
- **CSV export** of applicant data
- **Advanced filtering** and search
- **Application moderation**

### 🧑‍💼 Admin Dashboard
- **Job post approval** workflow
- **Category management** (add/edit categories)
- **User analytics** and statistics
- **Role-based permissions**
- **Content moderation** tools

## 🌍 Internationalization

Supports **4 languages** with complete translations:
- **English** (en)
- **Hindi** (hi) - हिंदी
- **Marathi** (mr) - मराठी  
- **Tamil** (ta) - தமிழ்

Route structure: `/{locale}/path` (e.g., `/hi/jobs`, `/ta/profile`)

## 📱 Mobile-First Design

- **Bottom tab navigation** for mobile users
- **Touch-friendly components** (minimum 44px touch targets)
- **Responsive grid layouts**
- **Progressive Web App** (PWA) ready
- **Offline support** (Phase 2)

## ♿ Accessibility Features

- **WCAG 2.1 compliant**
- **Screen reader support** with proper ARIA labels
- **Keyboard navigation** throughout the app
- **High contrast mode** support
- **Focus management** and visual indicators
- **Alt text** for all images

## 🔐 Security & Privacy

- **Phone/Email verification** via OTP
- **JWT-based sessions** with NextAuth.js
- **Role-based access control**
- **Input validation** with Zod schemas
- **SQL injection protection** via Prisma
- **XSS protection** with proper sanitization

## 🚀 Performance

- **Server-side rendering** (SSR) with Next.js
- **Image optimization** with Next.js Image component
- **Lazy loading** for components and images
- **Code splitting** for optimal bundle sizes
- **Cloudinary** for optimized image delivery

## 📊 Monitoring & Analytics

- **Vercel Analytics** for performance monitoring
- **User behavior tracking** (GDPR compliant)
- **Error tracking** with built-in error boundaries
- **Database query optimization** with Prisma

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests (when implemented)
npm test
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-feature`
3. **Commit changes**: `git commit -m 'Add new feature'`
4. **Push to branch**: `git push origin feature/new-feature`
5. **Open a Pull Request**

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ShadCN/UI** for beautiful, accessible components
- **Tailwind CSS** for utility-first styling
- **Prisma** for type-safe database access
- **NextAuth.js** for authentication
- **Vercel** for hosting and deployment
- **Contributors** and **beta testers**

## 📞 Support

- **Email**: support@karamsathi.com
- **Documentation**: [docs.karamsathi.com]
- **Issues**: [GitHub Issues](https://github.com/yourusername/karamsathi/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/karamsathi/discussions)

---

**Built with ❤️ for the workers of India** 🇮🇳
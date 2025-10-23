# 🚀 Marcel's Portfolio Website

A modern, responsive portfolio website built with Next.js 15, showcasing projects, skills, and experience with dynamic GitHub integration and planned Supabase database support.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)
![GitHub API](https://img.shields.io/badge/GitHub_API-Integration-green)
![Supabase](https://img.shields.io/badge/Supabase-Planned-3ECF8E)

## 🌟 Features

### ✨ Dynamic GitHub Integration
- **Real-time Project Data**: Automatically fetches and displays actual GitHub repositories
- **Flexible Filtering**: Multiple project types (featured, recent, all) with customizable filters
- **Smart Fallback**: Graceful degradation to static content when API is unavailable
- **Enhanced Metadata**: Technologies, descriptions, and statistics from real repositories

### 🗄️ Database Integration (Planned)
- **Supabase Support**: Alternative data source for projects with PostgreSQL database
- **Flexible Data Management**: Enhanced project management and filtering capabilities
- **Real-time Updates**: Live data synchronization with database changes

### 🎨 Modern Design
- **Responsive Layout**: Mobile-first design that works on all devices
- **Dark Mode Support**: Beautiful light and dark themes with smooth transitions
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Modern Typography**: Clean, readable fonts optimized for all screen sizes

### 🛠️ Technical Excellence
- **Next.js 15**: Latest features with App Router and Server Components
- **TypeScript**: Full type safety for robust development
- **Tailwind CSS**: Utility-first styling with custom design system
- **Component Library**: Radix UI primitives for accessible components
- **Performance Optimized**: Fast loading with Next.js optimizations

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12.23.24
- **Icons**: FontAwesome 7.1.0
- **UI Components**: Radix UI primitives

### Backend & Database
- **GitHub API**: Real-time repository data integration
- **Supabase** (Planned): PostgreSQL database for enhanced data management
- **REST APIs**: Custom endpoints for projects and statistics

### Development & Analytics
- **Linting**: ESLint 9
- **Analytics**: Vercel Analytics
- **Build Tool**: Turbopack (Next.js built-in)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun
- GitHub Personal Access Token (optional, for enhanced GitHub integration)
- Supabase account (optional, for planned database integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Cyrochrome/portofolio-marcel.git
   cd portofolio-marcel
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your credentials:
   ```env
   # Required for GitHub integration (optional - provides enhanced project data)
   GITHUB_TOKEN=your_github_personal_access_token_here

   # Optional analytics tracking
   NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

   # Planned Supabase integration (when implemented)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📡 API Endpoints

The portfolio includes several API endpoints for dynamic data:

### Projects API
- `GET /api/projects` - Get projects with filtering options
  - `?type=featured` - Featured projects (default)
  - `?type=recent` - Recently updated projects
  - `?type=all` - All repositories
  - `?type=dynamic` - Custom filtered projects
  - `?limit=10` - Number of projects to return
  - `?minStars=5` - Minimum star count filter
  - `?sortBy=stars|updated|created|name` - Sort criteria
  - `?excludeForks=true` - Exclude forked repositories

### GitHub Integration APIs
- `GET /api/github/stats` - Overall GitHub statistics
- `GET /api/github/repos/[repo]` - Individual repository details

## 📁 Project Structure

```
portofolio-marcel/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   │   ├── github/     # GitHub integration APIs
│   │   │   └── projects/   # Projects API
│   │   ├── (home)/         # Home page
│   │   ├── about/          # About page
│   │   ├── projects/       # Projects page
│   │   └── contact/        # Contact page
│   ├── components/         # React components
│   │   ├── sections/       # Page sections
│   │   ├── github/         # GitHub-related components
│   │   └── ui/            # Reusable UI components
│   ├── lib/               # Utility functions
│   │   ├── github-utils.ts # GitHub API integration
│   │   ├── projects-utils.ts # Project data management
│   │   └── theme-provider.tsx # Theme management
│   ├── types/             # TypeScript type definitions
│   └── styles/            # Global styles
├── public/                # Static assets
└── README.md             # This file
```

## 🔧 Development

### Available Scripts

```bash
# Development server with hot reload (using Turbopack for faster builds)
npm run dev

# Production build (using Turbopack for faster builds)
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Environment Variables

Create a `.env.local` file in the root directory (copy from `.env.example`):

```env
# GitHub Integration (optional)
GITHUB_TOKEN=your_github_personal_access_token_here

# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Supabase Integration (planned)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npx vercel --prod
   ```

2. **Set environment variables** in Vercel dashboard:
   - `GITHUB_TOKEN` - Your GitHub Personal Access Token
   - `NEXT_PUBLIC_ANALYTICS_ID` - Your analytics provider ID (optional)
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL (when implemented)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key (when implemented)

3. **Deploy**
   ```bash
   git push
   ```

### Other Platforms

The app can be deployed to any platform supporting Node.js:

```bash
# Build for production
npm run build

# The app is now ready to be deployed to your hosting platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is private and not licensed for public use.

## 👤 Contact

**Marcel** - Portfolio Owner

- 🌐 **Website**: [Live Portfolio](https://portofolio-marcel.vercel.app)
- 🐙 **GitHub**: [Cyrochrome](https://github.com/Cyrochrome)
- 📧 **Email**: [Contact through portfolio website](https://portofolio-marcel.vercel.app/contact)

---

⭐ **Star this repository** if you find it helpful!

Built with ❤️ using Next.js 15, React 19, TypeScript, and Tailwind CSS with GitHub API integration and planned Supabase support.

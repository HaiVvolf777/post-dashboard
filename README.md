# Posts Dashboard

A modern, responsive dashboard application built with Next.js for managing posts. Features a public site for browsing posts and an admin dashboard for full CRUD operations.

## 🚀 Features

### Public Site
- **Homepage** (`/`) - Browse all posts with a clean, responsive grid layout
- **Post Details** (`/posts/[id]`) - View individual posts with full content
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Admin Dashboard
- **Overview** (`/admin`) - Dashboard with statistics and quick actions
- **Posts Management** - Full CRUD operations (Create, Read, Update, Delete)
- **Rich Text Editor** - Enhanced text editing experience for post content
- **Real-time Updates** - Optimistic updates with React Query
- **Confirmation Dialogs** - Safe deletion with confirmation prompts

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Query (TanStack Query)
- **API**: [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- **TypeScript**: Full type safety
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/posts-dashboard.git
   cd posts-dashboard
Install dependencies:

bash
npm install --legacy-peer-deps
# or
yarn install
# or
pnpm install
Run the development server:

bash
npm run dev
# or
yarn dev
# or
pnpm dev
Open your browser at http://localhost:3000

🏗️ Project Structure
text
src/
├── app/
│   ├── admin/          # Admin dashboard pages
│   ├── posts/[id]/     # Dynamic post detail pages
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   └── providers.tsx   # React Query provider
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── admin-dashboard.tsx
│   ├── post-detail.tsx
│   ├── post-form.tsx
│   ├── posts-list.tsx
│   └── posts-table.tsx
├── lib/
│   ├── api.ts          # API functions
│   ├── hooks.ts        # React Query hooks
│   └── utils.ts        # Utility functions
└── hooks/
    └── use-toast.ts    # Toast notifications
🔧 Available Scripts
npm run dev - Start development server

npm run build - Build for production

npm run start - Start production server

npm run lint - Run ESLint

🌐 API Integration
The app uses JSONPlaceholder API:

GET /posts - Fetch all posts

GET /posts/:id - Fetch single post

POST /posts - Create new post

PUT /posts/:id - Update existing post

DELETE /posts/:id - Delete post

🚀 Deployment
Vercel (Recommended)
Push your code to GitHub

Connect your repository to Vercel

Deploy automatically

The app can also be deployed to:

Netlify

Railway

AWS Amplify
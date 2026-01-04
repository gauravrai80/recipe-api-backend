# Recipes App - Frontend

A modern, animated recipe management application built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 📁 Project Structure

```
frontend/
├── src/
│   ├── animations/
│   │   └── motionVariants.js    # Framer Motion variants
│   ├── components/
│   │   ├── ui/                  # shadcn-ui components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── textarea.jsx
│   │   │   ├── label.jsx
│   │   │   ├── badge.jsx
│   │   │   └── skeleton.jsx
│   │   ├── EmptyState.jsx
│   │   ├── Loader.jsx
│   │   ├── Modal.jsx
│   │   ├── NavLink.jsx
│   │   ├── Navbar.jsx
│   │   └── RecipeCard.jsx
│   ├── lib/
│   │   └── utils.js             # Utility functions
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── RecipeDetails.jsx
│   │   ├── AddEditRecipe.jsx
│   │   └── NotFound.jsx
│   ├── services/
│   │   └── api.js               # Axios API service
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see backend README)

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create/update `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## ✨ Features

### Pages

- **Home** - Grid view of all recipes with search and filtering
- **Recipe Details** - Full recipe view with ingredients and instructions
- **Add Recipe** - Form to create new recipes
- **Edit Recipe** - Form to update existing recipes
- **404 Page** - Custom not found page

### UI/UX Features

- ✅ Responsive design (mobile-first)
- ✅ Smooth page transitions
- ✅ Card hover animations
- ✅ Staggered list animations
- ✅ Modal animations
- ✅ Loading skeletons
- ✅ Empty states
- ✅ Error handling
- ✅ Form validation
- ✅ Delete confirmations
- ✅ Keyboard accessibility

### Animations

All animations are centralized in `src/animations/motionVariants.js`:

- Page transitions
- Card hover effects
- Staggered list items
- Modal/dialog animations
- Button interactions
- Fade, slide, scale, and rotate effects

## 🎨 Design System

### Colors

The app uses a semantic color system with CSS variables:

- Primary (Green): Recipe actions and highlights
- Secondary: Subtle backgrounds
- Destructive (Red): Delete actions
- Muted: Secondary text and backgrounds

### Components

All UI components follow shadcn-ui patterns for consistency and accessibility.

## 📡 API Integration

The frontend connects to the backend API using Axios:

```javascript
// Base URL from environment
VITE_API_BASE_URL=http://localhost:5000/api

// API Methods
- getAllRecipes()
- getRecipeById(id)
- createRecipe(data)
- updateRecipe(id, data)
- deleteRecipe(id)
```

## 🚢 Deployment

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variable: `VITE_API_BASE_URL=your_backend_url`

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add environment variables in Vercel dashboard**
   - `VITE_API_BASE_URL=your_backend_url`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |

### Vite Configuration

The app uses path aliases for cleaner imports:

```javascript
import Component from '@/components/Component'
```

## 📚 Key Libraries

- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library
- **clsx & tailwind-merge** - Class name utilities

## 🎯 Best Practices

- Component-based architecture
- Centralized API service
- Reusable animation variants
- Consistent error handling
- Form validation
- Loading states
- Empty states
- Responsive design
- Accessibility features

## 📄 License

MIT

---

Built with ❤️ using React and Vite

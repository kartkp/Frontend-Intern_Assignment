# hr-Dash: 
hr-Dash is a dynamic HR dashboard, meticulously crafted with Next.js, Tailwind CSS, and Zustand for seamless state management. It's designed to empower HR managers with robust tools for tracking employee performance, managing key personnel, and gaining actionable insights.
## Features

### Dashboard Homepage
The main dashboard provides a comprehensive overview, showcasing individual employee cards complete with essential information and visual performance rating bars. You can easily bookmark employees for quick access, promote high-achievers, and leverage powerful search and filter options to find exactly who you're looking for.

### Employee Details
Dive deep into employee data with dedicated profiles that present personal details and a full performance history. A convenient tabbed interface organizes information into Overview, Projects, and Feedback sections, making it simple to navigate. Plus, there's a straightforward form for submitting new feedback.

### Bookmarks
Keep track of your most important employees in one place. The Bookmarks section lists all bookmarked individuals, offering quick actions to remove them from bookmarks, promote them, or assign them to projects.

### Powerful Analytics
Gain valuable insights with a dedicated analytics section. Visualize department-wise average ratings, understand performance distribution through insightful charts, track bookmark trends over time, and easily identify your top performers.

### Under the Hood
HR-Dash is built on a solid foundation of modern web technologies:

React with the Next.js App Router provides a high-performance and scalable front-end.

Tailwind CSS ensures a sleek, responsive, and fully customizable design.

JavaScript (ES6+) powers the interactive elements and logic.

Zustand offers efficient and lightweight state management.

Chart.js and react-chartjs-2 are leveraged for compelling data visualizations in the analytics section.

Framer Motion adds polished, smooth animations throughout the application.

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/kartkp/Frontend-Intern_Assignment.git
   cd hr-Dash
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
hr-Dash/
├── public/               # Static assets (favicon, manifest, etc.)
├── src/
│   ├── app/              # Global styles
│   │   └── global.css
│   ├── components/       # Reusable UI components
│   │   ├── EmployeeCard.tsx
│   │   ├── FilterDropdown.tsx
│   │   ├── Layout.tsx
│   │   ├── SearchBar.tsx
│   │   └── StarRating.tsx
│   ├── context/          # Global state management
│   │   └── AppContext.tsx
│   ├── hooks/            # Custom React hooks and types
│   │   ├── types.ts
│   │   ├── useBookmarks.tsx
│   │   └── useEmployees.tsx
│   ├── lib/              # API utilities
│   │   └── api.ts
│   ├── pages/            # Application pages
│   │   ├── Analytics.tsx
│   │   ├── api.ts
│   │   ├── Bookmarks.tsx
│   │   ├── Dashboard.tsx
│   │   ├── EmployeeDetails.tsx
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── utils/            # Utility functions and mock data
│   │   └── mockData.ts
│   ├── App.tsx           # App entry component
│   ├── index.css         # Tailwind and global styles
│   ├── main.tsx          # Vite entry point
│   └── vite-env.d.ts     # Vite TypeScript declarations
├── .gitignore
├── index.html            # Main HTML template
├── package.json          # Project metadata and scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration

```

## Custom Hooks

- **useBookmarks**: Manages bookmarked employees with Zustand
- **SearchBar**: Handles search and filtering functionality
- **useEmployees**: Handles Employees Data

## API

The application uses [DummyJSON](https://dummyjson.com/users) for fetching user data, with additional mock data generated for:
- Department information
- Performance ratings
- Project assignments
- Feedback history


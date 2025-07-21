# HR Performance Dashboard

A modern HR dashboard built with Next.js, Tailwind CSS, and Zustand for state management. This application helps HR managers track employee performance, manage bookmarks, and view detailed insights.

## Features

### Dashboard Homepage
- Displays user cards with employee information
- Shows performance ratings with a visual rating bar
- Allows bookmarking and promoting employees
- Includes search and filter functionality

### Employee Details
- Detailed employee profiles with personal information
- Performance history with ratings
- Tabbed interface for Overview, Projects, and Feedback
- Form for submitting new feedback

### Bookmarks
- List of all bookmarked employees
- Options to remove from bookmarks
- Actions for promoting or assigning to projects

### Analytics
- Department-wise average ratings
- Performance distribution charts
- Bookmark trends over time
- Top performers list

### Additional Features
- Dark/Light mode toggle
- Responsive design for all device sizes
- Custom hooks for state management
- Loading and error states

## Tech Stack

- **React** with Next.js App Router
- **Tailwind CSS** for styling
- **JavaScript (ES6+)**
- **Zustand** for state management
- **Chart.js** and **react-chartjs-2** for analytics
- **Framer Motion** for animations

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/sohil-khann/hr-dashboard.git
   cd hr-dashboard
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

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
hr-dashboard/
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── analytics/  # Analytics page
│   │   ├── bookmarks/  # Bookmarks page
│   │   ├── employee/   # Employee details page
│   │   ├── layout.js   # Root layout
│   │   └── page.js     # Homepage
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom hooks
│   └── lib/            # Utilities and API functions
├── .eslintrc.json      # ESLint configuration
├── next.config.js      # Next.js configuration
├── package.json        # Dependencies and scripts
├── postcss.config.js   # PostCSS configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Custom Hooks

- **useBookmarks**: Manages bookmarked employees with Zustand
- **useSearch**: Handles search and filtering functionality
- **useTheme**: Controls dark/light mode switching

## API

The application uses [DummyJSON](https://dummyjson.com/users) for fetching user data, with additional mock data generated for:
- Department information
- Performance ratings
- Project assignments
- Feedback history


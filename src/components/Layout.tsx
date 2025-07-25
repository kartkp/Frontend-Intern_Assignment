import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

interface LayoutProps {
  children: ReactNode;
}

type NavItem = {
  path: string;
  label: string;
  icon: ReactNode;
  badge?: number;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode, toggleDarkMode, bookmarkedIds } = useAppContext();
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: '/', label: 'Dashboard', icon: <i className="fi fi-rs-home text-[16px]"></i> },
    { path: '/bookmarks', label: 'Bookmarks', icon: <i className="fi fi-rs-bookmark text-[16px]"></i>, badge: bookmarkedIds?.length || 0 },
    { path: '/analytics', label: 'Analytics', icon: <i className="fi fi-rs-chart-pie-alt text-[16px]"></i> },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200 shadow-md backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200"
            >
              <img
                src="/favicon-32x32.png"
                alt="HR Dashboard Logo"
                className="w-8 h-8 rounded-lg"
              />
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                -Dash
              </h1>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? darkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-500 text-white shadow'
                      : darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className="absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full flex items-center justify-center bg-red-500 text-white"
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                darkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? 'day' : 'nite'}
            </button>
          </div>
        </div>

        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex justify-around py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center px-3 py-2 text-xs font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? darkMode
                      ? 'text-blue-400'
                      : 'text-blue-600'
                    : darkMode
                      ? 'text-gray-400'
                      : 'text-gray-600'
                }`}
              >
                <span className="text-lg mb-1">{item.icon}</span>
                {item.label}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 right-2 w-4 h-4 text-xs rounded-full bg-red-500 text-white flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;

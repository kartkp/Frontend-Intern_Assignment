import React from 'react';
import { Link } from 'react-router-dom';
import { Employee } from '../context/AppContext';
import { useAppContext } from '../context/AppContext';
import StarRating from './StarRating';

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const { bookmarkedIds, toggleBookmark, darkMode } = useAppContext();
  const isBookmarked = bookmarkedIds.includes(employee.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(employee.id);
  };

  const handlePromote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`Promoting ${employee.firstName} ${employee.lastName}!`);
  };

  return (
    <div
      className={`group relative rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        darkMode
          ? 'bg-gray-800 border-gray-700 hover:shadow-gray-900/20'
          : 'bg-white border-gray-200 hover:shadow-gray-200/50'
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={employee.image}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
              />
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${
                  employee.rating >= 4
                    ? 'bg-green-500 border-white dark:border-gray-800'
                    : employee.rating >= 3
                    ? 'bg-yellow-500 border-white dark:border-gray-800'
                    : 'bg-red-500 border-white dark:border-gray-800'
                }`}
              ></div>
            </div>
            <div>
              <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {employee.firstName} {employee.lastName}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {employee.department}
              </p>
            </div>
          </div>
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isBookmarked
                ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                : darkMode
                ? 'text-gray-400 hover:text-yellow-500 hover:bg-gray-700'
                : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-50'
            }`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            {isBookmarked ? '★' : '☆'}
          </button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email:</span>
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {employee.email}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Age:</span>
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {employee.age}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Performance:</span>
            <StarRating rating={employee.rating} size="sm" showNumber />
          </div>
        </div>

        <div className="flex space-x-2">
          <Link
            to={`/employee/${employee.id}`}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg text-center transition-colors duration-200 ${
              darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            View Details
          </Link>
          <button
            onClick={handlePromote}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            Promote
          </button>
        </div>
      </div>
      <div
        className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
          darkMode
            ? 'bg-gradient-to-r from-blue-600/5 to-purple-600/5'
            : 'bg-gradient-to-r from-blue-500/5 to-purple-500/5'
        }`}
      ></div>
    </div>
  );
};

export default EmployeeCard;

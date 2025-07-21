import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { getDepartments, getRatings } from '../utils/mockData';

const FilterDropdown: React.FC = () => {
  const {
    employees,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
    darkMode,
  } = useAppContext();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const departments = getDepartments(employees);
  const ratings = getRatings();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDepartmentToggle = (department: string) => {
    setSelectedDepartments(
      selectedDepartments.includes(department)
        ? selectedDepartments.filter((d) => d !== department)
        : [...selectedDepartments, department]
    );
  };

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings(
      selectedRatings.includes(rating)
        ? selectedRatings.filter((r) => r !== rating)
        : [...selectedRatings, rating]
    );
  };

  const clearFilters = () => {
    setSelectedDepartments([]);
    setSelectedRatings([]);
  };

  const activeFiltersCount = selectedDepartments.length + selectedRatings.length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors duration-200 ${
          darkMode
            ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
          />
        </svg>
        <span>Filters</span>
        {activeFiltersCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-2 w-80 rounded-lg border shadow-lg z-50 ${
            darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Filter Employees
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className={`text-sm ${
                    darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-600'
                  }`}
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="mb-6">
              <h4 className={`font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Department</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {departments.map((department) => (
                  <label
                    key={department}
                    className={`flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-opacity-50 ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDepartments.includes(department)}
                      onChange={() => handleDepartmentToggle(department)}
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {department}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className={`font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Performance Rating
              </h4>
              <div className="space-y-2">
                {ratings.map((rating) => (
                  <label
                    key={rating}
                    className={`flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-opacity-50 ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(rating)}
                      onChange={() => handleRatingToggle(rating)}
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className={`text-sm ${
                              index < rating
                                ? rating >= 4
                                  ? 'text-green-500'
                                  : rating >= 3
                                  ? 'text-yellow-500'
                                  : 'text-red-500'
                                : darkMode
                                ? 'text-gray-600'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {rating} star{rating !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;

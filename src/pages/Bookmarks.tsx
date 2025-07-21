import React from 'react';
import { useAppContext } from '../context/AppContext';
import EmployeeCard from '../components/EmployeeCard';

const Bookmarks: React.FC = () => {
  const { employees, bookmarkedIds, darkMode } = useAppContext();

  const bookmarkedEmployees = employees.filter(emp => bookmarkedIds.includes(emp.id));

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Bookmarked Employees
        </h1>
        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Your saved employees for quick access
        </p>
      </div>
      {bookmarkedEmployees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 ${
          darkMode ? 'bg-gray-800' : 'bg-gray-50'
        } rounded-xl`}>
          {/* <div className="text-6xl mb-4">📚</div> */}
          <h3 className={`text-lg font-medium mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            No bookmarked employees
          </h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Start bookmarking employees from the dashboard to see them here
          </p>
        </div>
      )}
    </div>
  );
};
export default Bookmarks;
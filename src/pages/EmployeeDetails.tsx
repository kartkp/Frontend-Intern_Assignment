import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { darkMode } = useAppContext();

  return (
    <div className="space-y-8">
      <div
        className={`p-8 rounded-xl border text-center ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="text-6xl mb-4">👤</div>
        <h2
          className={`text-2xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Employee Details
        </h2>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Detailed view for employee ID: {id}
        </p>
        <p className={`mt-4 text-sm text-gray-500`}>
          This page will show comprehensive employee information, performance history, and tabbed interface.
        </p>
      </div>
    </div>
  );
};

export default EmployeeDetails;

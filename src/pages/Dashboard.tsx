import React, { useEffect, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchEmployeesData } from '../utils/mockData';
import EmployeeCard from '../components/EmployeeCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';

const Dashboard: React.FC = () => {
  const {
    employees,
    setEmployees,
    searchTerm,
    selectedDepartments,
    selectedRatings,
    loading,
    setLoading,
    darkMode
  } = useAppContext();

  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true);
      try {
        const data = await fetchEmployeesData();
        setEmployees(data);
      } catch (error) {
        console.error('Failed to load employees:', error);
      } finally {
        setLoading(false);
      }
    };

    if (employees.length === 0) {
      loadEmployees();
    }
  }, [employees.length, setEmployees, setLoading]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase());

      // Department filter
      const matchesDepartment = selectedDepartments.length === 0 || 
        selectedDepartments.includes(employee.department);

      // Rating filter
      const matchesRating = selectedRatings.length === 0 || 
        selectedRatings.includes(employee.rating);

      return matchesSearch && matchesDepartment && matchesRating;
    });
  }, [employees, searchTerm, selectedDepartments, selectedRatings]);

  const stats = useMemo(() => {
    const totalEmployees = employees.length;
    const averageRating = employees.length > 0 
      ? employees.reduce((sum, emp) => sum + emp.rating, 0) / employees.length 
      : 0;
    const topPerformers = employees.filter(emp => emp.rating >= 4).length;
    const departments = new Set(employees.map(emp => emp.department)).size;

    return { totalEmployees, averageRating, topPerformers, departments };
  }, [employees]);

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className={`h-8 rounded-lg animate-pulse ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-1/3`}></div>
          <div className={`h-4 rounded animate-pulse ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-2/3`}></div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`p-6 rounded-xl border animate-pulse ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className={`h-4 rounded mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-1/2`}></div>
              <div className={`h-8 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-1/3`}></div>
            </div>
          ))}
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`p-6 rounded-xl border animate-pulse ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <div className="space-y-2">
                  <div className={`h-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-24`}></div>
                  <div className={`h-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-16`}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className={`h-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-full`}></div>
                <div className={`h-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-3/4`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Employee Dashboard
          </h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage and track your team's performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`p-6 rounded-xl border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Employees
            </div>
            <div className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {stats.totalEmployees}
            </div>
          </div>

          <div className={`p-6 rounded-xl border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Average Rating
            </div>
            <div className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {stats.averageRating.toFixed(1)}
            </div>
          </div>

          <div className={`p-6 rounded-xl border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Top Performers
            </div>
            <div className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {stats.topPerformers}
            </div>
          </div>

          <div className={`p-6 rounded-xl border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Departments
            </div>
            <div className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {stats.departments}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchBar />
        </div>
        <FilterDropdown />
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Showing {filteredEmployees.length} of {employees.length} employees
        </p>
        {(searchTerm || selectedDepartments.length > 0 || selectedRatings.length > 0) && (
          <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            Filters applied
          </p>
        )}
      </div>

      {/* Employee Grid */}
      {filteredEmployees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 ${
          darkMode ? 'bg-gray-800' : 'bg-gray-50'
        } rounded-xl`}>
          <div className="text-6xl mb-4">🔍</div>
          <h3 className={`text-lg font-medium mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            No employees found
          </h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
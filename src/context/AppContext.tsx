import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  rating: number;
  phone: string;
  address: {
    address: string;
    city: string;
    state: string;
  };
  image: string;
  bio?: string;
  projects?: string[];
  feedback?: string[];
}

interface AppContextType {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  bookmarkedIds: number[];
  toggleBookmark: (id: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDepartments: string[];
  setSelectedDepartments: (departments: string[]) => void;
  selectedRatings: number[];
  setSelectedRatings: (ratings: number[]) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleBookmark = (id: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((bookmarkId) => bookmarkId !== id) : [...prev, id]
    );
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        employees,
        setEmployees,
        bookmarkedIds,
        toggleBookmark,
        searchTerm,
        setSearchTerm,
        selectedDepartments,
        setSelectedDepartments,
        selectedRatings,
        setSelectedRatings,
        darkMode,
        toggleDarkMode,
        loading,
        setLoading,
      }}
    >
      <div className={darkMode ? 'dark' : ''}>{children}</div>
    </AppContext.Provider>
  );
};

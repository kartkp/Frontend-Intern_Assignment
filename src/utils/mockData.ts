import { Employee } from '../context/AppContext';

const departments = [
  'Engineering', 'Marketing', 'Sales', 'HR', 'Finance',
  'Operations', 'Design', 'Product', 'Customer Success'
];

const projects = [
  'Website Redesign', 'Mobile App Development', 'Data Migration',
  'Customer Portal', 'Analytics Dashboard', 'API Integration',
  'Security Audit', 'Performance Optimization', 'User Research'
];

const feedbackComments = [
  'Excellent team player with strong technical skills',
  'Shows great initiative and leadership potential',
  'Consistently delivers high-quality work on time',
  'Could improve communication with stakeholders',
  'Demonstrates strong problem-solving abilities',
  'Needs to focus more on documentation',
  'Great mentor to junior team members',
  'Shows creativity in approaching challenges'
];

export const generateMockEmployee = (userData: any): Employee => {
  const department = departments[Math.floor(Math.random() * departments.length)];
  const rating = Math.floor(Math.random() * 5) + 1;

  return {
    id: userData.id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    age: userData.age,
    department,
    rating,
    phone: userData.phone,
    address: userData.address,
    image: userData.image,
    bio: `${userData.firstName} is a dedicated professional in the ${department} department with ${
      Math.floor(Math.random() * 10) + 1
    } years of experience. Known for their attention to detail and collaborative approach.`,
    projects: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, () =>
      projects[Math.floor(Math.random() * projects.length)]
    ),
    feedback: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
      feedbackComments[Math.floor(Math.random() * feedbackComments.length)]
    )
  };
};

export const fetchEmployeesData = async (): Promise<Employee[]> => {
  try {
    const response = await fetch('https://dummyjson.com/users?limit=20');
    const data = await response.json();
    return data.users.map((user: any) => generateMockEmployee(user));
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
};

export const getDepartments = (employees: Employee[]): string[] => {
  return [...new Set(employees.map(emp => emp.department))].sort();
};

export const getRatings = (): number[] => {
  return [1, 2, 3, 4, 5];
};

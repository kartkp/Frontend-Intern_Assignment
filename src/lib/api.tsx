export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  company?: {
    department: string;
  };
  performance: number;
}

export interface AnalyticsData {
  averageRating: number;
  topDepartment: string;
  totalEmployees: number;
  departmentRatings: Record<string, number>;
  departmentCounts: Record<string, number>;
  performanceDistribution: number[];
  topPerformers: User[];
  bookmarkTrends: any[];
}

export const fetchUsers = async (limit = 20): Promise<User[]> => {
  try {
    const response = await fetch(`https://dummyjson.com/users?limit=${limit}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    return data.users.map((user: any) => ({
      ...user,
      performance: Math.floor(Math.random() * 5) + 1,
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const generateAnalyticsData = (users: User[]): AnalyticsData => {
  if (!users || users.length === 0) {
    return {
      averageRating: 0,
      topDepartment: 'N/A',
      totalEmployees: 0,
      departmentRatings: {},
      departmentCounts: {},
      performanceDistribution: [0, 0, 0, 0, 0],
      topPerformers: [],
      bookmarkTrends: [],
    };
  }

  const departmentRatings: Record<string, number> = {};
  const departmentCounts: Record<string, number> = {};
  let totalRating = 0;
  const performanceDistribution = [0, 0, 0, 0, 0];

  users.forEach((user) => {
    const department = user.company?.department || 'Other';
    const rating = user.performance;

    totalRating += rating;

    if (rating >= 1 && rating <= 5) {
      performanceDistribution[rating - 1]++;
    }

    if (!departmentRatings[department]) {
      departmentRatings[department] = 0;
      departmentCounts[department] = 0;
    }

    departmentRatings[department] += rating;
    departmentCounts[department]++;
  });

  const averageRating = totalRating / users.length;

  let topDepartment = 'N/A';
  let highestRating = 0;

  for (const dept in departmentRatings) {
    const avgRating = departmentRatings[dept] / departmentCounts[dept];
    departmentRatings[dept] = avgRating;

    if (avgRating > highestRating) {
      highestRating = avgRating;
      topDepartment = dept;
    }
  }

  const topPerformers = users
    .filter((user) => user.performance >= 4)
    .sort((a, b) => b.performance - a.performance)
    .slice(0, 5);

  return {
    averageRating,
    topDepartment,
    totalEmployees: users.length,
    departmentRatings,
    departmentCounts,
    performanceDistribution,
    topPerformers,
    bookmarkTrends: [],
  };
};

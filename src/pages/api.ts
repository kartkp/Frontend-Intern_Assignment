export interface AnalyticsData {
  averageRating: number;
  topDepartment: string;
  totalEmployees: number;
  departmentRatings: Record<string, number>;
  departmentCounts: Record<string, number>;
  performanceDistribution: number[];
  topPerformers: any[];
  bookmarkTrends: any[];
}

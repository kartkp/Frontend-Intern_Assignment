'use client';
import { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { useAppContext } from '../context/AppContext';
import { fetchUsers, generateAnalyticsData, AnalyticsData } from '../lib/api';
import useBookmarks from '../hooks/useBookmarks';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const AnalyticsPage = () => {
  const { darkMode } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const { bookmarks } = useBookmarks();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const users = await fetchUsers();
        const data = generateAnalyticsData(users);
        setAnalyticsData(data);
      } catch {
        setError('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const chartOptions: { pie: ChartOptions<'pie'>; line: ChartOptions<'line'> } = {
    pie: { responsive: true, plugins: { legend: { position: 'bottom' } } },
    line: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
    },
  };

  const getBookmarkTrendsData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const lastSixMonths =
      currentMonth >= 5 ? months.slice(currentMonth - 5, currentMonth + 1) : months.slice(0, currentMonth + 1);
    const previousData = Array(lastSixMonths.length - 1)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10));
    return {
      labels: lastSixMonths,
      datasets: [
        {
          label: 'Bookmarked Employees',
          data: [...previousData, bookmarks.length],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          tension: 0.3,
        },
      ],
    };
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div
          className={`animate-spin rounded-full h-16 w-16 border-t-4 ${
            darkMode ? 'border-blue-400' : 'border-blue-600'
          }`}
        ></div>
      </div>
    );
  }

  if (error || !analyticsData) {
    return (
      <div className={`flex items-center justify-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-red-50'}`}>
        <div
          className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
          }`}
        >
          <p className="text-lg font-semibold text-red-500">Error Loading Analytics</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen px-4 py-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Analytics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Total Employees" value={analyticsData.totalEmployees} darkMode={darkMode} />
          <StatCard label="Average Rating" value={analyticsData.averageRating.toFixed(1)} darkMode={darkMode} />
          <StatCard label="Top Department" value={analyticsData.topDepartment} darkMode={darkMode} />
          <StatCard label="Bookmarked" value={bookmarks.length} darkMode={darkMode} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Department Breakdown" darkMode={darkMode}>
            <Pie
              data={{
                labels: Object.keys(analyticsData.departmentCounts),
                datasets: [
                  {
                    data: Object.values(analyticsData.departmentCounts),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.5)',
                      'rgba(54, 162, 235, 0.5)',
                      'rgba(255, 206, 86, 0.5)',
                      'rgba(75, 192, 192, 0.5)',
                      'rgba(153, 102, 255, 0.5)',
                    ],
                  },
                ],
              }}
              options={chartOptions.pie}
            />
          </ChartCard>

          <ChartCard title="Bookmark Trends" darkMode={darkMode}>
            <Line data={getBookmarkTrendsData()} options={chartOptions.line} />
          </ChartCard>
        </div>

        <ChartCard title="Top Performers" darkMode={darkMode}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {analyticsData.topPerformers.map((user) => (
              <div
                key={user.id}
                className={`flex items-center space-x-3 p-3 rounded-lg shadow ${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                }`}
              >
                <img
                  src={user.image || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
                  alt={user.firstName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm opacity-70">{user.company?.department || 'Department'}</p>
                  <div className="flex">
                    {Array.from({ length: user.performance }).map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                    {Array.from({ length: 5 - user.performance }).map((_, i) => (
                      <span key={i} className={darkMode ? 'text-gray-600' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

const StatCard = ({
  label,
  value,
  darkMode,
}: {
  label: string;
  value: string | number;
  darkMode: boolean;
}) => (
  <div
    className={`p-4 rounded-lg shadow transition ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}
  >
    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ChartCard = ({
  title,
  children,
  darkMode,
}: {
  title: string;
  children: React.ReactNode;
  darkMode: boolean;
}) => (
  <div
    className={`p-6 rounded-lg shadow transition ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}
  >
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

export default AnalyticsPage;

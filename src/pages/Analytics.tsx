'use client'

import { useState, useEffect } from 'react'
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
} from 'chart.js'
import { Pie, Line } from 'react-chartjs-2'
import { fetchUsers, generateAnalyticsData, AnalyticsData } from '../lib/api'
import useBookmarks from '../hooks/useBookmarks'

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
)

function AnalyticsPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const { bookmarks } = useBookmarks()

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const users = await fetchUsers()
        const data = generateAnalyticsData(users)
        setAnalyticsData(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load analytics data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const getBookmarkTrendsData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const currentMonth = new Date().getMonth()
    const lastSixMonths = currentMonth >= 5 ? months.slice(currentMonth - 5, currentMonth + 1) : months.slice(0, currentMonth + 1)
    const previousData = Array(lastSixMonths.length - 1).fill(0).map(() => Math.floor(Math.random() * 10))

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
    }
  }

  const chartOptions: { pie: ChartOptions<'pie'>, line: ChartOptions<'line'> } = {
    pie: { responsive: true, plugins: { legend: { position: 'bottom' } } },
    line: { responsive: true, plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } },
  }

  if (loading) return <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div></div>
  if (error || !analyticsData) return <div className="flex items-center justify-center h-screen bg-red-50 dark:bg-gray-900"><div className="bg-white/30 dark:bg-gray-800/30 p-6 rounded-3xl shadow-2xl backdrop-blur-md text-center space-y-2 border border-red-400"><p className="text-red-600 dark:text-red-400 text-lg font-semibold">Error Loading Analytics</p><p className="text-gray-600 dark:text-gray-300">{error}</p></div></div>

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center text-gray-900 dark:text-white drop-shadow-xl">Analytics Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <GradientCard title="Performance Summary">
            <div className="grid grid-cols-2 gap-6">
              <SummaryCard title="Average Rating" value={analyticsData.averageRating.toFixed(1)} color="blue" />
              <SummaryCard title="Top Department" value={analyticsData.topDepartment} color="green" />
              <SummaryCard title="Total Employees" value={analyticsData.totalEmployees.toString()} color="purple" />
              <SummaryCard title="Bookmarked" value={bookmarks.length.toString()} color="yellow" />
            </div>
          </GradientCard>

          <GradientCard title="Department Breakdown">
            <div className="h-64">
              <Pie data={{ labels: Object.keys(analyticsData.departmentCounts), datasets: [{ label: 'Employees', data: Object.values(analyticsData.departmentCounts), backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)'] }] }} options={chartOptions.pie} />
            </div>
          </GradientCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <GradientCard title="Performance Distribution">
            <div className="h-64">
              <Pie data={{ labels: ['Poor (1)', 'Needs Improvement (2)', 'Average (3)', 'Good (4)', 'Excellent (5)'], datasets: [{ data: analyticsData.performanceDistribution, backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(255, 159, 64, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(54, 162, 235, 0.5)'] }] }} options={chartOptions.pie} />
            </div>
          </GradientCard>

          <GradientCard title="Bookmark Trends">
            <div className="h-64">
              <Line data={getBookmarkTrendsData()} options={chartOptions.line} />
            </div>
          </GradientCard>
        </div>

        <TopPerformersSection performers={analyticsData.topPerformers} />
      </div>
    </div>
  )
}

function TopPerformersSection({ performers }: { performers: any[] }) {
  return (
    <GradientCard title="Top Performers">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {performers.map((user) => (
          <div key={user.id} className="flex items-center space-x-4 bg-white/60 dark:bg-gray-700/40 rounded-xl p-3 shadow hover:shadow-lg transition">
            <img src={user.image || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`} alt={user.firstName} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.company?.department || 'Department'}</p>
              <div className="flex items-center space-x-0.5 mt-1">
                {Array.from({ length: user.performance }).map((_, idx) => (<span key={idx} className="text-yellow-400">★</span>))}
                {Array.from({ length: 5 - user.performance }).map((_, idx) => (<span key={idx} className="text-gray-400 dark:text-gray-600">★</span>))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </GradientCard>
  )
}

interface GradientCardProps { title: string, children: React.ReactNode }
function GradientCard({ title, children }: GradientCardProps) {
  return <div className="rounded-3xl bg-white/10 dark:bg-gray-800/20 backdrop-blur-lg border border-white/20 dark:border-gray-700 shadow-xl p-6 hover:shadow-2xl transition-all duration-300"><h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100 drop-shadow">{title}</h2>{children}</div>
}

interface SummaryCardProps { title: string, value: string, color: 'blue' | 'green' | 'purple' | 'yellow' }
function SummaryCard({ title, value, color }: SummaryCardProps) {
  const gradients: Record<SummaryCardProps['color'], string> = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    purple: 'from-purple-400 to-purple-600',
    yellow: 'from-yellow-400 to-yellow-600',
  }
  return <div className={`rounded-2xl p-4 bg-gradient-to-br ${gradients[color]} text-white shadow-lg transition-transform duration-300 hover:scale-105`}><p className="text-sm font-medium opacity-80">{title}</p><p className="text-2xl font-bold mt-1">{value}</p></div>
}

export default AnalyticsPage

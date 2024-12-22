'use client'

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { ClientOnly } from "@/components/ClientOnly"

// Business Growth Data
const revenueGrowthData = [
  { month: 'Jan', withWebsite: 15000, withoutWebsite: 8000 },
  { month: 'Feb', withWebsite: 18000, withoutWebsite: 8200 },
  { month: 'Mar', withWebsite: 22000, withoutWebsite: 8400 },
  { month: 'Apr', withWebsite: 25000, withoutWebsite: 8600 },
  { month: 'May', withWebsite: 29000, withoutWebsite: 8800 },
  { month: 'Jun', withWebsite: 34000, withoutWebsite: 9000 },
]

const customerAcquisitionData = [
  { source: 'Website', value: 45 },
  { source: 'Word of Mouth', value: 25 },
  { source: 'Social Media', value: 20 },
  { source: 'Other', value: 10 },
]

const onlinePresenceStats = [
  { year: '2019', percentage: 45 },
  { year: '2020', percentage: 55 },
  { year: '2021', percentage: 65 },
  { year: '2022', percentage: 75 },
  { year: '2023', percentage: 85 },
]

const clientGrowthData = [
  { month: 'Jan', withWebsite: 45, withoutWebsite: 12, potential: 65 },
  { month: 'Feb', withWebsite: 52, withoutWebsite: 15, potential: 72 },
  { month: 'Mar', withWebsite: 58, withoutWebsite: 14, potential: 85 },
  { month: 'Apr', withWebsite: 65, withoutWebsite: 16, potential: 92 },
  { month: 'May', withWebsite: 75, withoutWebsite: 18, potential: 105 },
  { month: 'Jun', withWebsite: 85, withoutWebsite: 17, potential: 120 },
]

const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#6366F1']

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const StatCard = ({ title, value, description }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="p-6 rounded-xl backdrop-blur-xl backdrop-saturate-150 border border-opacity-20"
  >
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
      {value}
    </p>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
)

export default function WhyWebsite() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <ClientOnly>
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative py-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-4"
          >
            <motion.h1
              {...fadeInUp}
              className="text-5xl md:text-6xl font-bold text-center mb-6"
            >
              The Impact of Websites on
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Small Business Growth
              </span>
            </motion.h1>
            <motion.p
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16"
            >
              Real data showing how websites transform small businesses into thriving online enterprises
            </motion.p>

            {/* Key Statistics */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <StatCard
                title="Average Revenue Increase"
                value="127%"
                description="Year-over-year growth for businesses with professional websites"
              />
              <StatCard
                title="Customer Reach"
                value="5.4x"
                description="Wider customer reach compared to businesses without websites"
              />
              <StatCard
                title="ROI"
                value="312%"
                description="Average return on investment within the first year"
              />
            </div>
          </motion.div>
        </section>

        {/* Client Growth Chart */}
        <section className="py-20 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              {...fadeInUp}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Client Growth Potential</h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 px-4">
                Average monthly new clients comparison
              </p>
            </motion.div>

            {/* Mobile Stats Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="md:hidden mb-8 grid grid-cols-1 gap-4 px-4"
            >
              {[
                { 
                  label: 'Potential with Our Website',
                  value: '120',
                  subtext: 'clients/month',
                  color: '#EC4899'
                },
                { 
                  label: 'With Basic Website',
                  value: '85',
                  subtext: 'clients/month',
                  color: '#3B82F6'
                },
                { 
                  label: 'Without Website',
                  value: '17',
                  subtext: 'clients/month',
                  color: '#9CA3AF'
                }
              ].map((stat) => (
                <div 
                  key={stat.label}
                  className="p-4 rounded-xl backdrop-blur-xl backdrop-saturate-150 border border-opacity-20"
                  style={{
                    borderColor: stat.color,
                    background: `linear-gradient(to right, ${stat.color}10, transparent)`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{stat.label}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</span>
                      <span className="text-xs text-gray-500">{stat.subtext}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="h-[300px] md:h-[500px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={clientGrowthData}
                  margin={{ 
                    top: 20, 
                    right: 10,
                    left: 0,
                    bottom: 20,
                    ...(window.innerWidth >= 768 ? { right: 30, left: 20 } : {})
                  }}
                >
                  <defs>
                    <linearGradient id="colorPotential" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EC4899" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorWithWebsite" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorWithoutWebsite" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={isDark ? '#374151' : '#E5E7EB'} 
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="month" 
                    stroke={isDark ? '#9CA3AF' : '#6B7280'}
                    tick={{ fontSize: window.innerWidth >= 768 ? 14 : 12 }}
                    tickLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    stroke={isDark ? '#9CA3AF' : '#6B7280'}
                    tick={{ fontSize: window.innerWidth >= 768 ? 14 : 12 }}
                    tickLine={false}
                    axisLine={false}
                    label={{ 
                      value: 'New Clients per Month', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { 
                        textAnchor: 'middle', 
                        fill: isDark ? '#9CA3AF' : '#6B7280',
                        fontSize: window.innerWidth >= 768 ? 14 : 12
                      },
                      offset: window.innerWidth >= 768 ? 0 : -10
                    }}
                    width={window.innerWidth >= 768 ? 80 : 50}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                      borderColor: isDark ? '#374151' : '#E5E7EB',
                      borderRadius: '8px',
                      padding: window.innerWidth >= 768 ? '12px' : '8px'
                    }}
                    itemStyle={{ fontSize: window.innerWidth >= 768 ? '14px' : '12px' }}
                    labelStyle={{ 
                      fontSize: window.innerWidth >= 768 ? '16px' : '14px', 
                      fontWeight: 'bold', 
                      marginBottom: window.innerWidth >= 768 ? '8px' : '4px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="potential"
                    stroke="#EC4899"
                    strokeWidth={window.innerWidth >= 768 ? 3 : 2}
                    fill="url(#colorPotential)"
                    dot={window.innerWidth >= 768 ? { fill: '#EC4899', strokeWidth: 2 } : false}
                    activeDot={{ r: window.innerWidth >= 768 ? 8 : 6 }}
                    name="Potential with Our Website"
                  />
                  <Area
                    type="monotone"
                    dataKey="withWebsite"
                    stroke="#3B82F6"
                    strokeWidth={window.innerWidth >= 768 ? 3 : 2}
                    fill="url(#colorWithWebsite)"
                    dot={window.innerWidth >= 768 ? { fill: '#3B82F6', strokeWidth: 2 } : false}
                    activeDot={{ r: window.innerWidth >= 768 ? 8 : 6 }}
                    name="With Basic Website"
                  />
                  <Area
                    type="monotone"
                    dataKey="withoutWebsite"
                    stroke="#9CA3AF"
                    strokeWidth={window.innerWidth >= 768 ? 2 : 1}
                    fill="url(#colorWithoutWebsite)"
                    dot={window.innerWidth >= 768 ? { fill: '#9CA3AF', strokeWidth: 2 } : false}
                    activeDot={{ r: window.innerWidth >= 768 ? 8 : 6 }}
                    name="Without Website"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Legend - Hidden on mobile, shown on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:flex flex-wrap justify-center gap-8 mt-8"
            >
              {[
                { color: '#EC4899', label: 'Potential with Our Website' },
                { color: '#3B82F6', label: 'With Basic Website' },
                { color: '#9CA3AF', label: 'Without Website' }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Customer Acquisition Sources */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              {...fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Customer Acquisition Sources</h2>
              <p className="text-gray-600 dark:text-gray-300">
                How customers find and engage with businesses
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerAcquisitionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {customerAcquisitionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {customerAcquisitionData.map((item, index) => (
                  <div key={item.source} className="flex items-center gap-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <div>
                      <p className="font-semibold">{item.source}</p>
                      <p className="text-gray-600 dark:text-gray-300">{item.value}% of total acquisition</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Online Presence Trend */}
        <section className="py-20 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              {...fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Small Business Online Presence Trend</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Percentage of small businesses with professional websites
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="h-[400px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={onlinePresenceStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#E5E7EB'} />
                  <XAxis dataKey="year" stroke={isDark ? '#9CA3AF' : '#6B7280'} />
                  <YAxis stroke={isDark ? '#9CA3AF' : '#6B7280'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                      borderColor: isDark ? '#374151' : '#E5E7EB'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="percentage"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </section>
      </main>
    </ClientOnly>
  )
}

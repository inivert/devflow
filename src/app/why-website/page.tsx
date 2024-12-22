'use client'

import { motion } from "framer-motion"
import dynamic from 'next/dynamic'
import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { ClientOnly } from "@/components/ClientOnly"

// Business Growth Data (used in charts below)
const revenueGrowthData = [
  { month: 'Jan', withWebsite: 15000, withoutWebsite: 8000 },
  { month: 'Feb', withWebsite: 18000, withoutWebsite: 8200 },
  { month: 'Mar', withWebsite: 22000, withoutWebsite: 8400 },
  { month: 'Apr', withWebsite: 25000, withoutWebsite: 8600 },
  { month: 'May', withWebsite: 29000, withoutWebsite: 8800 },
  { month: 'Jun', withWebsite: 34000, withoutWebsite: 9000 },
]

// Customer Acquisition Data
const customerAcquisitionData = [
  { source: 'Website', value: 45 },
  { source: 'Word of Mouth', value: 25 },
  { source: 'Social Media', value: 20 },
  { source: 'Other', value: 10 },
]

const onlinePresenceStats = [
  { year: '2019', percentage: 45 },
  { year: '2020', percentage: 52 },
  { year: '2021', percentage: 68 },
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

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
}

const StatCard = ({ title, value, description }: StatCardProps) => (
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

// Revenue Growth Chart Component
const RevenueGrowthChart = dynamic(() => Promise.resolve(() => (
  <ResponsiveContainer width="100%" height={400}>
    <AreaChart data={revenueGrowthData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="withWebsite" stroke="#8884d8" fill="#8884d8" />
      <Area type="monotone" dataKey="withoutWebsite" stroke="#82ca9d" fill="#82ca9d" />
    </AreaChart>
  </ResponsiveContainer>
)), { ssr: false })

// Client Growth Chart Component
const ClientGrowthChart = dynamic(() => Promise.resolve(() => (
  <ResponsiveContainer width="100%" height={400}>
    <AreaChart data={clientGrowthData}>
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
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="potential"
        stroke="#EC4899"
        fill="url(#colorPotential)"
      />
      <Area
        type="monotone"
        dataKey="withWebsite"
        stroke="#3B82F6"
        fill="url(#colorWithWebsite)"
      />
      <Area
        type="monotone"
        dataKey="withoutWebsite"
        stroke="#9CA3AF"
        fill="url(#colorWithoutWebsite)"
      />
    </AreaChart>
  </ResponsiveContainer>
)), { ssr: false })

// Online Presence Chart Component
const OnlinePresenceChart = dynamic(() => Promise.resolve(() => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={onlinePresenceStats}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="percentage" stroke="#8884d8" />
    </LineChart>
  </ResponsiveContainer>
)), { ssr: false })

// Customer Acquisition Chart Component
const CustomerAcquisitionChart = dynamic(() => Promise.resolve(() => (
  <ResponsiveContainer width="100%" height={400}>
    <PieChart>
      <Pie
        data={customerAcquisitionData}
        cx="50%"
        cy="50%"
        innerRadius={80}
        outerRadius={100}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {customerAcquisitionData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658', '#ff7300'][index % 4]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
)), { ssr: false })

export default function WhyWebsite() {
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

        {/* Revenue Growth Chart */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              {...fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Revenue Growth Comparison</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Average monthly revenue comparison
              </p>
            </motion.div>
            <RevenueGrowthChart />
          </div>
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
              <ClientGrowthChart />
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
                <CustomerAcquisitionChart />
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
              <OnlinePresenceChart />
            </motion.div>
          </div>
        </section>
      </main>
    </ClientOnly>
  )
}

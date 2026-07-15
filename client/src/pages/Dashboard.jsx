import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

function WorkerDashboard() {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get('/applications')
        setApplications(res.data)
      } catch (err) {
        console.error('Error fetching applications:', err)
      }
    }
    fetchApplications()
  }, [])

  return (
    <div>
      <h2 className="text-white text-xl font-bold mb-4">Your Applications</h2>
      {applications.length === 0 ? (
        <p className="text-gray-400">No applications yet. Browse jobs to apply.</p>
      ) : (
        applications.map(app => (
          <div key={app._id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-3">
            <p className="text-white font-medium">{app.jobId?.title || 'Job'}</p>
            <p className="text-gray-400 text-sm">{app.jobId?.location}</p>
            <span className={`text-xs px-2 py-1 rounded-full ${
              app.status === 'accepted' ? 'bg-green-900 text-green-300' :
              app.status === 'rejected' ? 'bg-red-900 text-red-300' :
              'bg-gray-700 text-gray-300'
            }`}>
              {app.status}
            </span>
          </div>
        ))
      )}
      <a href="/jobs" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg">
        Browse Jobs
      </a>
    </div>
  )
}

function ClientDashboard() {
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get('/jobs')
        setJobs(res.data)
      } catch (err) {
        console.error('Error fetching jobs:', err)
      }
    }
    fetchJobs()
  }, [])

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get('/applications')
        setApplications(res.data)
      } catch (err) {
        console.error('Error fetching applications:', err)
      }
    }
    fetchApplications()
  }, [])

  const getJobStats = () => {
    const active = jobs.filter(j => j.status === 'open').length
    const inProgress = jobs.filter(j => j.status === 'in-progress').length
    const completed = jobs.filter(j => j.status === 'completed').length
    return { active, inProgress, completed, newApplications: applications.length, rating: 4.8 }
  }

  const stats = getJobStats()

  const filteredJobs = activeTab === 'all' ? jobs : 
    activeTab === 'active' ? jobs.filter(j => j.status === 'open') :
    activeTab === 'in-progress' ? jobs.filter(j => j.status === 'in-progress') :
    jobs.filter(j => j.status === 'completed')

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'bg-green-900/20 text-green-300 border border-green-900'
      case 'in-review': return 'bg-yellow-900/20 text-yellow-300 border border-yellow-900'
      case 'in-progress': return 'bg-blue-900/20 text-blue-300 border border-blue-900'
      case 'completed': return 'bg-gray-900 text-gray-300 border border-gray-800'
      default: return 'bg-gray-900 text-gray-300 border border-gray-800'
    }
  }

  const tabs = [
    { id: 'all', label: 'All jobs', count: jobs.length },
    { id: 'active', label: 'Active', count: stats.active },
    { id: 'in-progress', label: 'In progress', count: stats.inProgress },
    { id: 'completed', label: 'Completed', count: stats.completed }
  ]

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Content */}
      <div className="flex-1">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Active Jobs</p>
            <p className="text-white text-3xl font-bold">{stats.active}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">New Applications</p>
            <p className="text-white text-3xl font-bold">{stats.newApplications}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">In Progress</p>
            <p className="text-white text-3xl font-bold">{stats.inProgress}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Avg Rating</p>
            <p className="text-white text-3xl font-bold">{stats.rating}★</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-800 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'border-green-500 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No jobs in this category</p>
              <button
                onClick={() => navigate('/jobs/new')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                + Post a job
              </button>
            </div>
          ) : (
            filteredJobs.map(job => (
              <div
                key={job._id}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-green-500 transition group"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(job.status)} capitalize`}>
                        {job.status === 'in-progress' ? 'In progress' : job.status}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-lg group-hover:text-green-400 transition">{job.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{job.profession} · 📍 {job.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold text-lg">KSh {job.budget.toLocaleString()}</p>
                    <p className="text-gray-500 text-xs">{job.budgetType === 'fixed' ? 'Fixed' : 'Hourly'}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{job.description}</p>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-800">
                  <span className="text-xs text-gray-500">
                    📅 Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="text-green-500 text-xs font-medium hover:text-green-400 transition"
                  >
                    View details →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80">
        {/* Recent Applicants */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-white font-bold text-lg mb-4">Recent applicants</h3>
          {applications.length === 0 ? (
            <p className="text-gray-400 text-sm">No applications yet</p>
          ) : (
            <div className="space-y-3">
              {applications.slice(0, 3).map(app => (
                <div key={app._id} className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">{app.userId?.name || 'User'}</p>
                    <p className="text-gray-500 text-xs">{app.userId?.email}</p>
                  </div>
                  <button className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full hover:bg-green-700 transition">
                    Hire
                  </button>
                </div>
              ))}
            </div>
          )}
          {applications.length > 3 && (
            <button className="text-green-500 text-xs font-medium mt-4 hover:text-green-400 transition">
              View all {applications.length} applicants →
            </button>
          )}
        </div>

        {/* M-Pesa Payments */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h3 className="text-white font-bold text-lg mb-4">M-Pesa payments</h3>
          <div className="mb-4">
            <p className="text-green-400 font-bold text-2xl">KSh 45,500</p>
            <p className="text-gray-500 text-xs mt-1">3 payments this month</p>
          </div>
          <button className="text-green-500 text-xs font-medium hover:text-green-400 transition">
            View history →
          </button>
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/users/me')
        setUser(res.data)
      } catch (err) {
        navigate('/login')
      }
    }
    fetchUser()
  }, [navigate])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 sm:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-2">
            {getGreeting()}, {user.name} 👋
          </h1>
          <p className="text-gray-400">
            {user.role === 'worker' 
              ? 'Track your applications and find more opportunities'
              : 'You have 3 pending jobs and 12 new applications waiting for review'}
          </p>
        </div>

        {/* Dashboard Content */}
        {user.role === 'worker' ? (
          <WorkerDashboard />
        ) : (
          <ClientDashboard />
        )}
      </div>
    </div>
  )
}

export default Dashboard
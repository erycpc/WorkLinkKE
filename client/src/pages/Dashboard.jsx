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

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-bold">Your Posted Jobs</h2>
        <a href="/jobs/new" className="bg-green-600 text-white px-4 py-2 rounded-lg">
          + Post a job
        </a>
      </div>
      {jobs.length === 0 ? (
        <p className="text-gray-400">No jobs posted yet.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-3">
            <p className="text-white font-medium">{job.title}</p>
            <p className="text-gray-400 text-sm">{job.location} · KSh {job.budget}</p>
            <span className="text-xs px-2 py-1 rounded-full bg-green-900 text-green-300">
              {job.status}
            </span>
          </div>
        ))
      )}
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
        navigate('/login')  // not logged in → redirect
      }
    }
    fetchUser()
  }, [])

  if (!user) return <p className="text-white">Loading...</p>

  

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <h1 className="text-white text-2xl font-bold mb-2">
        Welcome, {user.name} 👋
      </h1>
      <p className="text-gray-400 mb-8">Role: {user.role}</p>

      {user.role === 'worker' ? (
        <WorkerDashboard />
      ) : (
        <ClientDashboard />
      )}
    </div>
)
}

export default Dashboard
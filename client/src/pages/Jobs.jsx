import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

function Jobs() {
  const [jobs, setJobs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await API.get('/jobs')
        setJobs(response.data)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    }

    fetchJobs()
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 p-8">
        <h1 className="text-white text-2xl font-bold mb-6">Browse Jobs</h1>
    {/* ## map through jobs and render cards */}
    {jobs.map((job) => (
      <div
        key={job._id}
        onClick={() => navigate(`/jobs/${job._id}`)}
        className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-4 cursor-pointer hover:border-green-500 transition"
      >
        <h2 className="text-white font-bold text-lg mb-1">{job.title}</h2>
        <p className="text-gray-400 text-sm mb-2">{job.profession} · {job.location}</p>
        <p className="text-green-400 font-medium">KSh {job.budget}</p>
      </div>
    ))}
    </div>
    )
}

export default Jobs
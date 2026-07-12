import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API from '../services/api'

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchJobs = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await API.get('/jobs')
      setJobs(response.data)
    } catch (fetchError) {
      console.error('Error fetching jobs:', fetchError)
      setError('Failed to load jobs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <h1 className="text-white text-2xl font-bold mb-6">Browse Jobs</h1>

      {loading ? (
        <p className="text-gray-300">Loading jobs...</p>
      ) : error ? (
        <div className="bg-red-900 border border-red-700 rounded-xl p-6 mb-4">
          <p className="text-red-100">{error}</p>
          <button
            type="button"
            onClick={fetchJobs}
            className="mt-4 inline-flex items-center px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-400 transition"
          >
            Retry
          </button>
        </div>
      ) : jobs.length === 0 ? (
        <p className="text-gray-400">No jobs are available right now. Check back later.</p>
      ) : (
        jobs.map((job) => (
          <Link
            key={job._id}
            to={`/jobs/${job._id}`}
            className="block bg-gray-900 border border-gray-800 rounded-xl p-6 mb-4 hover:border-green-500 transition"
          >
            <h2 className="text-white font-bold text-lg mb-1">{job.title}</h2>
            <p className="text-gray-400 text-sm mb-2">{job.profession} · {job.location}</p>
            <p className="text-green-400 font-medium">KSh {job.budget}</p>
          </Link>
        ))
      )}
    </div>
  )
}

export default Jobs
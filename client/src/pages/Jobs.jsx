import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
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

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.profession.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getProfessionColor = (profession) => {
    const colors = {
      'Electrician': 'bg-yellow-900/20 text-yellow-300 border border-yellow-900',
      'Developer': 'bg-blue-900/20 text-blue-300 border border-blue-900',
      'Plumber': 'bg-cyan-900/20 text-cyan-300 border border-cyan-900',
      'Designer': 'bg-purple-900/20 text-purple-300 border border-purple-900',
    }
    return colors[profession] || 'bg-gray-900/20 text-gray-300 border border-gray-900'
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 border-b border-gray-800 px-4 sm:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-2">Browse Jobs</h1>
          <p className="text-gray-400 mb-6">Find work that matches your skills and interests</p>
          
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs by title or profession..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
            />
            <span className="absolute right-4 top-3 text-gray-500">🔍</span>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="px-4 sm:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No jobs found. Try adjusting your search.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-6 cursor-pointer hover:border-green-500 hover:bg-gray-850 transition-all duration-200 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h2 className="text-white font-bold text-lg group-hover:text-green-400 transition mb-2">{job.title}</h2>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${getProfessionColor(job.profession)}`}>
                          {job.profession}
                        </span>
                        <span className="text-gray-500 text-sm">📍 {job.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-green-400 font-bold text-xl">KSh {job.budget.toLocaleString()}</p>
                        <p className="text-gray-500 text-xs">{job.budgetType === 'fixed' ? 'Fixed' : 'Hourly'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{job.description}</p>
                  
                  <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-gray-800">
                    <span className="text-xs text-gray-500">
                      📅 Deadline: {new Date(job.deadline).toLocaleDateString()}
                    </span>
                    <div className="text-green-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition">
                      View details →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Jobs
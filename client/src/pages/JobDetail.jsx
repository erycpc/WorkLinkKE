import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import API from '../services/api'

function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let isActive = true

    const fetchJobDetail = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await API.get(`/jobs/${id}`)
        if (isActive) {
          setJob(response.data)
        }
      } catch (fetchError) {
        console.error('Error fetching job detail:', fetchError)
        if (isActive) {
          setError('Failed to load job details. Please try again.')
        }
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    fetchJobDetail()

    return () => {
      isActive = false
    }
  }, [id])

  const handleApply = async () => {
    if (submitting) return

    setSubmitting(true)

    try {
      await API.post('/applications', {
        jobId: id,
        message: 'I am interested in this job',
        proposedRate: job.budget
      })
      alert('Application submitted!')
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to apply')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-500 mb-4 mx-auto"></div>
          <p>Loading job details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 px-4 sm:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/jobs')}
            className="mb-6 text-gray-400 hover:text-white transition"
          >
            ← Back to jobs
          </button>
          <div className="bg-red-900/20 border border-red-900 rounded-lg p-6">
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-950 px-4 sm:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/jobs')}
            className="mb-6 text-gray-400 hover:text-white transition"
          >
            ← Back to jobs
          </button>
          <p className="text-gray-400">Job not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 border-b border-gray-800 px-4 sm:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/jobs')}
            className="mb-6 text-gray-400 hover:text-white transition inline-flex items-center gap-2"
          >
            ← Back to jobs
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Job Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-6">
              <div className="flex-1">
                <h1 className="text-white text-3xl sm:text-4xl font-bold mb-4">{job.title}</h1>
                <div className="flex flex-wrap gap-3 items-center mb-4">
                  <span className="bg-green-900/20 text-green-300 border border-green-900 text-sm font-medium px-4 py-1 rounded-full">
                    {job.profession}
                  </span>
                  <span className="text-gray-400 text-sm">📍 {job.location}</span>
                </div>
              </div>
              
              {/* Budget Card */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-full sm:w-auto">
                <p className="text-gray-400 text-sm mb-2">Budget</p>
                <p className="text-green-400 font-bold text-3xl">KSh {job.budget.toLocaleString()}</p>
                <p className="text-gray-500 text-xs mt-2">
                  {job.budgetType === 'fixed' ? 'Fixed price' : 'Hourly rate'}
                </p>
              </div>
            </div>

            {/* Key Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <p className="text-gray-500 text-xs font-medium mb-1">Budget Type</p>
                <p className="text-white text-sm font-semibold">
                  {job.budgetType === 'fixed' ? 'Fixed' : 'Hourly'}
                </p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <p className="text-gray-500 text-xs font-medium mb-1">Deadline</p>
                <p className="text-white text-sm font-semibold">
                  {new Date(job.deadline).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <p className="text-gray-500 text-xs font-medium mb-1">Status</p>
                <p className="text-green-400 text-sm font-semibold">Open</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <p className="text-gray-500 text-xs font-medium mb-1">Posted</p>
                <p className="text-white text-sm font-semibold">Recently</p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 md:p-8 mb-8">
            <h2 className="text-white text-lg font-bold mb-4">Job Description</h2>
            <p className="text-gray-300 leading-relaxed text-base">{job.description}</p>
          </div>

          {/* About Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 md:p-8 mb-8">
            <h2 className="text-white text-lg font-bold mb-4">About This Role</h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <div>
                  <p className="text-white font-medium">Professional Services</p>
                  <p className="text-gray-400 text-sm">Work directly with clients in {job.location}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <div>
                  <p className="text-white font-medium">Flexible Timeline</p>
                  <p className="text-gray-400 text-sm">Complete by {new Date(job.deadline).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <div>
                  <p className="text-white font-medium">Secure Payment</p>
                  <p className="text-gray-400 text-sm">Get paid via M-Pesa upon completion</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleApply}
              disabled={submitting}
              className="flex-1 bg-green-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-center"
            >
              {submitting ? 'Applying...' : 'Apply for this job'}
            </button>
            <button
              onClick={() => navigate('/jobs')}
              className="flex-1 bg-gray-800 text-white font-bold py-4 px-6 rounded-lg border border-gray-700 hover:border-gray-600 transition text-center"
            >
              View more jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetail
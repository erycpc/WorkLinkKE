import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import API from '../services/api'

function JobDetail() {
  const { id } = useParams()
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

  if (loading) {
    return <p className="text-gray-300">Loading job details...</p>
  }

  if (error) {
    return (
      <div className="bg-red-900 border border-red-700 rounded-xl p-6 mb-4">
        <p className="text-red-100">{error}</p>
      </div>
    )
  }

  if (!job) {
    return <p className="text-gray-400">Job not found.</p>
  }

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


  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <h1 className="text-white text-2xl font-bold mb-6">{job.title}</h1>
      <p className="text-gray-400 text-sm mb-2">{job.profession} · {job.location}</p>
      <p className="text-green-400 font-medium mb-4">KSh {job.budget}</p>
      <p className="text-gray-300">{job.description}</p>
      <button
        onClick={handleApply}
        className="mt-6 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition"
      >
        Apply for this job
      </button>
    </div>
  )
}

export default JobDetail
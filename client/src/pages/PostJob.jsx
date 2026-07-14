import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

function PostJob() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [budget, setBudget] = useState('')
    const [profession, setProfession] = useState('')
    const [experienceLevel, setExperienceLevel] = useState('')
    const [skillsRequired, setSkillsRequired] = useState('')
    const [budgetType, setBudgetType] = useState('fixed')
    const [deadline, setDeadline] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await API.post('/jobs', {
                title, description, location, budget,
                profession, experienceLevel, skillsRequired,
                budgetType, deadline
            })
            alert('Job posted successfully!')
            navigate('/dashboard')
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to post job')
        }
    }

    const inputClass = "w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-green-500 mb-4"

    return (
        <div className="min-h-screen bg-gray-950 p-8">
            <div className="max-w-xl mx-auto bg-gray-900 rounded-xl p-8 border border-gray-800">
                <h1 className="text-2xl font-bold text-white mb-6">Post a Job</h1>

                <form onSubmit={handleSubmit}>
                    <label className="text-gray-400 text-sm block mb-1">Job Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={inputClass} placeholder="e.g. Fix electrical wiring" required />

                    <label className="text-gray-400 text-sm block mb-1">Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} className={inputClass} placeholder="Describe the work in detail..." rows={4} required />

                    <label className="text-gray-400 text-sm block mb-1">Profession</label>
                    <input type="text" value={profession} onChange={e => setProfession(e.target.value)} className={inputClass} placeholder="e.g. Electrician" required />

                    <label className="text-gray-400 text-sm block mb-1">Skills Required</label>
                    <input type="text" value={skillsRequired} onChange={e => setSkillsRequired(e.target.value)} className={inputClass} placeholder="e.g. wiring, solar installation" />

                    <label className="text-gray-400 text-sm block mb-1">Experience Level</label>
                    <select value={experienceLevel} onChange={e => setExperienceLevel(e.target.value)} className={inputClass}>
                        <option value="">Select level</option>
                        <option value="junior">Junior</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>

                    <label className="text-gray-400 text-sm block mb-1">Location</label>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} className={inputClass} placeholder="e.g. Westlands, Nairobi" required />

                    <label className="text-gray-400 text-sm block mb-1">Budget (KSh)</label>
                    <input type="number" value={budget} onChange={e => setBudget(e.target.value)} className={inputClass} placeholder="e.g. 5000" required />

                    <label className="text-gray-400 text-sm block mb-1">Budget Type</label>
                    <select value={budgetType} onChange={e => setBudgetType(e.target.value)} className={inputClass}>
                        <option value="fixed">Fixed price</option>
                        <option value="hourly">Hourly rate</option>
                    </select>

                    <label className="text-gray-400 text-sm block mb-1">Deadline</label>
                    <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} className={inputClass} required />

                    <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">
                        Post Job
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PostJob
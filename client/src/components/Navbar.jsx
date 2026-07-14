import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex justify-between items-center">
      <a href="/" className="text-green-400 font-bold text-xl">WorkLinkKE</a>
      <div className="flex gap-6 items-center">
        <a href="/jobs" className="text-gray-400 hover:text-white transition">Browse Jobs</a>
        {token ? (
          <>
            <a href="/dashboard" className="text-gray-400 hover:text-white transition">Dashboard</a>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition">Logout</button>
          </>
        ) : (
          <>
            <a href="/login" className="text-gray-400 hover:text-white transition">Login</a>
            <a href="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">Sign up</a>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
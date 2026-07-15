import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="bg-brand-surface border-b border-brand-border px-20 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <span
        onClick={() => navigate('/')}
        className="text-brand-greenL font-bold text-xl cursor-pointer"
      >
        WorkLinkKE
      </span>

      {/* Nav links */}
      <div className="flex gap-8 items-center">
        <span
          onClick={() => navigate('/jobs')}
          className="bg-brand-green text-white text-sm font-bold px-5 py-2 rounded-full hover:opacity-90 transition cursor-pointer"
        >
          Find work
        </span>
        <span
          onClick={() => navigate('/jobs')}
          className="bg-brand-green text-white text-sm font-bold px-5 py-2 rounded-full hover:opacity-90 transition"
        >
          Hire talent
        </span>
        <span className="bg-brand-green text-white text-sm font-bold px-5 py-2 rounded-full hover:opacity-90 transition cursor-pointer">
          How it works
        </span>
      </div>

      {/* Auth buttons */}
      <div className="flex gap-4 items-center">
        {token ? (
          <>
            <span
              onClick={() => navigate('/dashboard')}
              className="bg-brand-green text-white text-sm font-bold px-5 py-2 rounded-full hover:opacity-90 transition cursor-pointer"
            >
              Dashboard
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-400 hover:text-red-300 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <span
              onClick={() => navigate('/login')}
              className="text-gray-400 hover:text-white transition cursor-pointer text-sm"
            >
              Log in
            </span>
            <button
              onClick={() => navigate('/register')}
              className="bg-brand-green text-white text-sm font-bold px-5 py-2 rounded-full hover:opacity-90 transition"
            >
              Get started
            </button>
          </>
        )}
      </div>

    </nav>
  )
}

export default Navbar
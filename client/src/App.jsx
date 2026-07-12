import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<div>Register</div>} />
        <Route path="/jobs" element={<div>Jobs</div>} />
        <Route path="/jobs/:id" element={<div>Job Detail</div>} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
      </Routes>
    </Router>
  )
}
export default App
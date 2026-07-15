import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center text-center px-8 py-32">
        <p className="text-green-400 text-sm font-medium mb-4">Kenya's skills marketplace</p>
        <h1 className="text-white text-5xl font-bold mb-6 leading-tight">
          Find skilled workers.<br />Get hired today.
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl">
          WorkLinkKE connects electricians, developers, plumbers, designers and more with clients across Kenya. Pay via M-Pesa.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => navigate('/jobs')}
            className="bg-green-600 text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-green-700 transition"
          >
            Find talent
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-gray-800 text-white font-medium px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-gray-700 hover:border-green-500 transition"
          >
            Find work
          </button>
        </div>
      </div>
      {/* Stats bar */}
    <div className="bg-gray-900 border-y border-gray-800 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-gray-800">
        {[
      ['10,000+', 'Skilled workers'],
      ['5,000+', 'Jobs completed'],
      ['4.8★', 'Average rating'],
      ['M-Pesa', 'Secure payments'],
    ].map(([num, label]) => (
      <div key={label} className="text-center px-4 sm:px-8 py-2 sm:py-0">
        <p className="text-white text-2xl sm:text-3xl font-bold">{num}</p>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">{label}</p>
      </div>
        ))}
    </div>
    </div>
    {/* Value props */}
<div className="max-w-5xl mx-auto px-4 sm:px-8 py-20">
  <h2 className="text-white text-3xl font-bold text-center mb-12">Built for both sides</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* Worker card */}
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">
      <span className="text-green-400 text-sm font-medium bg-green-900/20 px-3 py-1 rounded-full">For workers</span>
      <h3 className="text-white text-2xl font-bold mt-4 mb-4">Get hired for your skills</h3>
      {[
        'Create your profile in 5 minutes',
        'AI helps you write a great bio',
        'Get paid instantly via M-Pesa',
        'Build your reputation with reviews',
        'Find clients near you in Nairobi',
      ].map(point => (
        <p key={point} className="text-gray-400 text-sm mb-2">✓  {point}</p>
      ))}
      <button onClick={() => navigate('/register')} className="mt-6 bg-green-600 text-white font-bold px-6 py-3 rounded-full hover:bg-green-700 transition">
        Join as worker
      </button>
    </div>

    {/* Client card */}
    <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-6 md:p-8">
      <span className="text-green-400 text-sm font-medium bg-green-900/20 px-3 py-1 rounded-full">For clients</span>
      <h3 className="text-white text-2xl font-bold mt-4 mb-4">Find trusted professionals</h3>
      {[
        'Post a job in under 2 minutes',
        'AI matches you with top workers',
        'Review profiles and ratings first',
        'Pay securely via M-Pesa',
        'Rate and review after the job',
      ].map(point => (
        <p key={point} className="text-gray-400 text-sm mb-2">✓  {point}</p>
      ))}
      <button onClick={() => navigate('/register')} className="mt-6 bg-green-600 text-white font-bold px-6 py-3 rounded-full hover:bg-green-700 transition">
        Post a job
      </button>
    </div>

  </div>
</div>
{/* How it works */}
<div className="bg-gray-900 border-y border-gray-800 py-20">
  <div className="max-w-5xl mx-auto px-4 sm:px-8">
    <h2 className="text-white text-3xl font-bold text-center mb-12">How it works</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
      {[
        ['01', 'Post a job', 'Describe what you need. Takes less than 2 minutes.'],
        ['02', 'Get matched', 'AI finds the best workers near you.'],
        ['03', 'Hire & work', 'Agree terms and get the job done.'],
        ['04', 'Pay via M-Pesa', 'Secure, instant payment.'],
      ].map(([num, title, desc]) => (
        <div key={num} className="text-center">
          <div className="w-12 h-12 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-400 font-bold">{num}</span>
          </div>
          <h3 className="text-white font-bold mb-2">{title}</h3>
          <p className="text-gray-400 text-sm">{desc}</p>
        </div>
      ))}
    </div>
  </div>
</div>

{/* Footer CTA */}
<div className="py-20 text-center px-4 sm:px-8">
  <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4">Ready to get started?</h2>
  <p className="text-gray-400 mb-8 text-sm sm:text-base">Join thousands of Kenyan professionals already on WorkLinkKE</p>
  <button
    onClick={() => navigate('/register')}
    className="bg-green-600 text-white font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-full hover:bg-green-700 transition"
  >
    Join WorkLinkKE
  </button>
</div>
    </div>
  )
}

export default Home
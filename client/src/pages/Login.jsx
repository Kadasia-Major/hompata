import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { mockLogin, mockUsers } from '../utils/mockAuth'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await mockLogin(formData.email, formData.password)

      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))

      // 🔥 Role-based redirect for four user types
      switch (response.user.role) {
        case 'system_admin':
          navigate('/admin');
          break;
        case 'system_moderator':
          navigate('/dashboard');
          break;
        case 'landlord':
          navigate('/dashboard');
          break;
        case 'agent':
          navigate('/dashboard');
          break;
        default:
          navigate('/dashboard');
      }

    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickLogin = async (role) => {
    setLoading(true)
    setError('')

    try {
      const user = mockUsers[role]
      const response = await mockLogin(user.email, user.password)

      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))

      // 🔥 Role-based redirect for four user types
      switch (response.user.role) {
        case 'system_admin':
          navigate('/admin');
          break;
        case 'system_moderator':
          navigate('/dashboard');
          break;
        case 'landlord':
          navigate('/dashboard');
          break;
        case 'agent':
          navigate('/dashboard');
          break;
        default:
          navigate('/dashboard');
      }

    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="flex justify-center items-center space-x-2">
            <i className="fas fa-home text-3xl text-green-600"></i>
            <span className="text-2xl font-bold text-green-600">Hompata</span>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Sign in to continue
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-2 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        {/* Quick Login for Testing */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600 mb-4">
            Quick Login (Testing)
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickLogin('system_admin')}
              disabled={loading}
              className="px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition disabled:opacity-50"
            >
              Admin
            </button>
            <button
              onClick={() => handleQuickLogin('system_moderator')}
              disabled={loading}
              className="px-3 py-2 bg-purple-500 text-white text-sm rounded-md hover:bg-purple-600 transition disabled:opacity-50"
            >
              Moderator
            </button>
            <button
              onClick={() => handleQuickLogin('landlord')}
              disabled={loading}
              className="px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition disabled:opacity-50"
            >
              Landlord
            </button>
            <button
              onClick={() => handleQuickLogin('agent')}
              disabled={loading}
              className="px-3 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition disabled:opacity-50"
            >
              Agent
            </button>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 font-medium mb-2">Demo Credentials:</p>
          <div className="space-y-1 text-xs text-gray-500">
            <div>Admin: admin@hompata.com / admin123</div>
            <div>Moderator: moderator@hompata.com / moderator123</div>
            <div>Landlord: landlord@hompata.com / landlord123</div>
            <div>Agent: agent@hompata.com / agent123</div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login
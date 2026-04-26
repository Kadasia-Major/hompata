import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user')
      if (userData) setUser(JSON.parse(userData))
    } catch {
      setUser(null)
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    setIsUserMenuOpen(false)
    navigate('/')
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Buy", path: "/buy" },
    { name: "Rent", path: "/rent" },
    { name: "Contact", path: "/contact" },
  ]

  // 🔥 Role helpers (clean logic)
  const isPrivileged = ['landlord', 'seller', 'admin'].includes(user?.role)
  const isRegularUser = user?.role === 'user'

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <i className="fas fa-home text-2xl text-green-600"></i>
            <span className="text-xl font-bold text-green-600">Hompata</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-6">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-green-600 text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}

            {/* CTA */}
            {user && isPrivileged && (
              <Link
                to="/list-property"
                className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition"
              >
                + Post Property
              </Link>
            )}

            {user && isRegularUser && (
              <Link
                to="/saved-properties"
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition"
              >
                ❤️ Saved
              </Link>
            )}

            {/* USER MENU */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(prev => !prev)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm">{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border">

                    <div className="p-3 border-b">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <p className="text-xs text-green-600 capitalize">{user.role}</p>
                    </div>

                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                      📊 Dashboard
                    </Link>

                    {user.role === "landlord" && (
                      <Link to="/my-listings" className="block px-4 py-2 hover:bg-gray-100">
                        🏠 My Listings
                      </Link>
                    )}

                    {user.role === "admin" && (
                      <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100">
                        ⚙️ Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm"
              >
                Sign In
              </Link>
            )}

          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-xl"
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-3">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {user && isPrivileged && (
              <Link
                to="/list-property"
                className="block px-3 py-2 text-green-600 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                + Post Property
              </Link>
            )}

            {user && isRegularUser && (
              <Link
                to="/saved-properties"
                className="block px-3 py-2 text-blue-600 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                ❤️ Saved Properties
              </Link>
            )}

            {user ? (
              <>
                <div className="px-3 py-2 border-t">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-green-600"
              >
                Sign In
              </Link>
            )}
          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import PropertyDetails from './pages/PropertyDetails'
import RoleBasedDashboard from './components/RoleBasedDashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Contact from './pages/Contact'
import Buy from './pages/Buy'
import Rent from './pages/Rent'
import ListProperty from './pages/ListProperty'
import SavedProperties from './pages/SavedProperties'
import MyListings from './pages/MyListings'
import Admin from './admin/Admin'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/list-property" element={<ListProperty />} />
            <Route path="/saved-properties" element={<SavedProperties />} />
            <Route path="/my-listings" element={<MyListings />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <RoleBasedDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="system_admin">
                <Admin />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

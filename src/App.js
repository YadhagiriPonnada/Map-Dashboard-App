import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

// Auth Context Provider
import {AuthProvider} from './contexts/AuthContext'

// Components
import Login from './components/Auth/Login'
import Dashboard from './components/Dashboard/Dashboard'
import MapView from './components/Map/MapView'
import ProtectedRoute from './components/Auth/ProtectedRoute'

// Custom Navigation component
import Navigation from './components/Navigation'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div style={{minHeight: '100vh'}}>
          <Navigation />
          <main style={{padding: '16px'}}>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />

              {/* Redirect root to dashboard if logged in, otherwise to login */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/map/:locationId" element={<MapView />} />
              </Route>

              {/* Catch all - redirect to dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

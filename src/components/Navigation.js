import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

const Navigation = () => {
  const {isAuthenticated, logout} = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    alert('You have been successfully logged out.')
    navigate('/login')
  }

  const navStyle = {
    backgroundColor: '#3182CE',
    padding: '12px 16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  }

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
  }

  const logoStyle = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px',
    textDecoration: 'none',
  }

  const navButtonStyle = {
    color: 'white',
    backgroundColor: 'transparent',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    textDecoration: 'none',
    marginLeft: '16px',
    borderRadius: '4px',
  }

  const logoutButtonStyle = {
    ...navButtonStyle,
    border: '1px solid white',
  }

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          Map Dashboard
        </Link>

        <div>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" style={navButtonStyle}>
                Dashboard
              </Link>

              <button onClick={handleLogout} style={logoutButtonStyle}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={logoutButtonStyle}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation

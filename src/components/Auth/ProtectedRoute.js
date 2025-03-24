import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'

// This component is used to protect routes that require authentication
const ProtectedRoute = () => {
  const {isAuthenticated} = useAuth()

  // If the user is authenticated, render the child routes
  if (isAuthenticated) {
    return <Outlet />
  }

  // If the user is not authenticated, redirect to the login page
  return <Navigate to="/login" replace />
}

// This component is used to render an error message if the user is not logged in
// Used for API responses when no redirect is possible or when handling direct API calls
export const AuthenticationRequired = ({message = 'User not logged in'}) => {
  return (
    <div style={{padding: '32px', textAlign: 'center'}}>
      <p style={{fontSize: '20px', fontWeight: 'bold', color: '#E53E3E'}}>
        {message}
      </p>
      <p style={{marginTop: '16px'}}>Please login to access this feature.</p>
    </div>
  )
}

// This component is used to show a loading spinner while checking authentication
export const AuthenticationLoading = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3182CE',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 2s linear infinite',
        }}
      ></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default ProtectedRoute

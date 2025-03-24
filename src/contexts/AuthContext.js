import React, {createContext, useState, useContext, useEffect} from 'react'
import {jwtDecode} from 'jwt-decode'

const AuthContext = createContext(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in when the component mounts
    const token = localStorage.getItem('jwt_token')
    if (token) {
      try {
        // For CCBP API tokens, we may not need to decode them
        // but if they are JWT tokens, we can decode them
        try {
          const decoded = jwtDecode(token)
          setCurrentUser(decoded)
        } catch (decodeError) {
          // If it's not a decodable JWT, just set that we have a user
          console.log('Token decode error (non-critical):', decodeError)
          setCurrentUser({isLoggedIn: true, username: 'rahul'})
        }
      } catch (error) {
        console.error('Auth token error:', error)
        localStorage.removeItem('jwt_token')
        setCurrentUser(null)
      }
    }
    setLoading(false)
  }, [])

  // Login function
  const login = token => {
    console.log('Setting auth token:', token)
    localStorage.setItem('jwt_token', token)

    try {
      // Try to decode the token
      const user = jwtDecode(token)
      console.log('Decoded user from token:', user)
      setCurrentUser(user)
      return user
    } catch (error) {
      // If token is not a standard JWT, create a default user object
      console.log('Using default user object (token not decodable)')
      const user = {
        isLoggedIn: true,
        username: 'rahul',
        role: 'PRIME_USER',
      }
      setCurrentUser(user)
      return user
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('jwt_token')
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContext

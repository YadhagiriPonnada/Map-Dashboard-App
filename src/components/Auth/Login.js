import React, {useState} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import {loginUser} from '../../api/auth'
import {useAuth} from '../../contexts/AuthContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()
  const {login, isAuthenticated} = useAuth()

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!username || !password) {
      setErrorMessage('Please enter both username and password')
      return
    }

    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      console.log('Attempting login with:', {username, password})

      // Call the login API
      const data = await loginUser({username, password})

      console.log('Login response:', data)

      // Check if we have a token
      if (data && data.jwt_token) {
        setSuccessMessage('Login successful! Redirecting...')

        // Store the token via auth context
        login(data.jwt_token)

        // Navigate to dashboard after a brief delay to show success message
        setTimeout(() => {
          navigate('/dashboard')
        }, 500)
      } else {
        setErrorMessage('Invalid response from server. Missing token.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrorMessage(error.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  // For testing - fill with test credentials
  const useTestCredentials = () => {
    setUsername('rahul')
    setPassword('rahul@2021')
  }

  return (
    <div
      className="login-container"
      style={{maxWidth: '400px', margin: '40px auto', padding: '20px'}}
    >
      <h1 style={{textAlign: 'center', marginBottom: '20px'}}>
        Login to Your Account
      </h1>

      <div
        style={{
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        {errorMessage && (
          <div
            style={{
              backgroundColor: '#FED7D7',
              color: '#822727',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '15px',
            }}
          >
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div
            style={{
              backgroundColor: '#C6F6D5',
              color: '#22543D',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '15px',
            }}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '15px'}}>
            <label
              htmlFor="username"
              style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
              }}
            >
              Username <span style={{color: 'red'}}>*</span>
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #e2e8f0',
              }}
            />
          </div>

          <div style={{marginBottom: '20px'}}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
              }}
            >
              Password <span style={{color: 'red'}}>*</span>
            </label>
            <div style={{position: 'relative'}}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0',
                }}
              />
              <button
                type="button"
                onClick={togglePassword}
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#3182CE',
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#3182CE',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      <div style={{marginTop: '20px', textAlign: 'center'}}>
        <p>Login Credentials:</p>
        <p
          style={{
            backgroundColor: '#f8f9fa',
            padding: '8px',
            borderRadius: '4px',
            display: 'inline-block',
          }}
        >
          Username: <strong>rahul</strong> | Password:{' '}
          <strong>rahul@2021</strong>
        </p>
        <button
          onClick={useTestCredentials}
          style={{
            marginTop: '10px',
            padding: '5px 10px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Fill test credentials
        </button>
      </div>
    </div>
  )
}

export default Login

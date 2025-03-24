import React, {useState, useEffect} from 'react'
import {useAuth} from '../../contexts/AuthContext'
import {getLocationCards} from '../../api/dashboard'
import LocationCard from './LocationCard'
import {AuthenticationRequired} from '../Auth/ProtectedRoute'

const Dashboard = () => {
  const [locations, setLocations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const {isAuthenticated} = useAuth()

  useEffect(() => {
    const fetchLocations = async () => {
      if (!isAuthenticated) {
        setError('User not logged in')
        setIsLoading(false)
        return
      }

      try {
        const data = await getLocationCards()
        setLocations(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching locations:', error)
        setError(error.message || 'Failed to load locations')
        setIsLoading(false)
        alert(error.message || 'Failed to load locations')
      }
    }

    fetchLocations()
  }, [isAuthenticated])

  // Filter locations based on search term
  const filteredLocations = locations.filter(
    location =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // If user is not authenticated
  if (!isAuthenticated) {
    return <AuthenticationRequired />
  }

  return (
    <div style={{padding: '20px'}}>
      <div style={{marginBottom: '24px'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          <h1 style={{fontSize: '24px', fontWeight: 'bold'}}>
            Location Dashboard
          </h1>

          <div style={{maxWidth: '400px', width: '100%'}}>
            <div style={{position: 'relative'}}>
              <input
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0',
                  fontSize: '16px',
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
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
        ) : error ? (
          <div style={{textAlign: 'center', padding: '20px'}}>
            <p style={{color: '#E53E3E'}}>{error}</p>
          </div>
        ) : filteredLocations.length === 0 ? (
          <div style={{textAlign: 'center', padding: '40px'}}>
            <p>No locations found.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
              marginTop: '16px',
            }}
          >
            {filteredLocations.map(location => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

import React, {useState, useEffect, useRef} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {useAuth} from '../../contexts/AuthContext'
import {AuthenticationRequired} from '../Auth/ProtectedRoute'

// Fix for Leaflet marker icons in React
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

// Custom component to set the map view
const SetMapView = ({center, zoom}) => {
  const map = useMap()

  useEffect(() => {
    if (center) {
      map.setView(center, zoom)
    }
  }, [center, zoom, map])

  return null
}

// Map controller component to expose the map reference to parent component
const MapController = ({setMapRef}) => {
  const map = useMap()

  useEffect(() => {
    setMapRef(map)
  }, [map, setMapRef])

  return null
}

const MapView = () => {
  const {locationId} = useParams()
  const navigate = useNavigate()
  const {isAuthenticated} = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]) // Center of India
  const [zoomLevel, setZoomLevel] = useState(5) // Initial zoom level for India
  const [mapInstance, setMapInstance] = useState(null)

  // Set location based on locationId
  useEffect(() => {
    if (locationId) {
      // Define some preset locations in India
      const locations = {
        '1': {lat: 28.6139, lng: 77.209, name: 'Delhi'},
        '2': {lat: 19.076, lng: 72.8777, name: 'Mumbai'},
        '3': {lat: 12.9716, lng: 77.5946, name: 'Bangalore'},
        '4': {lat: 13.0827, lng: 80.2707, name: 'Chennai'},
        '5': {lat: 22.5726, lng: 88.3639, name: 'Kolkata'},
        '6': {lat: 17.385, lng: 78.4867, name: 'Hyderabad'},
      }

      const location = locations[locationId]
      if (location) {
        setMapCenter([location.lat, location.lng])
        setZoomLevel(10) // Zoom in closer to the selected location
      }
    }
  }, [locationId])

  // Handle zoom controls
  const handleZoomIn = () => {
    if (mapInstance) {
      const newZoom = mapInstance.getZoom() + 1
      mapInstance.setZoom(newZoom)
      setZoomLevel(newZoom)
    }
  }

  const handleZoomOut = () => {
    if (mapInstance) {
      const newZoom = mapInstance.getZoom() - 1
      mapInstance.setZoom(newZoom)
      setZoomLevel(newZoom)
    }
  }

  // Handle back button
  const handleBack = () => {
    navigate('/dashboard')
  }

  // If user is not authenticated
  if (!isAuthenticated) {
    return <AuthenticationRequired />
  }

  return (
    <div>
      <div style={{marginBottom: '20px'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <button
            onClick={handleBack}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3182CE',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>←</span> Back to Dashboard
          </button>

          <h2 style={{fontSize: '18px', fontWeight: 'bold'}}>
            {locationId ? `Location #${locationId}` : 'Map of India'}
          </h2>
        </div>

        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '70vh',
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
        ) : (
          <div
            style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              height: '500px', // Fixed height for the map
              width: '100%',
            }}
          >
            <MapContainer
              center={mapCenter}
              zoom={zoomLevel}
              style={{height: '100%', width: '100%'}}
              zoomControl={false} // Disable default zoom control
              attributionControl={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                maxZoom={18}
              />

              {/* Dynamic map center and zoom setting */}
              <SetMapView center={mapCenter} zoom={zoomLevel} />

              {/* Component to get map reference */}
              <MapController setMapRef={setMapInstance} />

              {/* Marker for selected location if we have one */}
              {locationId && (
                <Marker position={mapCenter}>
                  <Popup>Location #{locationId}</Popup>
                </Marker>
              )}
            </MapContainer>

            {/* Custom zoom controls */}
            <div
              style={{
                position: 'absolute',
                right: '20px',
                top: '20px',
                zIndex: '1000',
                backgroundColor: 'white',
                borderRadius: '4px',
                padding: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <button
                onClick={handleZoomIn}
                style={{
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={handleZoomOut}
                style={{
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
                title="Zoom Out"
              >
                -
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            padding: '16px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            marginTop: '16px',
          }}
        >
          <h3
            style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '12px'}}
          >
            Map Instructions
          </h3>
          <ul style={{paddingLeft: '20px'}}>
            <li style={{marginBottom: '8px'}}>Use the + button to zoom in</li>
            <li style={{marginBottom: '8px'}}>Use the - button to zoom out</li>
            <li style={{marginBottom: '8px'}}>
              Click and drag to move around the map
            </li>
            <li style={{marginBottom: '8px'}}>
              Click on markers to see location details
            </li>
          </ul>

          <div
            style={{
              marginTop: '16px',
              padding: '8px',
              backgroundColor: '#EBF8FF',
              borderRadius: '4px',
            }}
          >
            <p>
              <strong>Current Coordinates:</strong> Latitude{' '}
              {mapCenter[0].toFixed(4)}, Longitude {mapCenter[1].toFixed(4)}
            </p>
            <p>
              <strong>Current Zoom Level:</strong> {zoomLevel}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapView

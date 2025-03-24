import React from 'react'
import {useNavigate} from 'react-router-dom'

const LocationCard = ({location}) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/map/${location.id}`)
  }

  const cardStyle = {
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e2e8f0',
    borderRadius: '8px',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
  }

  const badgeStyle = {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: '#EBF8FF',
    color: '#2B6CB0',
    marginRight: '8px',
  }

  const statusBadgeStyle = {
    ...badgeStyle,
    backgroundColor: location.status === 'active' ? '#C6F6D5' : '#FED7D7',
    color: location.status === 'active' ? '#22543D' : '#822727',
  }

  return (
    <div
      style={cardStyle}
      onClick={handleCardClick}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-5px)'
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
        e.currentTarget.style.borderColor = '#63B3ED'
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
        e.currentTarget.style.borderColor = '#e2e8f0'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'flex-start',
        }}
      >
        <h2 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '4px'}}>
          {location.name}
        </h2>

        <div>
          {location.type && <span style={badgeStyle}>{location.type}</span>}
          {location.status && (
            <span style={statusBadgeStyle}>{location.status}</span>
          )}
        </div>

        <p style={{marginBottom: '8px'}}>{location.description}</p>

        {location.coordinates && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '8px',
            }}
          >
            <span style={{fontWeight: 'bold', fontSize: '14px'}}>
              Latitude:{' '}
              <span style={{fontWeight: 'normal'}}>
                {location.coordinates.lat}
              </span>
            </span>
            <span style={{fontWeight: 'bold', fontSize: '14px'}}>
              Longitude:{' '}
              <span style={{fontWeight: 'normal'}}>
                {location.coordinates.lng}
              </span>
            </span>
          </div>
        )}

        {!location.coordinates && location.address && (
          <div style={{marginBottom: '8px'}}>
            <span style={{fontWeight: 'bold', fontSize: '14px'}}>
              Address:{' '}
              <span style={{fontWeight: 'normal'}}>{location.address}</span>
            </span>
          </div>
        )}

        {location.lastUpdated && (
          <p style={{fontSize: '12px', color: '#718096'}}>
            Last updated: {new Date(location.lastUpdated).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  )
}

export default LocationCard

// Mock map view API data

// Get map data for a specific location
export const getMapDataForLocation = async locationId => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 400))
  
    // Mock location data with additional details for map view
    const locations = {
      '1': {
        id: '1',
        name: 'Delhi Office',
        type: 'Headquarters',
        status: 'active',
        description:
          'Main headquarters in Delhi with over 500 employees. Houses the executive team and main operations.',
        coordinates: {lat: 28.6139, lng: 77.209},
        address: 'Connaught Place, New Delhi, 110001',
        lastUpdated: '2023-10-15T10:00:00Z',
        additionalLocations: [
          {
            name: 'Delhi Warehouse',
            description: 'Storage facility near Delhi office',
            coordinates: {lat: 28.6239, lng: 77.219},
          },
        ],
      },
      '2': {
        id: '2',
        name: 'Mumbai Branch',
        type: 'Branch Office',
        status: 'active',
        description:
          'Western region branch in Mumbai serving the western market of India. Houses sales and marketing teams.',
        coordinates: {lat: 19.076, lng: 72.8777},
        address: 'Marine Drive, Mumbai, 400002',
        lastUpdated: '2023-10-12T14:30:00Z',
        additionalLocations: [
          {
            name: 'Mumbai Support Center',
            description: 'Customer support center',
            coordinates: {lat: 19.086, lng: 72.8877},
          },
        ],
      },
      '3': {
        id: '3',
        name: 'Bangalore Tech Center',
        type: 'Tech Hub',
        status: 'active',
        description:
          'Research and development center in Bangalore focusing on product innovation and technology development.',
        coordinates: {lat: 12.9716, lng: 77.5946},
        address: 'Electronic City, Bangalore, 560001',
        lastUpdated: '2023-10-10T09:15:00Z',
        additionalLocations: [
          {
            name: 'Bangalore Training Center',
            description: 'Technical training facility',
            coordinates: {lat: 12.9816, lng: 77.6046},
          },
        ],
      },
      '4': {
        id: '4',
        name: 'Chennai Office',
        type: 'Branch Office',
        status: 'active',
        description:
          'Southern region branch in Chennai handling operations for Tamil Nadu and surrounding states.',
        coordinates: {lat: 13.0827, lng: 80.2707},
        address: 'IT Corridor, Chennai, 600119',
        lastUpdated: '2023-10-05T11:20:00Z',
        additionalLocations: [
          {
            name: 'Chennai Innovation Lab',
            description: 'Product testing and innovation facility',
            coordinates: {lat: 13.0927, lng: 80.2807},
          },
        ],
      },
      '5': {
        id: '5',
        name: 'Kolkata Distribution Center',
        type: 'Distribution Hub',
        status: 'active',
        description:
          'Eastern distribution center for product delivery across eastern India. Main logistics hub.',
        coordinates: {lat: 22.5726, lng: 88.3639},
        address: 'Park Street, Kolkata, 700001',
        lastUpdated: '2023-10-08T16:45:00Z',
        additionalLocations: [
          {
            name: 'Kolkata Customer Service',
            description: 'Eastern region customer support',
            coordinates: {lat: 22.5826, lng: 88.3739},
          },
        ],
      },
      '6': {
        id: '6',
        name: 'Hyderabad Development Office',
        type: 'Tech Hub',
        status: 'active',
        description:
          'Software development center in Hyderabad with focus on AI and machine learning projects.',
        coordinates: {lat: 17.385, lng: 78.4867},
        address: 'HITEC City, Hyderabad, 500081',
        lastUpdated: '2023-10-09T13:30:00Z',
        additionalLocations: [
          {
            name: 'Hyderabad Research Lab',
            description: 'Advanced research facility',
            coordinates: {lat: 17.395, lng: 78.4967},
          },
        ],
      },
    }
  
    return locations[locationId] || locations['1']
  }
  
  // Get user's current location
  export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          },
          error => {
            console.error('Geolocation error:', error)
            // Fallback to a default location (center of India)
            resolve({
              lat: 20.5937,
              lng: 78.9629,
            })
          },
          {timeout: 10000}, // 10 seconds timeout
        )
      } else {
        // Geolocation not supported, provide default
        console.log('Geolocation not supported')
        resolve({
          lat: 20.5937,
          lng: 78.9629,
        })
      }
    })
  }
  
  // Get nearby places
  export const getNearbyPlaces = async (lat, lng) => {
    // This would normally fetch from an API, but we'll return mock data
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 300))
  
    // Return some mock nearby places based on the coordinates
    const mockPlaces = [
      {
        name: 'Nearby Restaurant',
        description: 'Popular dining place',
        coordinates: {lat: lat + 0.01, lng: lng + 0.01},
      },
      {
        name: 'Coffee Shop',
        description: 'Cozy cafe with WiFi',
        coordinates: {lat: lat - 0.01, lng: lng - 0.005},
      },
      {
        name: 'Shopping Mall',
        description: 'Retail and entertainment complex',
        coordinates: {lat: lat + 0.008, lng: lng - 0.01},
      },
    ]
  
    return mockPlaces
  }
  
  export default {
    getMapDataForLocation,
    getCurrentLocation,
    getNearbyPlaces,
  }
  
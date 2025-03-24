// Mock dashboard API data

// Get all location cards for the dashboard
export const getLocationCards = async () => {
    // This function would normally fetch data from an API
    // but we're using mock data for now
  
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500))
  
    // Return mock location data
    return [
      {
        id: '1',
        name: 'Delhi Office',
        type: 'Headquarters',
        status: 'active',
        description: 'Main headquarters in Delhi',
        coordinates: {lat: 28.6139, lng: 77.209},
        address: 'Connaught Place, New Delhi',
        lastUpdated: '2023-10-15T10:00:00Z',
      },
      {
        id: '2',
        name: 'Mumbai Branch',
        type: 'Branch Office',
        status: 'active',
        description: 'Western region branch in Mumbai',
        coordinates: {lat: 19.076, lng: 72.8777},
        address: 'Marine Drive, Mumbai',
        lastUpdated: '2023-10-12T14:30:00Z',
      },
      {
        id: '3',
        name: 'Bangalore Tech Center',
        type: 'Tech Hub',
        status: 'active',
        description: 'Research and development center in Bangalore',
        coordinates: {lat: 12.9716, lng: 77.5946},
        address: 'Electronic City, Bangalore',
        lastUpdated: '2023-10-10T09:15:00Z',
      },
      {
        id: '4',
        name: 'Chennai Office',
        type: 'Branch Office',
        status: 'active',
        description: 'Southern region branch in Chennai',
        coordinates: {lat: 13.0827, lng: 80.2707},
        address: 'IT Corridor, Chennai',
        lastUpdated: '2023-10-05T11:20:00Z',
      },
      {
        id: '5',
        name: 'Kolkata Distribution Center',
        type: 'Distribution Hub',
        status: 'active',
        description: 'Eastern distribution center for product delivery',
        coordinates: {lat: 22.5726, lng: 88.3639},
        address: 'Park Street, Kolkata',
        lastUpdated: '2023-10-08T16:45:00Z',
      },
      {
        id: '6',
        name: 'Hyderabad Development Office',
        type: 'Tech Hub',
        status: 'active',
        description: 'Software development center in Hyderabad',
        coordinates: {lat: 17.385, lng: 78.4867},
        address: 'HITEC City, Hyderabad',
        lastUpdated: '2023-10-09T13:30:00Z',
      },
    ]
  }
  
  // Get a specific location card by ID
  export const getLocationCardById = async cardId => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 300))
  
    // Mock location data
    const locations = {
      '1': {
        id: '1',
        name: 'Delhi Office',
        type: 'Headquarters',
        status: 'active',
        description: 'Main headquarters in Delhi with over 500 employees.',
        coordinates: {lat: 28.6139, lng: 77.209},
        address: 'Connaught Place, New Delhi',
        lastUpdated: '2023-10-15T10:00:00Z',
      },
      '2': {
        id: '2',
        name: 'Mumbai Branch',
        type: 'Branch Office',
        status: 'active',
        description:
          'Western region branch in Mumbai serving the western market of India.',
        coordinates: {lat: 19.076, lng: 72.8777},
        address: 'Marine Drive, Mumbai',
        lastUpdated: '2023-10-12T14:30:00Z',
      },
      '3': {
        id: '3',
        name: 'Bangalore Tech Center',
        type: 'Tech Hub',
        status: 'active',
        description:
          'Research and development center in Bangalore focusing on product innovation.',
        coordinates: {lat: 12.9716, lng: 77.5946},
        address: 'Electronic City, Bangalore',
        lastUpdated: '2023-10-10T09:15:00Z',
      },
      '4': {
        id: '4',
        name: 'Chennai Office',
        type: 'Branch Office',
        status: 'active',
        description:
          'Southern region branch in Chennai handling operations for Tamil Nadu.',
        coordinates: {lat: 13.0827, lng: 80.2707},
        address: 'IT Corridor, Chennai',
        lastUpdated: '2023-10-05T11:20:00Z',
      },
      '5': {
        id: '5',
        name: 'Kolkata Distribution Center',
        type: 'Distribution Hub',
        status: 'active',
        description:
          'Eastern distribution center for product delivery across eastern India.',
        coordinates: {lat: 22.5726, lng: 88.3639},
        address: 'Park Street, Kolkata',
        lastUpdated: '2023-10-08T16:45:00Z',
      },
      '6': {
        id: '6',
        name: 'Hyderabad Development Office',
        type: 'Tech Hub',
        status: 'active',
        description:
          'Software development center in Hyderabad with focus on AI and ML projects.',
        coordinates: {lat: 17.385, lng: 78.4867},
        address: 'HITEC City, Hyderabad',
        lastUpdated: '2023-10-09T13:30:00Z',
      },
    }
  
    return locations[cardId] || locations['1']
  }
  
  // Get dashboard statistics
  export const getDashboardStatistics = async () => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 400))
  
    // Return mock statistics
    return {
      totalLocations: 6,
      activeLocations: 6,
      regions: {
        north: 1,
        south: 2,
        east: 1,
        west: 1,
        central: 1,
      },
    }
  }
  
  export default {
    getLocationCards,
    getLocationCardById,
    getDashboardStatistics,
  }
  
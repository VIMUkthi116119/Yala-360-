import {
  MOCK_BOOKINGS,
  MOCK_DRIVERS,
  MOCK_GUIDES,
  MOCK_DENSITY_DATA,
  MOCK_SUCCESS_DATA,
  MOCK_REVIEWS,
} from '../mockData';

/**
 * MOCKED API Service for YALA360 Admin Portal
 */

export const api = {
  // Dashboard
  getDashboardMetrics: async (range: string = 'today') => {
    return {
      totalBookingsToday: MOCK_BOOKINGS.length,
      totalVisitorsToday: MOCK_BOOKINGS.reduce((acc, b) => acc + b.visitors, 0),
      activeSafaris: MOCK_BOOKINGS.filter((b) => (b.status as string) === 'On Safari' || b.status === "Confirmed").length,
      driversOnSafari: MOCK_DRIVERS.filter((d) => d.status === 'On Safari').length,
      driversAvailable: MOCK_DRIVERS.filter((d) => d.status === 'Available').length,
      averageParkDensity: 65,
      revenue: range === 'all' ? 2500000 : 85000,
    };
  },

  // Analytics
  getCrowdDensity: async () => {
    return {
      densityData: MOCK_DENSITY_DATA.map(d => ({
        date: d.day,
        totalJeeps: d.jeeps,
        totalTourists: d.tourists
      }))
    };
  },

  getBookingComparison: async () => {
    return {
      comparisonData: MOCK_SUCCESS_DATA.map(s => ({
        date: s.day,
        bookedThroughPlatform: s.yala360,
        nonPlatformSafaris: s.external
      }))
    };
  },

  // Bookings
  getBookings: async (params: { page?: number; limit?: number; search?: string; safariType?: string; date?: string }) => {
    return {
      bookings: MOCK_BOOKINGS,
      totalPages: 1,
      total: MOCK_BOOKINGS.length
    };
  },

  reassignDriver: async (bookingId: string, driverId: string) => {
    return { success: true };
  },

  cancelBooking: async (bookingId: string) => {
    return { success: true };
  },

  autoReassignDriver: async (bookingId: string) => {
    return { success: true, message: 'Driver auto-reassigned', newDriverId: MOCK_DRIVERS[0].id };
  },

  // Drivers
  getDrivers: async () => {
    return { drivers: MOCK_DRIVERS };
  },

  removeDriver: async (id: string) => {
    return { success: true };
  },

  approveDriver: async (id: string) => {
    return { success: true };
  },

  suspendDriver: async (id: string) => {
    return { success: true };
  },

  // Guides
  getGuides: async () => {
    return { guides: MOCK_GUIDES };
  },

  removeGuide: async (id: string) => {
    return { success: true };
  },

  // Rankings
  getRankings: async () => {
    return {
      rankings: MOCK_DRIVERS.map(d => ({ ...d, rankingScore: d.score })).sort((a, b) => b.rankingScore - a.rankingScore)
    };
  },

  // QR Verification
  verifyBooking: async (bookingId: string) => {
    const booking = MOCK_BOOKINGS.find(b => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');
    return { success: true, booking };
  },

  // Reviews
  getReviews: async () => {
    return { reviews: MOCK_REVIEWS };
  },

  approveReview: async (id: string) => {
    return { success: true };
  },

  deleteReview: async (id: string) => {
    return { success: true };
  },

  flagReview: async (id: string) => {
    return { success: true };
  },

  // Notifications
  getTourists: async (search?: string) => {
    return {
      tourists: [
        { id: 'T-001', name: 'John Doe', phone: '+123456789' }
      ]
    };
  },

  sendNotification: async (data: any) => {
    return { success: true };
  },

  // System
  clearCache: async () => {
    return { success: true, message: 'System cache cleared successfully' };
  },

  // Settings
  getSettings: async () => {
    return {
      settings: {
        maxJeepsPerSlot: 50,
        platformFee: 15,
        openingTime: '06:00',
        closingTime: '18:00',
        maintenanceMode: false
      }
    };
  },

  updateSettings: async (settings: any) => {
    return { success: true, message: 'Settings saved', settings };
  },

  // Gallery
  getGallery: async () => {
    return { images: [] };
  },

  addGalleryImage: async (data: { url: string; title?: string }) => {
    return { success: true, image: { id: Date.now().toString(), ...data } };
  },

  removeGalleryImage: async (id: string) => {
    return { success: true };
  },

  // Map Management
  getMapLocations: async (params: { type?: string; search?: string; status?: string } = {}) => {
    return { locations: [] };
  },

  addMapLocation: async (data: any) => {
    return { success: true, location: { id: Date.now().toString(), ...data } };
  },

  updateMapLocation: async (id: string, data: any) => {
    return { success: true };
  },

  deleteMapLocation: async (id: string) => {
    return { success: true };
  },

  // Animal Sightings
  getAnimalSightings: async () => {
    return { sightings: [] };
  },

  updateAnimalSighting: async (id: string, data: any) => {
    return { success: true };
  },

  deleteAnimalSighting: async (id: string) => {
    return { success: true };
  }
};

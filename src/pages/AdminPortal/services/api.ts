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
      activeSafaris: MOCK_BOOKINGS.filter((b) => b.status === 'On Safari').length,
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
      totalPages: 1
    };
  },

  reassignDriver: async (bookingId: string, driverId: string) => {
    return { success: true };
  },

  cancelBooking: async (bookingId: string) => {
    return { success: true };
  },

  autoReassignDriver: async (bookingId: string) => {
    return { success: true, newDriverId: MOCK_DRIVERS[0].id };
  },

  // Drivers
  getDrivers: async () => {
    return MOCK_DRIVERS;
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
    return MOCK_GUIDES;
  },

  removeGuide: async (id: string) => {
    return { success: true };
  },

  // Rankings
  getRankings: async () => {
    return {
      topDrivers: MOCK_DRIVERS.slice(0, 3),
      topGuides: MOCK_GUIDES.slice(0, 3)
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
    return MOCK_REVIEWS;
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
    return [
      { id: 'T-001', name: 'John Doe', phone: '+123456789' }
    ];
  },

  sendNotification: async (data: any) => {
    return { success: true };
  },

  // System
  clearCache: async () => {
    return { success: true };
  },

  // Settings
  getSettings: async () => {
    return {
      autoAssignDrivers: true,
      maxJeepsPerDay: 200,
      baseTicketPrice: 50,
      platformFeePercentage: 10
    };
  },

  updateSettings: async (settings: any) => {
    return { success: true, settings };
  },

  // Gallery
  getGallery: async () => {
    return [];
  },

  addGalleryImage: async (data: { url: string; title?: string }) => {
    return { success: true, image: { id: Date.now().toString(), ...data } };
  },

  removeGalleryImage: async (id: string) => {
    return { success: true };
  },

  // Map Management
  getMapLocations: async (params: { type?: string; search?: string; status?: string } = {}) => {
    return [];
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
    return [];
  },

  updateAnimalSighting: async (id: string, data: any) => {
    return { success: true };
  },

  deleteAnimalSighting: async (id: string) => {
    return { success: true };
  }
};

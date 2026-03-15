/**
 * API Service for YALA360 Admin Portal
 */

const getApiBase = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api/admin`;
  }
  return '/api/admin';
};

const API_BASE = getApiBase();

export const api = {
  // Dashboard
  getDashboardMetrics: async (range: string = 'today') => {
    const res = await fetch(`${API_BASE}/dashboard?range=${range}`);
    if (!res.ok) throw new Error('Failed to fetch dashboard metrics');
    return res.json();
  },

  // Analytics
  getCrowdDensity: async () => {
    const res = await fetch(`${API_BASE}/analytics/crowd-density`);
    if (!res.ok) throw new Error('Failed to fetch crowd density data');
    return res.json();
  },

  getBookingComparison: async () => {
    const res = await fetch(`${API_BASE}/analytics/booking-comparison`);
    if (!res.ok) throw new Error('Failed to fetch booking comparison data');
    return res.json();
  },

  // Bookings
  getBookings: async (params: { page?: number; limit?: number; search?: string; safariType?: string; date?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE}/bookings?${query}`);
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  },

  reassignDriver: async (bookingId: string, driverId: string) => {
    const res = await fetch(`${API_BASE}/bookings/${bookingId}/reassign-driver`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ driverId })
    });
    if (!res.ok) throw new Error('Failed to reassign driver');
    return res.json();
  },

  cancelBooking: async (bookingId: string) => {
    const res = await fetch(`${API_BASE}/bookings/${bookingId}/cancel`, {
      method: 'PUT'
    });
    if (!res.ok) throw new Error('Failed to cancel booking');
    return res.json();
  },

  autoReassignDriver: async (bookingId: string) => {
    const res = await fetch(`${API_BASE}/bookings/auto-reassign/${bookingId}`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to auto-reassign driver');
    return res.json();
  },

  // Drivers
  getDrivers: async () => {
    const res = await fetch(`${API_BASE}/drivers`);
    if (!res.ok) throw new Error('Failed to fetch drivers');
    return res.json();
  },

  removeDriver: async (id: string) => {
    const res = await fetch(`${API_BASE}/drivers/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to remove driver');
    return res.json();
  },

  approveDriver: async (id: string) => {
    const res = await fetch(`${API_BASE}/drivers/${id}/approve`, { method: 'PUT' });
    if (!res.ok) throw new Error('Failed to approve driver');
    return res.json();
  },

  suspendDriver: async (id: string) => {
    const res = await fetch(`${API_BASE}/drivers/${id}/suspend`, { method: 'PUT' });
    if (!res.ok) throw new Error('Failed to suspend driver');
    return res.json();
  },

  // Guides
  getGuides: async () => {
    const res = await fetch(`${API_BASE}/guides`);
    if (!res.ok) throw new Error('Failed to fetch guides');
    return res.json();
  },

  removeGuide: async (id: string) => {
    const res = await fetch(`${API_BASE}/guides/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to remove guide');
    return res.json();
  },

  // Rankings
  getRankings: async () => {
    const res = await fetch(`${API_BASE}/rankings`);
    if (!res.ok) throw new Error('Failed to fetch rankings');
    return res.json();
  },

  // QR Verification
  verifyBooking: async (bookingId: string) => {
    const res = await fetch(`${API_BASE}/verify-booking/${bookingId}`);
    if (!res.ok) throw new Error('Failed to verify booking');
    return res.json();
  },

  // Reviews
  getReviews: async () => {
    const res = await fetch(`${API_BASE}/reviews`);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
  },

  approveReview: async (id: string) => {
    const res = await fetch(`${API_BASE}/reviews/${id}/approve`, { method: 'PUT' });
    if (!res.ok) throw new Error('Failed to approve review');
    return res.json();
  },

  deleteReview: async (id: string) => {
    const res = await fetch(`${API_BASE}/reviews/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete review');
    return res.json();
  },

  flagReview: async (id: string) => {
    const res = await fetch(`${API_BASE}/reviews/${id}/flag`, { method: 'PUT' });
    if (!res.ok) throw new Error('Failed to flag review');
    return res.json();
  },

  // Notifications
  getTourists: async (search?: string) => {
    const res = await fetch(`${API_BASE}/tourists?search=${search || ''}`);
    if (!res.ok) throw new Error('Failed to fetch tourists');
    return res.json();
  },

  sendNotification: async (data: any) => {
    const res = await fetch(`${API_BASE}/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to send notification');
    return res.json();
  },

  // System
  clearCache: async () => {
    const res = await fetch(`${API_BASE}/system/clear-cache`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to clear cache');
    return res.json();
  },

  // Settings
  getSettings: async () => {
    const res = await fetch(`${API_BASE}/settings`);
    if (!res.ok) throw new Error('Failed to fetch settings');
    return res.json();
  },

  updateSettings: async (settings: any) => {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return res.json();
  },

  // Gallery
  getGallery: async () => {
    const res = await fetch(`${API_BASE}/gallery`);
    if (!res.ok) throw new Error('Failed to fetch gallery');
    return res.json();
  },

  addGalleryImage: async (data: { url: string; title?: string }) => {
    const res = await fetch(`${API_BASE}/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to add gallery image');
    return res.json();
  },

  removeGalleryImage: async (id: string) => {
    const res = await fetch(`${API_BASE}/gallery/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to remove gallery image');
    return res.json();
  },

  // Map Management
  getMapLocations: async (params: { type?: string; search?: string; status?: string } = {}) => {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE}/map/locations?${query}`);
    if (!res.ok) throw new Error('Failed to fetch map locations');
    return res.json();
  },

  addMapLocation: async (data: any) => {
    const res = await fetch(`${API_BASE}/map/locations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to add map location');
    return res.json();
  },

  updateMapLocation: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE}/map/locations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update map location');
    return res.json();
  },

  deleteMapLocation: async (id: string) => {
    const res = await fetch(`${API_BASE}/map/locations/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete map location');
    return res.json();
  },

  // Animal Sightings
  getAnimalSightings: async () => {
    const res = await fetch(`${API_BASE}/map/sightings`);
    if (!res.ok) throw new Error('Failed to fetch animal sightings');
    return res.json();
  },

  updateAnimalSighting: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE}/map/sightings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update animal sighting');
    return res.json();
  },

  deleteAnimalSighting: async (id: string) => {
    const res = await fetch(`${API_BASE}/map/sightings/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete animal sighting');
    return res.json();
  }
};

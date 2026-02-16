
export enum SafariType {
  MORNING = 'Morning Safari',
  EVENING = 'Evening Safari',
  FULL_DAY = 'Full Day Safari'
}

export enum CrowdDensity {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface Booking {
  id: string;
  type: SafariType;
  date: string;
  timeSlot: string;
  visitors: number;
  jeeps: number;
  driverId?: string;
  guideId?: string;
  status: 'confirmed' | 'pending';
}

export interface Personnel {
  id: string;
  name: string;
  role: 'driver' | 'guide';
  rating: number;
  experience: string;
  image: string;
}

export interface Sighting {
  id: string;
  animal: string;
  location: string;
  time: string;
  coordinates: { x: number; y: number };
}

export interface Review {
  id: string;
  bookingId: string;
  userName: string;
  rating: number;
  comment: string;
  type: SafariType;
  date: string;
}

export interface GalleryImage {
  id: string;
  bookingId: string;
  url: string;
  category: string;
  caption: string;
}

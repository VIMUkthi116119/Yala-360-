import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  getCountFromServer,
} from 'firebase/firestore';
import { db } from '../firebase';

const BOOKINGS_COLLECTION = 'bookings';

export interface FirestoreBooking {
  id?: string;
  bookingId: string;                // Y360-XXXXX
  touristName: string;
  email: string;
  phone: string;
  country: string;
  safariType: string;               // 'morning' | 'evening' | 'full-day'
  safariTitle: string;              // Display name
  date: string;                     // ISO date string
  visitors: number;
  driverIds: string[];
  guideIds: string[];
  paymentMethod: 'online' | 'onsite';
  paymentStatus: 'Paid' | 'Pending';
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  totalPrice: number;
  driverName?: string;
  vehicleType?: string;
  specialRequests?: string;
  createdAt?: any;
  userId?: string;
}

/** Save a new booking to Firestore */
export async function saveBooking(booking: Omit<FirestoreBooking, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, BOOKINGS_COLLECTION), {
    ...booking,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/** Get all bookings (admin) */
export async function getAllBookings(): Promise<FirestoreBooking[]> {
  const q = query(collection(db, BOOKINGS_COLLECTION), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as FirestoreBooking);
}

/** Get total bookings count */
export async function getBookingsCount(): Promise<number> {
  const snap = await getCountFromServer(collection(db, BOOKINGS_COLLECTION));
  return snap.data().count;
}

/** Get bookings for today */
export async function getTodayBookings(): Promise<FirestoreBooking[]> {
  const today = new Date().toISOString().split('T')[0];
  const q = query(
    collection(db, BOOKINGS_COLLECTION),
    where('date', '==', today),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as FirestoreBooking);
}

/** Update booking status */
export async function updateBookingStatus(
  docId: string,
  status: FirestoreBooking['status']
): Promise<void> {
  await updateDoc(doc(db, BOOKINGS_COLLECTION, docId), { status });
}

/** Cancel a booking */
export async function cancelBooking(docId: string): Promise<void> {
  await updateDoc(doc(db, BOOKINGS_COLLECTION, docId), {
    status: 'Cancelled',
    paymentStatus: 'Pending',
  });
}

/** Delete booking (admin) */
export async function deleteBooking(docId: string): Promise<void> {
  await deleteDoc(doc(db, BOOKINGS_COLLECTION, docId));
}

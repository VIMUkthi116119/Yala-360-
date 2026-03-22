/**
 * firebaseAdminService.ts
 *
 * Central admin Firestore/RTDB operations for:
 *   • Reviews     → Firestore `reviews`
 *   • Gallery     → Firestore `guest_photos`
 *   • Map sightings → Realtime Database `sightings`
 *   • Bookings    → already handled by firebaseBooking.ts
 */

import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { ref, get, remove } from 'firebase/database';
import { db } from '../firebase';
import { rtdb } from '../firebase';

// ─────────────────────────────────────────────────────────────────────────────
// REVIEWS
// ─────────────────────────────────────────────────────────────────────────────

export interface AdminReview {
  id: string;
  userName: string;
  date: string;
  rating: number;
  comment: string;
  type: string;
  bookingId: string;
  flagged?: boolean;
  userId?: string;
  userEmail?: string;
}

/** Fetch all reviews from Firestore */
export async function getAllReviews(): Promise<AdminReview[]> {
  const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    let dateStr = new Date().toISOString().split('T')[0];
    if (data.createdAt instanceof Timestamp) {
      dateStr = new Date(data.createdAt.toMillis()).toISOString().split('T')[0];
    }
    return {
      id: d.id,
      userName: data.userName || 'Guest',
      date: dateStr,
      rating: data.rating || 0,
      comment: data.comment || '',
      type: data.type || 'Unknown',
      bookingId: data.bookingId || '',
      flagged: data.flagged || false,
      userId: data.userId,
      userEmail: data.userEmail,
    };
  });
}

/** Delete a review permanently */
export async function deleteReview(docId: string): Promise<void> {
  await deleteDoc(doc(db, 'reviews', docId));
}

/** Flag / unflag a review */
export async function flagReview(docId: string, flagged: boolean): Promise<void> {
  await updateDoc(doc(db, 'reviews', docId), { flagged });
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY (guest_photos)
// ─────────────────────────────────────────────────────────────────────────────

export interface AdminGalleryPhoto {
  id: string;
  url: string;
  title: string;
  category: string;
  bookingId: string;
  userEmail?: string;
  date: string;
  approved: boolean;
}

/** Fetch all guest photos from Firestore */
export async function getAllGalleryPhotos(): Promise<AdminGalleryPhoto[]> {
  const q = query(collection(db, 'guest_photos'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    let dateStr = new Date().toISOString().split('T')[0];
    if (data.createdAt instanceof Timestamp) {
      dateStr = new Date(data.createdAt.toMillis()).toISOString().split('T')[0];
    }
    return {
      id: d.id,
      url: data.imageUrl || '',
      title: `${data.category || 'Photo'} — ${dateStr}`,
      category: data.category || 'Uncategorized',
      bookingId: data.bookingId || '',
      userEmail: data.userEmail,
      date: dateStr,
      approved: data.approved !== false,
    };
  });
}

/** Delete a guest photo from Firestore */
export async function deleteGalleryPhoto(docId: string): Promise<void> {
  await deleteDoc(doc(db, 'guest_photos', docId));
}

/** Toggle approval status of a photo */
export async function setPhotoApproval(docId: string, approved: boolean): Promise<void> {
  await updateDoc(doc(db, 'guest_photos', docId), { approved });
}

// ─────────────────────────────────────────────────────────────────────────────
// MAP SIGHTINGS (Realtime Database)
// ─────────────────────────────────────────────────────────────────────────────

export interface AdminSighting {
  id: string;
  animal: string;
  lat: number;
  lng: number;
  time: number;       // epoch ms
  note?: string;
  reportedBy?: string;
}

/** Fetch all sightings from RTDB */
export async function getAllSightings(): Promise<AdminSighting[]> {
  const sightingsRef = ref(rtdb, 'sightings');
  const snap = await get(sightingsRef);
  if (!snap.exists()) return [];

interface RtdbSighting {
  animal?: string;
  lat?: number;
  lng?: number;
  time?: number;
  note?: string;
  reportedBy?: string;
}

  const data = snap.val() as Record<string, RtdbSighting>;
  return Object.entries(data).map(([id, s]) => ({
    id,
    animal: s.animal || 'Unknown',
    lat: s.lat || 0,
    lng: s.lng || 0,
    time: s.time || 0,
    note: s.note || '',
    reportedBy: s.reportedBy || '',
  }));
}

/** Delete a sighting from RTDB */
export async function deleteSighting(id: string): Promise<void> {
  await remove(ref(rtdb, `sightings/${id}`));
}

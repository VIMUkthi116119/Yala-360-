import React, { useEffect, useState } from 'react';
import { Star, CheckCircle2, Flag, Trash2, MessageSquare, Mail } from 'lucide-react';
import { api } from '../services/api';
import { cn } from '../utils';
import { ToastType } from '../components/Toast';
import ConfirmationModal from '../components/ConfirmationModal';

export default function Reviews({ showToast }: { showToast: (msg: string, type?: ToastType) => void }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await api.getReviews();
      setReviews(data.reviews);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      showToast('Failed to load reviews', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await api.approveReview(id);
      showToast('Review approved and unflagged');
      fetchReviews();
    } catch (error) {
      showToast('Failed to approve review', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteReview(id);
      showToast('Review deleted permanently');
      fetchReviews();
    } catch (error) {
      showToast('Failed to delete review', 'error');
    }
  };

  const handleFlag = async (id: string) => {
    try {
      await api.flagReview(id);
      showToast('Review flagged for moderation');
      fetchReviews();
    } catch (error) {
      showToast('Failed to flag review', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Guest Reviews</h2>
          <p className="text-slate-500 text-sm mt-1">
            {loading ? 'Loading…' : `${reviews.length} review${reviews.length !== 1 ? 's' : ''} from Firestore`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-safari-gold"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-200" />
            <p className="font-medium">No reviews yet.</p>
            <p className="text-sm text-slate-400 mt-1">Reviews submitted by guests will appear here.</p>
          </div>
        ) : reviews.map((review) => (
          <div key={review.id} className="glass-card p-6 flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-safari-gold border border-slate-200 font-bold text-sm">
                  {review.userName?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{review.userName || 'Anonymous'}</h4>
                  <p className="text-xs text-slate-400">{review.date}</p>
                </div>
              </div>
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn('w-3 h-3', i < review.rating ? 'text-safari-gold fill-safari-gold' : 'text-slate-200')}
                  />
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="flex-1 bg-slate-50 rounded-xl p-4 mb-4 italic text-slate-700 text-sm border border-slate-100">
              "{review.comment}"
            </div>

            {/* Metadata */}
            <div className="space-y-1.5 mb-4">
              {/* Safari type */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-safari-gold bg-safari-gold/10 px-2 py-0.5 rounded">
                  {review.type}
                </span>
              </div>
              {/* Booking ID */}
              {review.bookingId && (
                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded inline-block">
                  {review.bookingId}
                </span>
              )}
              {/* User email */}
              {review.userEmail && (
                <div className="flex items-center gap-1 text-slate-400">
                  <Mail className="w-3 h-3 flex-shrink-0" />
                  <span className="text-[10px] truncate">{review.userEmail}</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className={cn(
                'text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border',
                review.flagged
                  ? 'bg-rose-50 text-rose-600 border-rose-100'
                  : 'bg-emerald-50 text-emerald-600 border-emerald-100'
              )}>
                {review.flagged ? 'Flagged' : 'Approved'}
              </span>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-lg bg-slate-100 text-emerald-600 hover:bg-emerald-50 transition-all"
                  title="Approve / Unflag"
                  onClick={() => handleApprove(review.id)}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-lg bg-slate-100 text-amber-600 hover:bg-amber-50 transition-all"
                  title="Flag for moderation"
                  onClick={() => handleFlag(review.id)}
                >
                  <Flag className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-lg bg-slate-100 text-rose-600 hover:bg-rose-50 transition-all"
                  title="Delete permanently"
                  onClick={() => setConfirmDeleteId(review.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* End-of-list indicator */}
        {!loading && reviews.length > 0 && (
          <div className="glass-card p-6 border-dashed border-slate-200 flex flex-col items-center justify-center text-center gap-4 opacity-60">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">All reviews loaded</p>
              <p className="text-xs text-slate-400">Showing all {reviews.length} reviews from Firestore.</p>
            </div>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => {
          if (confirmDeleteId) handleDelete(confirmDeleteId);
          setConfirmDeleteId(null);
        }}
        title="Delete Review"
        message="Are you sure you want to permanently delete this review? This action cannot be undone."
        confirmLabel="Delete Review"
        variant="danger"
      />
    </div>
  );
}

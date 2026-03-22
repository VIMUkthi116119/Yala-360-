import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, Trash2, Calendar, ExternalLink, CheckCircle2, User, Tag } from 'lucide-react';
import { api } from '../services/api';
import { cn } from '../utils';
import { ToastType } from '../components/Toast';
import ConfirmationModal from '../components/ConfirmationModal';

export default function Gallery({ showToast }: { showToast: (msg: string, type?: ToastType) => void }) {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const data = await api.getGallery();
      setImages(data.images);
    } catch (error) {
      showToast('Failed to fetch gallery photos', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleRemoveImage = async (id: string) => {
    try {
      await api.removeGalleryImage(id);
      showToast('Photo removed from gallery');
      fetchGallery();
    } catch (error) {
      showToast('Failed to remove photo', 'error');
    }
  };

  const handleApproveImage = async (id: string) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (api as any).approveGalleryImage(id);
      showToast('Photo approved — now visible to guests');
      fetchGallery();
    } catch (error) {
      showToast('Failed to approve photo', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-safari-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Guest Photo Gallery</h2>
          <p className="text-slate-500 text-sm mt-1">
            {images.length} photo{images.length !== 1 ? 's' : ''} uploaded by guests — review and moderate below.
          </p>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="glass-card p-16 flex flex-col items-center justify-center text-center gap-4">
          <ImageIcon className="w-16 h-16 text-slate-200" />
          <p className="text-slate-500 font-medium">No guest photos yet.</p>
          <p className="text-slate-400 text-sm">Photos uploaded by guests on the Gallery page will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((img) => (
            <div key={img.id} className="glass-card overflow-hidden group flex flex-col">
              {/* Photo */}
              <div className="aspect-video relative overflow-hidden bg-slate-100">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => window.open(img.url, '_blank')}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors"
                    title="Open full size"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleApproveImage(img.id)}
                    className="p-2 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 hover:bg-emerald-500/50 transition-colors"
                    title="Approve photo"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(img.id)}
                    className="p-2 rounded-full bg-rose-500/20 backdrop-blur-md text-rose-300 hover:bg-rose-500/50 transition-colors"
                    title="Delete photo"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Approval badge */}
                <div className="absolute top-2 right-2">
                  <span className={cn(
                    'text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border',
                    img.approved
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                  )}>
                    {img.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
              </div>

              {/* Metadata */}
              <div className="p-4 flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Tag className="w-3 h-3 text-safari-gold flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider text-safari-gold">{img.category}</span>
                </div>

                {img.bookingId && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {img.bookingId}
                    </span>
                  </div>
                )}

                {img.userEmail && (
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <User className="w-3 h-3 flex-shrink-0" />
                    <span className="text-[10px] truncate">{img.userEmail}</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{img.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => {
          if (confirmDeleteId) handleRemoveImage(confirmDeleteId);
          setConfirmDeleteId(null);
        }}
        title="Delete Photo"
        message="Are you sure you want to permanently delete this guest photo? This cannot be undone."
        confirmLabel="Delete Photo"
        variant="danger"
      />
    </div>
  );
}

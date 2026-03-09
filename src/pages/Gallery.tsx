
import React, { useState, useRef, useEffect } from 'react';
import { MOCK_GALLERY } from '../constants';
import { Upload, Camera, Search, X } from 'lucide-react';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [showUpload, setShowUpload] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [selectedImg, setSelectedImg] = useState<any>(null);

  const categories = ['All', 'Leopards', 'Elephants', 'Birds', 'Landscape'];
  const uploadCategories = categories.filter(c => c !== 'All');

  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [uploadCategory, setUploadCategory] = useState(uploadCategories[0]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!showUpload) return;
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            const file = items[i].getAsFile();
            if (file) {
              const reader = new FileReader();
              reader.onload = (ev) => setUploadedFile(ev.target?.result as string);
              reader.readAsDataURL(file);
            }
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [showUpload]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedFile(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedFile(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (bookingId.length <= 4) {
      alert("Invalid Booking ID! Must be longer than 4 characters.");
      return;
    }
    if (!uploadedFile) {
      alert("Please select a photo.");
      return;
    }
    
    // In a real app, this would append to the backend
    // For now we just show a success message including the category
    alert(`Verification successful! Photo uploaded successfully under the '${uploadCategory}' category for review.`);
    
    setShowUpload(false);
    setUploadedFile(null);
    setBookingId('');
    setUploadCategory(uploadCategories[0]);
  };

  const images = filter === 'All' ? MOCK_GALLERY : MOCK_GALLERY.filter(img => img.category === filter);

  return (
    <div className="pt-32 pb-24 px-6 lg:px-24 bg-beige min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <h1 className="text-5xl serif">Guest Perspectives</h1>
            <p className="text-gray-500 font-light italic">Memories captured by our community. Uploads require a valid Booking ID.</p>
          </div>
          <button 
            onClick={() => setShowUpload(true)}
            className="px-8 py-3 bg-gold text-white uppercase tracking-widest text-xs font-bold hover:bg-black transition-all flex items-center space-x-2"
          >
            <Upload size={16} />
            <span>Share My Experience</span>
          </button>
        </header>

        {/* Filtering */}
        <div className="flex flex-wrap gap-4 border-b border-gold/20 pb-8">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === cat ? 'bg-gold text-white shadow-md' : 'bg-white text-gray-500 hover:text-gold border border-gold/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map(img => (
            <div 
              key={img.id} 
              onClick={() => setSelectedImg(img)}
              className="group relative h-80 overflow-hidden cursor-pointer"
            >
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white">
                <p className="text-xs uppercase tracking-widest font-bold text-gold mb-1">{img.category}</p>
                <p className="serif text-lg">{img.caption}</p>
                <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center text-[10px] tracking-widest uppercase">
                  <span>Guest #{img.bookingId}</span>
                  <Camera size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-6">
            <div className="bg-beige w-full max-w-lg p-12 relative animate-fadeIn">
              <button 
                onClick={() => { setShowUpload(false); setUploadedFile(null); setBookingId(''); }} 
                className="absolute top-6 right-6 hover:text-gold transition-colors"
               >
                <X size={24} />
              </button>
              <h2 className="text-3xl serif mb-6 text-center">Share Your Safari</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gold text-left block">
                      Booking ID Verification
                    </label>
                    {bookingId.length > 0 && (
                      <span className={`text-[10px] uppercase font-bold tracking-widest ${bookingId.length > 4 ? 'text-green-600' : 'text-red-500'}`}>
                        {bookingId.length > 4 ? 'Verified \u2713' : 'Invalid \u2717'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="e.g. Y360-1234" 
                      className="w-full p-4 border border-gold/20 focus:border-gold outline-none serif transition-colors"
                      value={bookingId}
                      onChange={e => setBookingId(e.target.value)}
                    />
                    <Search className="absolute right-4 top-4 text-gold/50" size={20} />
                  </div>
                  <p className="text-[10px] text-gray-400 italic">Validation required to prevent spam and ensure authentic content.</p>
                </div>
                {/* Drag and drop area */}
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`h-48 border-2 border-dashed flex flex-col items-center justify-center space-y-4 cursor-pointer transition-all ${isDragging ? 'border-gold bg-gold/5' : 'border-gold/30 bg-white/50 hover:bg-white'} overflow-hidden relative group`}
                >
                  <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleFileSelect} />
                  
                  {uploadedFile ? (
                    <>
                      <img src={uploadedFile} alt="Preview" className="w-full h-full object-cover absolute inset-0" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-xs font-bold uppercase tracking-widest">Change Photo</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Camera className={`transition-colors ${isDragging ? 'text-gold' : 'text-gold/60'}`} size={32} strokeWidth={1} />
                      <div className="text-center">
                        <p className="text-xs text-black font-bold mb-1">Click to browse or drag & drop</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Or paste (Ctrl+V) an image here</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Category Selection */}
                {uploadedFile && (
                  <div className="space-y-2 animate-fadeIn">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gold text-left block">
                      Select Category
                    </label>
                    <select 
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="w-full p-4 border border-gold/20 focus:border-gold outline-none serif bg-white cursor-pointer"
                    >
                      {uploadCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                )}

                <button 
                  disabled={!uploadedFile || bookingId.length <= 4}
                  onClick={handleUpload}
                  className="w-full py-4 bg-gold text-white uppercase tracking-widest text-xs font-bold hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify & Upload
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lightbox */}
        {selectedImg && (
          <div className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-12">
             <button onClick={() => setSelectedImg(null)} className="absolute top-8 right-8 text-white hover:text-gold">
                <X size={32} />
              </button>
              <img src={selectedImg.url} className="max-w-full max-h-[80vh] object-contain mb-8 shadow-2xl" alt="" />
              <div className="text-center text-white space-y-4">
                <p className="text-gold uppercase tracking-widest font-bold text-xs">{selectedImg.category}</p>
                <h3 className="text-3xl serif">{selectedImg.caption}</h3>
                <p className="text-gray-400 font-light">Captured by Guest #{selectedImg.bookingId}</p>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;

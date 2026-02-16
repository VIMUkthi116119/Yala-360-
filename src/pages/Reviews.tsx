
import React, { useState } from 'react';
import { MOCK_REVIEWS } from '../constants';
import { Star, ShieldCheck, Filter } from 'lucide-react';

const ReviewCard = ({ review }: any) => (
  <div className="bg-white p-10 border border-gray-100 shadow-sm space-y-6 relative group hover:shadow-xl transition-all">
    <div className="absolute top-6 right-10 text-gold/20 flex space-x-1">
      <Star size={16} />
      <Star size={16} />
    </div>
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <h4 className="text-xl serif">{review.userName}</h4>
        <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <ShieldCheck className="text-green-600" size={12} />
          <span>Verified Stay</span>
          <span>•</span>
          <span>{review.date}</span>
        </div>
      </div>
      <div className="flex text-gold">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={1.5} />
        ))}
      </div>
    </div>
    <p className="text-gray-600 font-light italic leading-loose text-lg">
      "{review.comment}"
    </p>
    <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
      <span className="text-[10px] font-bold uppercase tracking-widest text-gold">{review.type}</span>
      <span className="text-[10px] font-bold text-gray-400">ID: {review.bookingId}</span>
    </div>
  </div>
);

const Reviews: React.FC = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="pt-32 pb-24 px-6 lg:px-24 bg-beige min-h-screen">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="text-center space-y-4">
          <h1 className="text-5xl serif">Guest Chronicles</h1>
          <p className="text-gray-500 font-light italic">Real experiences from verified luxury travelers.</p>
        </header>

        <div className="flex items-center justify-between border-b border-gold/20 pb-6">
          <div className="flex space-x-6">
            <button className={`text-xs font-bold uppercase tracking-widest transition-all ${filter === 'All' ? 'text-gold underline underline-offset-8' : 'text-gray-400 hover:text-gold'}`} onClick={() => setFilter('All')}>All Reviews</button>
            <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gold">Top Rated</button>
            <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gold">Recent</button>
          </div>
          <div className="flex items-center space-x-2 text-gray-400 cursor-pointer hover:text-gold">
            <Filter size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Filter By Safari</span>
          </div>
        </div>

        <div className="grid gap-8">
          {MOCK_REVIEWS.map(r => <ReviewCard key={r.id} review={r} />)}
          {/* Duplicate some reviews for visual richness */}
          <ReviewCard review={{...MOCK_REVIEWS[0], id: '3', userName: 'Eleanor H.', comment: 'A breathtaking sunrise and we were the only jeep for miles! The density tracker really works.'}} />
          <ReviewCard review={{...MOCK_REVIEWS[1], id: '4', userName: 'Markus T.', comment: 'Seamless booking and the guide was a true naturalist. Highly recommended for photography enthusiasts.'}} />
        </div>
      </div>
    </div>
  );
};

export default Reviews;

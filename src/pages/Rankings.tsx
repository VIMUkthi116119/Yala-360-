
import React from 'react';
import { DRIVERS, GUIDES } from '../constants';
import { Star, Award, ShieldCheck, TrendingUp } from 'lucide-react';

const PersonnelCard = ({ person, rank }: any) => (
  <div className="bg-white border border-gray-100 p-8 group hover:shadow-2xl transition-all relative overflow-hidden">
    {rank <= 1 && (
      <div className="absolute top-0 right-0 p-2 bg-gold text-white">
        <Award size={20} />
      </div>
    )}
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="relative">
        <img src={person.image} className="w-32 h-32 rounded-full object-cover border-4 border-beige group-hover:border-gold transition-colors" alt="" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
          Rank #{rank + 1}
        </div>
      </div>
      <div className="flex-grow space-y-4 text-center md:text-left">
        <div>
          <h3 className="text-2xl serif">{person.name}</h3>
          <p className="text-gold uppercase tracking-widest text-[10px] font-bold">{person.role} • {person.experience} EXPERIENCE</p>
        </div>
        <div className="flex items-center justify-center md:justify-start space-x-1 text-gold">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill={i < Math.floor(person.rating) ? "currentColor" : "none"} />
          ))}
          <span className="ml-2 text-sm text-gray-500 font-bold">({person.rating.toFixed(1)})</span>
        </div>
        <p className="text-sm text-gray-500 font-light italic leading-relaxed">
          "Expert in tracking leopards in Zone 1. Known for exceptional safety standards and deep park history knowledge."
        </p>
      </div>
      <div className="hidden lg:flex flex-col items-center space-y-2 border-l pl-8 border-gray-100">
        <div className="text-center">
          <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Status</p>
          <div className="flex items-center space-x-2 text-green-600 text-xs font-bold uppercase">
            <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
            <span>Available</span>
          </div>
        </div>
        <div className="pt-4">
          <button className="px-6 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all">
            View Stats
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Rankings: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 lg:px-24 bg-beige min-h-screen">
      <div className="max-w-5xl mx-auto space-y-20">
        <header className="text-center max-w-2xl mx-auto space-y-6">
          <ShieldCheck className="mx-auto text-gold" size={40} />
          <h1 className="text-5xl serif">The Elite Roster</h1>
          <p className="text-gray-500 font-light leading-relaxed">
            Our rankings are updated weekly based on guest satisfaction, wildlife knowledge, and adherence to sustainability protocols. High-ranked profiles are automatically recommended for your bookings.
          </p>
        </header>

        <section className="space-y-12">
          <div className="flex items-center space-x-4 border-b border-gold/20 pb-4">
            <TrendingUp className="text-gold" size={24} />
            <h2 className="text-3xl serif">Top Drivers</h2>
          </div>
          <div className="grid gap-8">
            {DRIVERS.sort((a,b) => b.rating - a.rating).map((d, i) => (
              <PersonnelCard key={d.id} person={d} rank={i} />
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <div className="flex items-center space-x-4 border-b border-gold/20 pb-4">
            <ShieldCheck className="text-gold" size={24} />
            <h2 className="text-3xl serif">Top Naturalist Guides</h2>
          </div>
          <div className="grid gap-8">
            {GUIDES.sort((a,b) => b.rating - a.rating).map((g, i) => (
              <PersonnelCard key={g.id} person={g} rank={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Rankings;


import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Calendar, Camera, Star, ShieldCheck, Leaf, Users } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc, link }: any) => (
  <Link to={link} className="group bg-white p-10 flex flex-col items-center text-center space-y-4 hover:shadow-2xl transition-all border-b-4 border-transparent hover:border-gold">
    <div className="w-16 h-16 bg-beige rounded-full flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
      <Icon size={32} strokeWidth={1.5} />
    </div>
    <h3 className="text-xl serif font-bold group-hover:text-gold">{title}</h3>
    <p className="text-sm font-light text-gray-600 leading-relaxed">{desc}</p>
  </Link>
);

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/yalahero/1920/1080" 
            alt="Yala Wildlife" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-5xl md:text-8xl serif mb-6 animate-fadeIn">Wildly Elegant.</h1>
          <p className="text-lg md:text-2xl font-light mb-12 tracking-widest uppercase italic">The Ultimate Luxury Safari Experience in Yala</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/booking" className="px-10 py-4 bg-gold text-white font-bold uppercase tracking-widest hover:bg-white hover:text-gold transition-all">
              Book Your Safari
            </Link>
            <Link to="/about" className="px-10 py-4 border-2 border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Explore Park
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-[1px] h-20 bg-white/50 mx-auto"></div>
        </div>
      </section>

      {/* Primary Goal Statement */}
      <section className="bg-beige py-24 px-6 lg:px-24 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <span className="text-gold font-bold uppercase tracking-widest text-xs">A Sustainable Vision</span>
          <h2 className="text-4xl md:text-5xl serif leading-tight">Reducing overcrowding while enhancing the safari experience.</h2>
          <div className="w-24 h-[2px] bg-gold mx-auto"></div>
          <p className="text-gray-600 font-light leading-loose text-lg">
            YALA360 is more than just a booking engine. It's a crowd-aware intelligence platform designed to protect the delicate ecosystem of Yala National Park while ensuring your journey remains private, serene, and truly exclusive.
          </p>
        </div>
      </section>

      {/* Feature Widgets */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        <FeatureCard 
          icon={Calendar} 
          title="Smart Booking" 
          desc="AI-driven scheduling that visualizes crowd density for an undisturbed journey." 
          link="/booking"
        />
        <FeatureCard 
          icon={Compass} 
          title="Sightings Map" 
          desc="Real-time wildlife tracking and points of interest across the vast park zones." 
          link="/map"
        />
        <FeatureCard 
          icon={Camera} 
          title="Guest Gallery" 
          desc="A visual tapestry of wildlife moments shared by our luxury safari community." 
          link="/gallery"
        />
        <FeatureCard 
          icon={Star} 
          title="Elite Rankings" 
          desc="Hand-picked guides and drivers ranked by performance and guest reviews." 
          link="/rankings"
        />
      </section>

      {/* Why YALA360 - Checkerboard */}
      <section className="py-24 bg-white px-6 lg:px-24">
        <div className="flex flex-col space-y-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 checkerboard-row">
            <div className="h-[500px] overflow-hidden">
              <img src="https://picsum.photos/seed/eco1/800/800" className="w-full h-full object-cover" alt="Eco Safari" />
            </div>
            <div className="bg-beige p-12 lg:p-24 flex flex-col justify-center space-y-6">
              <Leaf className="text-gold" size={40} strokeWidth={1} />
              <h3 className="text-4xl serif">Eco-Friendly Tourism</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                We partner with operators who prioritize carbon-neutral practices and wildlife-first driving protocols. Every booking supports Yala's conservation efforts.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 checkerboard-row flex-row-reverse">
            <div className="h-[500px] overflow-hidden">
              <img src="https://picsum.photos/seed/crowd1/800/800" className="w-full h-full object-cover" alt="Crowd Aware" />
            </div>
            <div className="bg-[#1A1A1A] text-white p-12 lg:p-24 flex flex-col justify-center space-y-6">
              <ShieldCheck className="text-gold" size={40} strokeWidth={1} />
              <h3 className="text-4xl serif">Crowd-Aware Planning</h3>
              <p className="text-gray-300 font-light leading-relaxed">
                Our proprietary algorithm analyzes historical and real-time jeep counts to suggest slots with the lowest human footprint, giving you a front-row seat to nature.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 checkerboard-row">
            <div className="h-[500px] overflow-hidden">
              <img src="https://picsum.photos/seed/guide3/800/800" className="w-full h-full object-cover" alt="Trusted Guides" />
            </div>
            <div className="bg-white p-12 lg:p-24 flex flex-col justify-center space-y-6 border border-gray-100">
              <Users className="text-gold" size={40} strokeWidth={1} />
              <h3 className="text-4xl serif">Trusted Guides & Drivers</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Only the top-rated professionals make it onto our platform. Experience deep local knowledge and unparalleled safety standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

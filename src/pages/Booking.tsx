
import React, { useState, useEffect } from 'react';
// Corrected SafariType import to come from types.ts instead of constants.tsx
import { DRIVERS, GUIDES, TIME_SLOTS, CROWD_DENSITY_MOCK } from '../constants';
import { SafariType } from '../types';
import { Calendar as CalendarIcon, Users, Car, CheckCircle, ChevronRight, ChevronLeft, CreditCard } from 'lucide-react';

const Booking: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: SafariType.MORNING,
    date: new Date().toISOString().split('T')[0],
    timeSlot: '',
    visitors: 1,
    jeeps: 1,
    driverId: '',
    guideId: '',
    paymentMethod: 'online',
    firstName: '',
    lastName: '',
    email: ''
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 7));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // Step 1: Select Safari Type
  const Step1 = () => (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl serif text-center mb-12">Step 1: Choose Your Journey</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.values(SafariType).map(type => (
          <div 
            key={type}
            onClick={() => { setFormData({...formData, type}); nextStep(); }}
            className={`cursor-pointer p-8 border-2 transition-all text-center space-y-4 hover:shadow-xl ${formData.type === type ? 'border-gold bg-white' : 'border-gray-200 bg-gray-50'}`}
          >
            <h3 className="text-xl serif uppercase font-bold text-gold">{type}</h3>
            <p className="text-sm text-gray-500 font-light">
              {type === SafariType.MORNING ? 'Best for leopard sightings and fresh air.' : 
               type === SafariType.EVENING ? 'Ideal for golden hour photography.' : 
               'A full immersive experience into the wild.'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 2 & 3: Date & Time (Crowd-Aware)
  const Step2And3 = () => (
    <div className="space-y-12 animate-fadeIn">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 space-y-6">
          <h3 className="text-xl serif">Select Date</h3>
          <input 
            type="date" 
            min={new Date().toISOString().split('T')[0]}
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="w-full p-4 border border-gold bg-white serif focus:outline-none"
          />
          <p className="text-xs text-gray-500 italic">Bookings only available for the next 3 days for accurate crowd tracking.</p>
        </div>
        <div className="flex-1 space-y-6">
          <h3 className="text-xl serif">Available Slots (Crowd Density)</h3>
          <div className="space-y-4">
            {TIME_SLOTS[formData.type].map(slot => {
              const density = CROWD_DENSITY_MOCK(formData.date, slot);
              const color = density === 'LOW' ? 'bg-green-500' : density === 'MEDIUM' ? 'bg-gold' : 'bg-red-500';
              return (
                <div 
                  key={slot}
                  onClick={() => setFormData({...formData, timeSlot: slot})}
                  className={`flex items-center justify-between p-4 border cursor-pointer hover:bg-white transition-all ${formData.timeSlot === slot ? 'border-gold ring-1 ring-gold' : 'border-gray-200'}`}
                >
                  <span className="serif font-bold">{slot}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-70">{density} DENSITY</span>
                    <div className={`w-3 h-3 rounded-full ${color}`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // Step 4: Visitor Details
  const Step4 = () => (
    <div className="max-w-xl mx-auto space-y-10 animate-fadeIn">
      <h2 className="text-3xl serif text-center">Guest & Jeep Details</h2>
      <div className="space-y-8">
        <div className="flex items-center justify-between bg-white p-6 border border-gray-100">
          <div className="flex items-center space-x-4">
            <Users className="text-gold" />
            <span className="serif text-lg">Number of Visitors</span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setFormData({...formData, visitors: Math.max(1, formData.visitors-1)})} className="w-10 h-10 border border-gold text-gold">-</button>
            <span className="text-xl font-bold">{formData.visitors}</span>
            <button onClick={() => setFormData({...formData, visitors: formData.visitors+1})} className="w-10 h-10 border border-gold text-gold">+</button>
          </div>
        </div>
        <div className="flex items-center justify-between bg-white p-6 border border-gray-100">
          <div className="flex items-center space-x-4">
            <Car className="text-gold" />
            <span className="serif text-lg">Jeep Count</span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setFormData({...formData, jeeps: Math.max(1, formData.jeeps-1)})} className="w-10 h-10 border border-gold text-gold">-</button>
            <span className="text-xl font-bold">{formData.jeeps}</span>
            <button onClick={() => setFormData({...formData, jeeps: formData.jeeps+1})} className="w-10 h-10 border border-gold text-gold">+</button>
          </div>
        </div>
        <div className="space-y-4">
          <input 
            type="text" placeholder="First Name" 
            className="w-full p-4 border border-gray-200 focus:border-gold outline-none" 
            onChange={e => setFormData({...formData, firstName: e.target.value})}
          />
          <input 
            type="email" placeholder="Email Address" 
            className="w-full p-4 border border-gray-200 focus:border-gold outline-none" 
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
      </div>
    </div>
  );

  // Step 5: Personnel Selection
  const Step5 = () => (
    <div className="space-y-12 animate-fadeIn">
      <h2 className="text-3xl serif text-center">Choose Your Elite Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h4 className="text-gold uppercase tracking-widest font-bold text-sm">Select Driver</h4>
          <div className="grid gap-4">
            {DRIVERS.map(driver => (
              <div 
                key={driver.id} 
                onClick={() => setFormData({...formData, driverId: driver.id})}
                className={`p-4 bg-white border cursor-pointer flex items-center space-x-4 hover:border-gold transition-all ${formData.driverId === driver.id ? 'border-gold shadow-md' : 'border-gray-100'}`}
              >
                <img src={driver.image} className="w-16 h-16 rounded-full object-cover" alt="" />
                <div>
                  <p className="font-bold serif">{driver.name}</p>
                  <p className="text-xs text-gray-500">{driver.rating} ★ | {driver.experience} Exp</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="text-gold uppercase tracking-widest font-bold text-sm">Select Guide</h4>
          <div className="grid gap-4">
            {GUIDES.map(guide => (
              <div 
                key={guide.id} 
                onClick={() => setFormData({...formData, guideId: guide.id})}
                className={`p-4 bg-white border cursor-pointer flex items-center space-x-4 hover:border-gold transition-all ${formData.guideId === guide.id ? 'border-gold shadow-md' : 'border-gray-100'}`}
              >
                <img src={guide.image} className="w-16 h-16 rounded-full object-cover" alt="" />
                <div>
                  <p className="font-bold serif">{guide.name}</p>
                  <p className="text-xs text-gray-500">{guide.rating} ★ | {guide.experience} Exp</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Step 6: Payment
  const Step6 = () => (
    <div className="max-w-xl mx-auto space-y-12 animate-fadeIn">
      <h2 className="text-3xl serif text-center">Finalize Payment</h2>
      <div className="bg-white p-8 border border-gray-100 space-y-6">
        <div 
          onClick={() => setFormData({...formData, paymentMethod: 'online'})}
          className={`p-6 border flex items-center justify-between cursor-pointer ${formData.paymentMethod === 'online' ? 'border-gold' : 'border-gray-200'}`}
        >
          <div className="flex items-center space-x-4">
            <CreditCard className="text-gold" />
            <span className="font-bold">Online Payment (Credit/Debit)</span>
          </div>
          {formData.paymentMethod === 'online' && <CheckCircle className="text-gold" size={20} />}
        </div>
        <div 
          onClick={() => setFormData({...formData, paymentMethod: 'site'})}
          className={`p-6 border flex items-center justify-between cursor-pointer ${formData.paymentMethod === 'site' ? 'border-gold' : 'border-gray-200'}`}
        >
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6 border-2 border-gold rounded-full flex items-center justify-center text-[10px] font-bold text-gold">$$</div>
            <span className="font-bold">Pay on Site</span>
          </div>
          {formData.paymentMethod === 'site' && <CheckCircle className="text-gold" size={20} />}
        </div>
      </div>
    </div>
  );

  // Step 7: Confirmation
  const Step7 = () => (
    <div className="text-center space-y-8 animate-fadeIn py-20">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle size={64} />
      </div>
      <h2 className="text-4xl serif">Reservation Confirmed</h2>
      <p className="text-gray-500 italic">Your wild journey begins soon, {formData.firstName}.</p>
      
      <div className="bg-white max-w-md mx-auto p-10 border border-gray-100 text-left space-y-4 shadow-xl">
        <div className="flex justify-between border-b pb-2 text-sm">
          <span className="text-gray-400">Booking ID</span>
          <span className="font-bold">Y360-{(Math.random()*10000).toFixed(0)}</span>
        </div>
        <div className="flex justify-between border-b pb-2 text-sm">
          <span className="text-gray-400">Type</span>
          <span className="font-bold">{formData.type}</span>
        </div>
        <div className="flex justify-between border-b pb-2 text-sm">
          <span className="text-gray-400">Date & Time</span>
          <span className="font-bold">{formData.date} at {formData.timeSlot}</span>
        </div>
        <div className="flex justify-between border-b pb-2 text-sm">
          <span className="text-gray-400">Total Jeeps</span>
          <span className="font-bold">{formData.jeeps}</span>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4 pt-10">
        <button onClick={() => window.print()} className="px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-all uppercase tracking-widest text-xs font-bold">Print Receipt</button>
        <button onClick={() => window.location.href = '#/'} className="px-8 py-3 bg-black text-white hover:bg-gold transition-all uppercase tracking-widest text-xs font-bold">Back to Home</button>
      </div>
    </div>
  );

  return (
    <div className="pt-32 pb-24 px-6 lg:px-24 bg-beige min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        {step < 7 && (
          <div className="flex justify-between mb-16 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -z-10"></div>
            {[1,2,3,4,5,6].map(s => (
              <div 
                key={s} 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s ? 'bg-gold text-white' : 'bg-gray-100 text-gray-400'}`}
              >
                {s}
              </div>
            ))}
          </div>
        )}

        <div className="bg-white/40 p-12 lg:p-20 shadow-sm border border-white">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2And3 />}
          {step === 3 && <Step2And3 />}
          {step === 4 && <Step4 />}
          {step === 5 && <Step5 />}
          {step === 6 && <Step6 />}
          {step === 7 && <Step7 />}

          {/* Navigation Buttons */}
          {step < 7 && (
            <div className="mt-16 flex justify-between">
              {step > 1 ? (
                <button onClick={prevStep} className="flex items-center space-x-2 text-gold uppercase tracking-widest text-xs font-bold hover:scale-105 transition-transform">
                  <ChevronLeft size={16} /> <span>Back</span>
                </button>
              ) : <div></div>}
              
              <button 
                onClick={nextStep} 
                className={`px-12 py-4 bg-gold text-white uppercase tracking-widest text-xs font-bold hover:bg-black transition-all flex items-center space-x-2`}
              >
                <span>{step === 6 ? 'Pay & Confirm' : 'Next Step'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;

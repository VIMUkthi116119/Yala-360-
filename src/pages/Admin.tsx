
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { LayoutDashboard, Users, MapPin, Camera, Settings, Bell, Search } from 'lucide-react';

const Admin: React.FC = () => {
  const chartData = [
    { name: 'Mon', jeeps: 45, tourists: 120 },
    { name: 'Tue', jeeps: 38, tourists: 105 },
    { name: 'Wed', jeeps: 55, tourists: 150 },
    { name: 'Thu', jeeps: 40, tourists: 115 },
    { name: 'Fri', jeeps: 60, tourists: 180 },
    { name: 'Sat', jeeps: 85, tourists: 250 },
    { name: 'Sun', jeeps: 70, tourists: 210 },
  ];

  const recentBookings = [
    { id: 'BK104', guest: 'Amanda R.', type: 'Morning', jeeps: 2, status: 'Confirmed' },
    { id: 'BK105', guest: 'Robert P.', type: 'Evening', jeeps: 1, status: 'Confirmed' },
    { id: 'BK106', guest: 'Miku S.', type: 'Full Day', jeeps: 3, status: 'Pending' },
  ];

  return (
    <div className="flex min-h-screen pt-20">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col p-6 space-y-10">
        <div className="serif text-2xl tracking-widest text-gold text-center">ADMIN PORTAL</div>
        <nav className="space-y-2">
          <button className="w-full flex items-center space-x-3 p-3 bg-beige text-gold font-bold text-xs uppercase tracking-widest">
            <LayoutDashboard size={18} /> <span>Dashboard</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-gold">
            <Users size={18} /> <span>Bookings</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-gold">
            <MapPin size={18} /> <span>Sightings</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-gold">
            <Camera size={18} /> <span>Gallery Mod</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-gold">
            <Settings size={18} /> <span>Settings</span>
          </button>
        </nav>
      </aside>

      {/* Admin Content */}
      <main className="flex-grow bg-beige/30 p-8 lg:p-12 space-y-12 overflow-y-auto">
        <header className="flex justify-between items-center">
          <div className="relative w-96">
            <input type="text" placeholder="Search bookings, guests, IDs..." className="w-full p-3 bg-white border border-gray-200 outline-none pl-10 text-sm" />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={16} />
          </div>
          <div className="flex items-center space-x-6">
            <Bell className="text-gray-400 cursor-pointer hover:text-gold" />
            <div className="flex items-center space-x-2">
              <img src="https://picsum.photos/seed/admin/100/100" className="w-10 h-10 rounded-full" alt="" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest">Admin User</p>
                <p className="text-[10px] text-gray-400 uppercase">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 border-b-4 border-gold shadow-sm">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Total Bookings Today</p>
            <p className="text-4xl serif">24</p>
            <p className="text-[10px] text-green-600 mt-2 font-bold">+12% from yesterday</p>
          </div>
          <div className="bg-white p-8 border-b-4 border-gold shadow-sm">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Active Jeeps</p>
            <p className="text-4xl serif">18</p>
            <p className="text-[10px] text-gray-500 mt-2 font-bold">Capacity: 35/slot</p>
          </div>
          <div className="bg-white p-8 border-b-4 border-gold shadow-sm">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Sighting Reports</p>
            <p className="text-4xl serif">7</p>
            <p className="text-[10px] text-gold mt-2 font-bold">High animal activity</p>
          </div>
          <div className="bg-white p-8 border-b-4 border-gold shadow-sm">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Revenue (USD)</p>
            <p className="text-4xl serif">$3,420</p>
            <p className="text-[10px] text-green-600 mt-2 font-bold">Payouts pending</p>
          </div>
        </div>

        {/* Charts & Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 shadow-sm space-y-8">
            <h3 className="text-xl serif">Crowd Density Analytics</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: '#F5F1E9'}} />
                  <Bar dataKey="jeeps" fill="#C5A059" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="tourists" fill="#1A1A1A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-8 shadow-sm space-y-8">
            <h3 className="text-xl serif">Recent Bookings</h3>
            <div className="space-y-4">
              {recentBookings.map(bk => (
                <div key={bk.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-bold serif">{bk.guest}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{bk.id} • {bk.type}</p>
                  </div>
                  <div className={`px-2 py-1 text-[8px] uppercase font-bold rounded-full ${bk.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-gold/20 text-gold'}`}>
                    {bk.status}
                  </div>
                </div>
              ))}
              <button className="w-full py-3 text-xs uppercase font-bold text-gold tracking-widest border border-gold hover:bg-gold hover:text-white transition-all">
                View All Bookings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;

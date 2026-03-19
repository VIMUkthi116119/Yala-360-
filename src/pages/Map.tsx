import React, { useState, useEffect } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { rtdb as db } from '../firebase'; // RTDB Firebase reference
import '../components/map/App.css';
import '../components/map/map-index.css';

// @ts-expect-error - JSX component
import YalaMap from '../components/map/YalaMap';
// @ts-expect-error - JSX component
import RightSidePanel from '../components/map/RightSidePanel';
// @ts-expect-error - JSX component
import SightingTimeline from '../components/map/SightingTimeline';
// @ts-expect-error - JSX component
import WildlifeGallery from '../components/map/WildlifeGallery';
// @ts-expect-error - JSX component
import MapFilters from '../components/map/MapFilters';
// @ts-expect-error - JSX component
import PredictionPanel from '../components/map/PredictionPanel';
// @ts-expect-error - JSX component
import BestRoute from '../components/map/BestRoute';
// @ts-expect-error - JSX component
import EventsGrid from '../components/map/EventsGrid';

const MapPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(['sightings']);
  const [blockTraffic, setBlockTraffic] = useState<any>({});
  const [leopardHotspots, setLeopardHotspots] = useState<any[]>([]);
  const [sightings, setSightings] = useState<any[]>([]);
  const [hideUI, setHideUI] = useState(false);

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) => {
      const isCurrentlyActive = prev.includes(filterId);
      return isCurrentlyActive
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId];
    });
  };

  // Listen to Firebase sightings in real-time
  useEffect(() => {
    const sightingsRef = ref(db, 'sightings');
    const unsubscribe = onValue(sightingsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setSightings([]);
        return;
      }

      const now = Date.now();
      const validSightings: any[] = [];
      const EXPIRY_TIME = 90 * 60 * 1000; // 1.5 hours

      Object.entries(data).forEach(([id, sighting]: [string, any]) => {
        const age = now - sighting.time;
        if (age > EXPIRY_TIME) {
          remove(ref(db, `sightings/${id}`));
        } else {
          validSightings.push({
            ...sighting,
            id,
            isNew: age < 30000,
          });
        }
      });

      setSightings(validSightings);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    document.body.classList.toggle('hide-ui', hideUI);
  }, [hideUI]);

  useEffect(() => {
    document.body.classList.toggle('ranger-mode-active', activeFilters.includes('ranger-mode'));
  }, [activeFilters]);

  // Clean-up classes on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('dark', 'hide-ui', 'ranger-mode-active');
    };
  }, []);

  return (
    <>
      <div className="map-scope pt-24 pb-8 bg-beige dark:bg-gray-900 transition-colors duration-300">
        <header className="page-header text-center mt-8">
          <h1 className="text-4xl md:text-5xl serif mb-4 dark:text-white">Interactive Wilderness</h1>
          <p className="text-gray-500 dark:text-gray-400 font-light italic max-w-2xl mx-auto px-4">
            Explore Yala's heartbeat through real-time data and historical landmarks.
          </p>
          
          <div className="mt-6 flex justify-center">
            <button 
              className="p-2 rounded-full border border-gold/50 bg-white/50 hover:bg-gold hover:text-white transition-all dark:bg-gray-800 dark:text-gold dark:border-gold/30 shadow-sm flex items-center gap-2 px-4 text-sm font-semibold uppercase tracking-wider" 
              onClick={() => setIsDarkMode(prev => !prev)}
            >
              <i className={isDarkMode ? "ph ph-sun text-lg" : "ph ph-moon text-lg"}></i>
              {isDarkMode ? 'Light Map Mode' : 'Dark Map Mode'}
            </button>
          </div>
        </header>

        <main className="map-container relative mx-auto max-w-[1920px] overflow-hidden rounded-xl border border-gold/20 shadow-2xl mt-8 mx-4 lg:mx-12" style={{height: '75vh', minHeight: '600px'}}>
          <div className="sidebar-container absolute top-4 left-4 z-[400]">
            <MapFilters activeFilters={activeFilters} toggleFilter={toggleFilter} hideUI={hideUI} setHideUI={setHideUI} />
          </div>

          {!hideUI && <RightSidePanel />}
          
          <YalaMap 
            isDarkMode={isDarkMode} 
            jeeps={[]} 
            sightings={sightings} 
            activeFilters={activeFilters} 
            blockTraffic={blockTraffic} 
            leopardHotspots={leopardHotspots} 
          />
        </main>

        <div className="max-w-[1920px] mx-auto px-4 lg:px-12 mt-8">
          <div id="sighting-history" className="timeline-container flex flex-col xl:flex-row gap-8">
            <div className="flex-1 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 overflow-hidden">
                <SightingTimeline sightings={sightings} />
            </div>
            <aside className="analytics-sidebar flex-shrink-0 w-full xl:w-[400px] flex flex-col gap-8">
              <BestRoute blockTraffic={blockTraffic} />
              <PredictionPanel blockTraffic={blockTraffic} />
            </aside>
          </div>
        </div>

        <div className="max-w-[1920px] mx-auto px-4 lg:px-12 pb-24 mt-8 space-y-8">
          <EventsGrid />
          <WildlifeGallery />
        </div>
      </div>
    </>
  );
};

export default MapPage;

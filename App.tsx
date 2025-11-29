import React, { useState, useEffect } from 'react';
import { MONTH_NAMES, EVENTS_DATA, toMarathiDigits } from './constants';
import { CalendarGrid } from './components/CalendarGrid';
import { EventSheet } from './components/EventSheet';
import { DayData } from './types';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

const App: React.FC = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

  // Initialize with current date if it's 2026, otherwise default to Jan 2026
  useEffect(() => {
    const today = new Date();
    // If user opens the app in 2026, start at current month
    if (today.getFullYear() === 2026) {
      setCurrentMonthIndex(today.getMonth());
    }
  }, []);

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonthIndex(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonthIndex(prev => prev + 1);
    }
  };

  const currentMonth = MONTH_NAMES[currentMonthIndex];

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto bg-[#FFFBF0] shadow-2xl overflow-hidden relative">
      
      {/* Modern Orange Header */}
      <header className="sticky top-0 z-10 bg-orange-600 shadow-md pt-safe-top">
        <div className="px-4 py-3 flex items-center justify-between text-white">
           <div className="flex items-center gap-2">
             <CalendarDays className="w-6 h-6 text-orange-100" />
             <h1 className="text-xl font-bold tracking-wide">माझा कॅलेंडर {toMarathiDigits(currentYear)}</h1>
           </div>
        </div>
        
        {/* Month Navigation Card */}
        <div className="px-2 pb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 flex items-center justify-between border border-white/20">
                <button 
                    onClick={handlePrevMonth}
                    className="p-2 rounded-full hover:bg-white/20 active:bg-white/30 text-white transition-all"
                >
                    <ChevronLeft className="w-7 h-7" />
                </button>

                <div className="text-center flex flex-col items-center animate-in fade-in zoom-in duration-300 key={currentMonthIndex}">
                    <h2 className="text-2xl font-bold text-white drop-shadow-sm">
                        {currentMonth.name}
                    </h2>
                    <span className="text-xs font-semibold text-orange-100 uppercase tracking-widest opacity-90">
                        {currentMonth.marathiName}
                    </span>
                </div>

                <button 
                    onClick={handleNextMonth}
                    className="p-2 rounded-full hover:bg-white/20 active:bg-white/30 text-white transition-all"
                >
                    <ChevronRight className="w-7 h-7" />
                </button>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <CalendarGrid 
            monthIndex={currentMonthIndex} 
            year={currentYear}
            onDayClick={setSelectedDay}
        />

        {/* Modern Festival List */}
        <div className="p-4 space-y-4 pb-24">
           <h3 className="font-bold text-slate-800 flex items-center gap-2">
             <span className="w-1 h-5 bg-orange-500 rounded-full"></span>
             विशेष सण व उत्सव (Upcoming Festivals)
           </h3>
           
           <div className="grid gap-3">
              {Object.entries(EVENTS_DATA)
                .filter(([key]) => {
                  // Only show events if we are in 2026, as the data is specific to 2026
                  if (currentYear !== 2026) return false;
                  return key.startsWith(`${currentMonthIndex}-`);
                })
                .sort((a, b) => {
                    const dayA = parseInt(a[0].split('-')[1]);
                    const dayB = parseInt(b[0].split('-')[1]);
                    return dayA - dayB;
                })
                .map(([key, val]) => {
                    const day = key.split('-')[1];
                    return (
                        <div key={key} className={`flex items-center gap-4 p-3 rounded-xl border shadow-sm ${val.isHoliday ? 'bg-white border-red-100' : 'bg-white border-slate-100'}`}>
                            <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg font-bold ${val.isHoliday ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
                                <span className="text-lg leading-none">{toMarathiDigits(day)}</span>
                            </div>
                            <div>
                                <h4 className={`font-semibold ${val.isHoliday ? 'text-red-700' : 'text-slate-800'}`}>{val.title}</h4>
                                <p className="text-xs text-gray-500">{currentMonth.name} {toMarathiDigits(currentYear)}</p>
                            </div>
                        </div>
                    );
                })}
              
              {(currentYear !== 2026 || Object.entries(EVENTS_DATA).filter(([key]) => key.startsWith(`${currentMonthIndex}-`)).length === 0) && (
                  <div className="text-center py-8 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
                      {currentYear === 2026 
                        ? 'या महिन्यात विशेष सण नाहीत' 
                        : `२०२६ सालची माहिती उपलब्ध आहे (Viewing ${currentYear})`
                      }
                  </div>
              )}
           </div>
        </div>
      </main>

      {/* Detail View Modal */}
      {selectedDay && (
        <EventSheet 
            dayData={selectedDay} 
            monthName={currentMonth.name}
            onClose={() => setSelectedDay(null)} 
        />
      )}
    </div>
  );
};

export default App;

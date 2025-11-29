import React from 'react';
import { CalendarEvent, DayData } from '../types';
import { X } from 'lucide-react';
import { toMarathiDigits } from '../constants';

interface EventSheetProps {
  dayData: DayData | null;
  onClose: () => void;
  monthName: string;
}

export const EventSheet: React.FC<EventSheetProps> = ({ dayData, onClose, monthName }) => {
  if (!dayData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="w-full max-w-md bg-[#FFFBF0] rounded-t-3xl shadow-2xl p-6 pb-10 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 border-b border-orange-100 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              {toMarathiDigits(dayData.date)} {monthName}
            </h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">{toMarathiDigits(dayData.year)} ({dayData.year})</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-orange-100 hover:bg-orange-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-orange-900" />
          </button>
        </div>

        <div className="space-y-4">
          {dayData.events.length > 0 ? (
            dayData.events.map((event, idx) => (
              <div 
                key={idx} 
                className={`p-5 rounded-2xl border-l-4 shadow-sm ${
                  event.isHoliday 
                    ? 'bg-red-50 border-red-500 text-red-900' 
                    : 'bg-orange-50 border-orange-500 text-orange-900'
                }`}
              >
                <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${event.isHoliday ? 'bg-red-200 text-red-800' : 'bg-orange-200 text-orange-800'}`}>
                      {event.isHoliday ? 'सुट्टी' : 'विशेष'}
                    </span>
                </div>
                <h3 className="text-xl font-bold mt-2">{event.title}</h3>
                {event.description && <p className="mt-2 text-sm opacity-80">{event.description}</p>}
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-lg font-medium">आज विशेष काही नाही</p>
              <p className="text-xs mt-1">(No special events)</p>
            </div>
          )}
        </div>
        
        <div className="mt-8">
            <button 
                onClick={onClose} 
                className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl active:scale-95 transition-transform"
            >
                बंद करा
            </button>
        </div>
      </div>
    </div>
  );
};

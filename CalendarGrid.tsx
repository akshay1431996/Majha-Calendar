import React from 'react';
import { MONTH_NAMES, WEEKDAYS, getEventForDay, toMarathiDigits, getMarathiMonthName } from '../constants';
import { DayData } from '../types';

interface CalendarGridProps {
  monthIndex: number;
  year: number;
  onDayClick: (data: DayData) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ monthIndex, year, onDayClick }) => {
  // Calculate dynamic calendar details
  const firstDayOfMonth = new Date(year, monthIndex, 1).getDay(); // 0 (Sun) - 6 (Sat)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  
  // Calculate grid cells
  const totalSlots = 42; // 6 rows * 7 columns
  const days: (DayData | null)[] = [];

  // Empty slots before start of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  // Days of the month
  const today = new Date();
  const isCurrentMonth = today.getMonth() === monthIndex && today.getFullYear() === year;

  for (let d = 1; d <= daysInMonth; d++) {
    const event = getEventForDay(monthIndex, d, year);
    const events = event ? [event] : [];
    
    // Determine weekday: (firstDayOfMonth + date - 1) % 7
    const dayOfWeek = (firstDayOfMonth + d - 1) % 7;

    days.push({
      date: d,
      month: monthIndex,
      year: year,
      dayOfWeek: dayOfWeek,
      events: events,
      isToday: isCurrentMonth && today.getDate() === d
    });
  }

  // Remaining empty slots
  while (days.length < totalSlots) {
    days.push(null);
  }

  // Split into weeks for rendering
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // Filter out completely empty last row if it exists
  const visibleWeeks = weeks.filter(week => week.some(day => day !== null));

  return (
    <div className="w-full bg-white shadow-sm pb-2">
        {/* Header Days Row */}
        <div className="grid grid-cols-7 border-b border-gray-100 mb-2">
            {WEEKDAYS.map((day, idx) => (
                <div key={idx} className={`text-center py-3 font-bold text-sm ${day.color}`}>
                    {day.mr}
                </div>
            ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex flex-col px-1">
            {visibleWeeks.map((week, wIdx) => (
                <div key={wIdx} className="grid grid-cols-7 mb-1">
                    {week.map((day, dIdx) => {
                        if (!day) return <div key={dIdx} className=""></div>;

                        const isSunday = dIdx === 0;
                        const hasHoliday = day.events.some(e => e.isHoliday);
                        const isRed = isSunday || hasHoliday;
                        const marathiMonthName = getMarathiMonthName(monthIndex, day.date, year);

                        return (
                            <div 
                                key={dIdx} 
                                onClick={() => onDayClick(day)}
                                className={`
                                    relative aspect-[4/5] mx-0.5 rounded-lg flex flex-col items-center justify-between py-1.5
                                    active:scale-95 transition-transform cursor-pointer
                                    ${day.isToday ? 'bg-orange-100 ring-1 ring-orange-300' : 'bg-slate-50 hover:bg-slate-100'}
                                    ${isRed && !day.isToday ? 'bg-red-50/50' : ''}
                                `}
                            >
                                {/* Top: Date Number */}
                                <span className={`text-xl font-bold -mb-1 ${isRed ? 'text-red-600' : 'text-slate-800'}`}>
                                    {toMarathiDigits(day.date)}
                                </span>

                                {/* Middle: Marathi Month Name */}
                                {marathiMonthName && (
                                    <span className="text-[10px] text-slate-500 font-medium">
                                        {marathiMonthName}
                                    </span>
                                )}

                                {/* Bottom: Event Dot or Text */}
                                {day.events.length > 0 ? (
                                    <div className="w-full px-0.5">
                                         <p className={`text-[8px] text-center leading-[1.1] line-clamp-1 font-medium ${isRed ? 'text-red-700' : 'text-slate-600'}`}>
                                            {day.events[0].title.split(' / ')[0]}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="h-[8px]"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    </div>
  );
};

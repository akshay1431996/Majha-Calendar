export interface CalendarEvent {
  title: string;
  isHoliday: boolean;
  description?: string;
}

export interface DayData {
  date: number; // 1-31
  month: number; // 0-11
  year: number;
  dayOfWeek: number; // 0 (Sun) - 6 (Sat)
  events: CalendarEvent[];
  isToday: boolean;
}

export interface MonthInfo {
  name: string;
  marathiName: string; // e.g., Paush-Magh
}

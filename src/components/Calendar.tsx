import React, { useEffect, useMemo, useState } from 'react';
import Week from './Week';
import { daysData, eventsData } from '../data';
import useLocalStorage from '../hooks/useLocalStorage';
import { deepEqual } from '../utils';
import Month from './Month';
import useHolidays from '../hooks/useHolidays';
import BackIcon from './icons/BackIcon';

const Calendar: React.FC = () => {
   const [currentProfile, setCurrentProfile] = useState('profile_serega');
   const [selectedWeek, setSelectedWeek] = useState<Day[] | null>(null);
   const [days, setDays] = useLocalStorage<Day[]>(`calendarDays_${currentProfile}`, daysData);
   const [events, setEvents] = useLocalStorage<DayEvent[]>(
      `calendarEvents_${currentProfile}`,
      eventsData,
   );
   const { holidays, isLoading } = useHolidays(new Date().getFullYear());

   const updatedDays = useMemo(() => {
      return days.map((day) => ({
         ...day,
         isDayOff: holidays.includes(day.date),
         events: events.filter((event) => event.date === day.date),
      }));
   }, [holidays, events, days]);

   useEffect(() => {
      if (!deepEqual(days, updatedDays)) {
         setDays(updatedDays);
      }
   }, [updatedDays, days, setDays]);

   useEffect(() => {
      const storedDays = localStorage.getItem(`calendarDays_${currentProfile}`);
      const storedEvents = localStorage.getItem(`calendarEvents_${currentProfile}`);
      setDays(storedDays ? JSON.parse(storedDays) : daysData);
      setEvents(storedEvents ? JSON.parse(storedEvents) : eventsData);
   }, [currentProfile]);

   if (isLoading) {
      return (
         <div className="skeleton">
            <div className="skeleton__content">Загрузка...</div>
         </div>
      );
   }

   const handleDayClick = (day: Day) => {
      const dayIndexMap: { [key in Day['day']]: number } = {
         '': -1,
         пн: 0,
         вт: 1,
         ср: 2,
         чт: 3,
         пт: 4,
         сб: 5,
         вс: 6,
      };
      const dayIndex = dayIndexMap[day.day];
      const dayIndexInArray = days.findIndex((d) => d.date === day.date);
      const weekStartIndex = dayIndexInArray - dayIndex;
      const weekEndIndex = weekStartIndex + 7;

      // Создаем полную неделю с понедельника по воскресенье
      const fullWeek = [];
      for (let i = weekStartIndex; i < weekEndIndex; i++) {
         if (i >= 0 && i < days.length) {
            fullWeek.push(days[i]);
         } else {
            fullWeek.push({ date: '', day: '' as Day['day'], isDayOff: false });
         }
      }

      setSelectedWeek(deepEqual(fullWeek, selectedWeek) ? null : fullWeek);
   };

   const handleSaveEvent = (updatedEvent: DayEvent) => {
      const newEvents = events.some((event) => event.id === updatedEvent.id)
         ? events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
         : [...events, updatedEvent];
      setEvents(newEvents);
   };

   // Группировка дней по неделям
   const weeks = [];
   let currentWeek = [];
   for (let i = 0; i < days.length; i++) {
      currentWeek.push(days[i]);
      if (currentWeek.length === 7 || i === days.length - 1) {
         weeks.push(currentWeek);
         currentWeek = [];
      }
   }

   return (
      <div className="calendar">
         <div className="calendar__header">
            <div
               className="calendar__header-back"
               onClick={() => setSelectedWeek(null)}
               data-testid="back-button"
            >
               {selectedWeek ? <BackIcon size={30} /> : ''}
            </div>
            <select
               className="calendar__header-switch"
               value={currentProfile}
               onChange={(e) => setCurrentProfile(e.target.value)}
            >
               <option value="profile_serega">Серёга</option>
               <option value="profile_mixa">Миха</option>
            </select>
         </div>
         <div className="calendar__weeks">
            {selectedWeek ? (
               <Week
                  key={selectedWeek[0]?.date || 'empty'}
                  days={selectedWeek}
                  events={events}
                  isSelected={true}
                  onClick={() => setSelectedWeek(null)}
                  onSaveEvent={handleSaveEvent}
               />
            ) : (
               <Month
                  days={days}
                  events={events}
                  onDayClick={handleDayClick}
                  onSaveEvent={handleSaveEvent}
                  name={'Супериюнь'}
               />
            )}
         </div>
      </div>
   );
};

export default Calendar;

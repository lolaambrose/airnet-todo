import React, { useMemo, useState } from 'react';
import Week from './Week';
import { daysData, eventsData } from '../data';
import WeekDays from './WeekDays';
import useLocalStorage from '../hooks/useLocalStorage';
import { deepEqual } from '../utils';
import Month from './Month';

const Calendar: React.FC = () => {
   const [selectedWeek, setSelectedWeek] = useState<Day[] | null>(null);
   const [days] = useLocalStorage<Day[]>('calendarDays', daysData);
   const [events, setEvents] = useLocalStorage<DayEvent[]>('calendarEvents', eventsData);

   useMemo(() => {
      return days.map((day) => ({
         ...day,
         events: events.filter((event) => event.date === day.date),
      }));
   }, [events, days]);

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
         {!selectedWeek && <WeekDays isSelected={selectedWeek !== null} />}
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

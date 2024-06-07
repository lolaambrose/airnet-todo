import React, { useEffect, useState } from 'react';
import Week from './Week';
import { daysData, eventsData } from '../data';
import WeekDays from './WeekDays';
import useLocalStorage from '../hooks/useLocalStorage';
import { deepEqual } from '../utils';

const Calendar: React.FC = () => {
   const [selectedWeek, setSelectedWeek] = useState<Day[] | null>(null);
   const [days, setDays] = useLocalStorage<Day[]>('calendarDays', daysData);
   const [events, setEvents] = useLocalStorage<DayEvent[]>('calendarEvents', eventsData);

   useEffect(() => {
      const updatedDays = days.map((day) => ({
         ...day,
         events: events.filter((event) => event.date === day.date),
      }));
      setDays(updatedDays);
   }, [events, setDays]);

   const handleWeekClick = (week: Day[]) => {
      setSelectedWeek(deepEqual(week, selectedWeek) ? null : week);
   };

   const handleSaveEvent = (updatedEvent: DayEvent) => {
      const newEvents = events.some((event) => event.id === updatedEvent.id)
         ? events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
         : [...events, updatedEvent];
      setEvents(newEvents);
   };

   // Группировка дней по неделям
   const weeks = [];
   for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
   }

   return (
      <div className="calendar">
         {!selectedWeek && <WeekDays isSelected={selectedWeek !== null} />}
         <div className="calendar__weeks">
            {selectedWeek ? (
               <Week
                  key={selectedWeek[0].date}
                  days={selectedWeek}
                  events={events}
                  isSelected={true}
                  onClick={() => setSelectedWeek(null)}
                  onSaveEvent={handleSaveEvent}
               />
            ) : (
               weeks.map((week, index) => (
                  <Week
                     key={index}
                     days={week}
                     events={events}
                     isSelected={false}
                     onClick={() => handleWeekClick(week)}
                     onSaveEvent={handleSaveEvent}
                  />
               ))
            )}
         </div>
      </div>
   );
};

export default Calendar;

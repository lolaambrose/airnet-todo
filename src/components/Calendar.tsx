import React, { useState } from 'react';
import Week from './Week';
import weeksData from '../data';
import WeekDays from './WeekDays';

const Calendar: React.FC = () => {
   const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
   const [weeks, setWeeks] = useState(weeksData);

   const handleWeekClick = (weekNumber: number) => {
      setSelectedWeek(weekNumber === selectedWeek ? null : weekNumber);
   };

   const handleSaveEvent = (updatedEvent: DayEvent) => {
      setWeeks((prevWeeks) => {
         const newWeeks = prevWeeks.map((week) => {
            const newDays = week.days.map((day) => {
               const newEvents = day.events.map((event) =>
                  event.id === updatedEvent.id ? updatedEvent : event,
               );
               return { ...day, events: newEvents };
            });
            return { ...week, days: newDays };
         });
         return newWeeks;
      });
   };

   const weeksToRender = () => {
      if (selectedWeek !== null) {
         return weeks.filter((week) => week.week === selectedWeek);
      }
      return weeks;
   };

   return (
      <div className="calendar">
         {!selectedWeek && <WeekDays isSelected={selectedWeek !== null} />}
         <div className="calendar__weeks">
            {weeksToRender().map((week) => (
               <Week
                  key={week.week}
                  week={week}
                  isSelected={selectedWeek === week.week}
                  onClick={() => handleWeekClick(week.week)}
                  onSaveEvent={handleSaveEvent}
               />
            ))}
         </div>
      </div>
   );
};

export default Calendar;

import React, { useEffect, useState } from 'react';
import Day from './Day';

interface MonthProps {
   days: Day[];
   events: DayEvent[];
   onDayClick: (day: Day) => void;
   onSaveEvent: (updatedEvent: DayEvent) => void;
   name: string;
}

const Month: React.FC<MonthProps> = ({ days, events, onDayClick, onSaveEvent, name }) => {
   const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1300);

   useEffect(() => {
      const handleResize = () => {
         setIsWideScreen(window.innerWidth >= 1300);
      };

      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   const getGridColumnStart = (day: string) => {
      switch (day) {
         case 'пн':
            return 1;
         case 'вт':
            return 2;
         case 'ср':
            return 3;
         case 'чт':
            return 4;
         case 'пт':
            return 5;
         case 'сб':
            return 6;
         case 'вс':
            return 7;
         default:
            return 'auto';
      }
   };

   return (
      <>
         <div className="calendar__month-name">{name}</div>
         <div className="calendar__days calendar__days--compact">
            {days.map((day) => {
               const dayEvents = events.filter((event) => event.date === day.date);
               return (
                  <div
                     key={day.date}
                     style={{
                        gridColumnStart: isWideScreen ? getGridColumnStart(day.day) : 'auto',
                     }}
                     onClick={() => onDayClick(day)}
                  >
                     <Day day={day} events={dayEvents} fullView={false} onSaveEvent={onSaveEvent} />
                  </div>
               );
            })}
         </div>
      </>
   );
};

export default Month;

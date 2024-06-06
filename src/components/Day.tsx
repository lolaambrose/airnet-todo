import React from 'react';
import Event from './Event';

interface DayProps {
   day: {
      num: number;
      day: string;
      events: DayEvent[];
   };
   fullView: boolean;
}

const Day: React.FC<DayProps> = ({ day, fullView }) => {
   return (
      <div
         className={`calendar__day ${fullView ? 'calendar__day--full' : 'calendar__day--compact'}`}
      >
         <div className="calendar__date">
            <p className="calendar__date-num">{day.num}</p>
            {fullView && <p className="calendar__date-day">{day.day}</p>}
         </div>
         <div className={`calendar__events ${fullView ? '' : 'calendar__event--compact'}`}>
            {day.events.map((event, index) => (
               <Event key={index} event={event} fullView={fullView} />
            ))}
         </div>
      </div>
   );
};

export default Day;

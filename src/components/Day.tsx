import React from 'react';
import Event from './Event';

interface DayProps {
   day: Day;
   fullView: boolean;
   onSaveEvent: (updatedEvent: DayEvent) => void;
}

const Day: React.FC<DayProps> = ({ day, fullView, onSaveEvent }) => {
   return (
      <div
         className={`
         calendar__day 
         ${fullView ? 'calendar__day--full' : 'calendar__day--compact'}`}
         style={day.isDayOff ? { backgroundColor: 'pink' } : {}}
      >
         {!fullView && (
            <div
               className={`
               calendar__date 
               ${fullView ? 'calendar__date--full' : 'calendar__date--compact'}`}
            >
               <p className="calendar__date-num">{day.num}</p>
               <p className="calendar__date-day">{day.day}</p>
            </div>
         )}
         <div
            className={`
            calendar__events 
            ${fullView ? 'calendar__events--full' : 'calendar__events--compact'}`}
         >
            {day.events.map((event, index) => (
               <Event key={index} event={event} fullView={fullView} onSave={onSaveEvent} />
            ))}
         </div>
         {!fullView && (
            <div
               className={`
            calendar__day-gradient 
            ${day.isDayOff ? 'calendar__day-gradient--day-off' : ''}`}
            ></div>
         )}
      </div>
   );
};

export default Day;

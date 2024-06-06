import React from 'react';

interface EventProps {
   event: DayEvent;
   fullView: boolean;
}

const Event: React.FC<EventProps> = ({ event, fullView }) => {
   return (
      <div
         className={`
         calendar__event 
         calendar__event--start-${event.start.split(':')[0]} 
         calendar__event--end-${event.end.split(':')[0]} 
         calendar__event--${event.color} 
         ${fullView ? 'calendar__event--full' : 'calendar__event--compact'}`}
      >
         <p className="calendar__event--title">{event.title}</p>
         <p className="calendar__event--time">
            {event.start} - {event.end}
         </p>
      </div>
   );
};

export default Event;

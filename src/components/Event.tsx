import React, { useState } from 'react';
import EventModal from './EventModal';

interface EventProps {
   event: DayEvent;
   fullView: boolean;
   onSave: (updatedEvent: DayEvent) => void;
}

const Event: React.FC<EventProps> = ({ event, fullView, onSave }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const start = event.start.split(':');
   const end = event.end.split(':');

   const handleOpenModal = (e: React.MouseEvent) => {
      console.log('open modal');
      e.stopPropagation();
      e.preventDefault();
      setIsModalOpen(true);
   };

   const handleCloseModal = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsModalOpen(false);
   };

   const isTooShort = parseInt(end[0]) - parseInt(start[0]) <= 1;

   return (
      <>
         <div
            className={`
         calendar__event 
         calendar__event--start-${start[0]} 
         calendar__event--end-${end[0]} 
         calendar__event--${event.color} 
         ${fullView ? 'calendar__event--full' : 'calendar__event--compact'} 
         ${event.isCompleted ? 'calendar__event--completed' : ''}
         `}
            onClick={(e) => {
               if (fullView) {
                  handleOpenModal(e);
               }
            }}
         >
            <p className="calendar__event--title">{event.title}</p>
            {!event.isCompleted && !(isTooShort && fullView) && (
               <p className="calendar__event--time">
                  {event.start} - {event.end}
               </p>
            )}
            {!event.isCompleted && fullView && !isTooShort && (
               <p className="calendar__event--description">{event.description}</p>
            )}
            {fullView && (
               <div
                  className="calendar__event-gradient"
                  style={{
                     background: `linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--${event.color})`,
                  }}
               ></div>
            )}
         </div>
         <EventModal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            event={event}
            onSave={onSave}
         />
      </>
   );
};

export default Event;

import React, { useState } from 'react';
import Event from './Event';
import EventModal from './EventModal';

interface DayProps {
   day: Day;
   fullView: boolean;
   onSaveEvent: (updatedEvent: DayEvent) => void;
   events: DayEvent[];
}

const Day: React.FC<DayProps> = ({ day, fullView, onSaveEvent, events }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedEvent, setSelectedEvent] = useState<DayEvent | null>(null);

   const handleOpenModal = (e: React.MouseEvent) => {
      if (!fullView) return;

      e.stopPropagation();
      e.preventDefault();
      setSelectedEvent({
         id: Date.now(),
         date: day.date,
         title: '',
         start: '08:00',
         end: '09:00',
         color: 'pink',
         isCompleted: false,
         description: '',
      });
      setIsModalOpen(true);
   };

   const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedEvent(null);
   };

   const handleSaveEvent = (updatedEvent: DayEvent) => {
      onSaveEvent(updatedEvent);
      handleCloseModal();
   };

   return (
      <div
         className={`
         calendar__day 
         ${fullView ? 'calendar__day--full' : 'calendar__day--compact'}`}
         style={day.isDayOff ? { backgroundColor: 'pink' } : {}}
         onClick={handleOpenModal}
      >
         {!fullView && (
            <div
               className={`
               calendar__date 
               ${fullView ? 'calendar__date--full' : 'calendar__date--compact'}`}
            >
               <p className="calendar__date-num">{new Date(day.date).getDate()}</p>
               <p className="calendar__date-day">{day.day}</p>
            </div>
         )}
         <div
            className={`
            calendar__events 
            ${fullView ? 'calendar__events--full' : 'calendar__events--compact'}`}
         >
            {events.map((event, index) => (
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
         {isModalOpen && (
            <EventModal
               isOpen={isModalOpen}
               onRequestClose={handleCloseModal}
               event={selectedEvent}
               onSave={handleSaveEvent}
            />
         )}
      </div>
   );
};

export default Day;

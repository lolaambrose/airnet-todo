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

   if (!day.date) return null;

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

   const getGridColumn = (day: string) => {
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
      <div
         className={`
         calendar__day 
         ${fullView ? 'calendar__day--full' : 'calendar__day--compact'}`}
         style={{
            gridColumn: fullView ? getGridColumn(day.day) : 'auto',
            gridRow: fullView ? '1' : 'auto',
            backgroundColor: day.isDayOff ? 'pink' : undefined,
         }}
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

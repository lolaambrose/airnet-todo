import React from 'react';
import Timeline from './Timeline';
import Day from './Day';
import WeekDays from './WeekDays';

interface WeekProps {
   days: Day[];
   isSelected: boolean;
   onClick: () => void;
   onSaveEvent: (updatedEvent: DayEvent) => void;
   events: DayEvent[];
}

const Week: React.FC<WeekProps> = ({ days, onClick, isSelected, onSaveEvent, events }) => {
   const handleClick = () => {
      //if (isSelected) {
      onClick();
      //}
   };

   return (
      <>
         <div
            className={`calendar__week 
            ${isSelected ? 'calendar__week--selected' : 'calendar__week--compact'}`}
            onClick={handleClick}
         >
            <div
               className={`calendar__week-content ${isSelected ? 'calendar__week-content--compact' : ''}`}
            >
               {isSelected ? (
                  <>
                     <Timeline />
                     <div className="calendar__wrapper">
                        <WeekDays isSelected={isSelected} days={days} />
                        <div className="calendar__days">
                           {days.map((day) => {
                              const dayEvents = events.filter((event) => event.date === day.date);
                              return (
                                 <Day
                                    key={day.date}
                                    day={day}
                                    events={dayEvents}
                                    fullView={isSelected}
                                    onSaveEvent={onSaveEvent}
                                 />
                              );
                           })}
                        </div>
                     </div>
                  </>
               ) : (
                  <>
                     <div className="calendar__days--compact">
                        {days.map((day) => {
                           const dayEvents = events.filter((event) => event.date === day.date);
                           return (
                              <Day
                                 key={day.date}
                                 day={day}
                                 events={dayEvents}
                                 fullView={isSelected}
                                 onSaveEvent={onSaveEvent}
                              />
                           );
                        })}
                     </div>
                  </>
               )}
            </div>
         </div>
      </>
   );
};

export default Week;

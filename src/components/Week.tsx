import React from 'react';
import Timeline from './Timeline';
import Day from './Day';
import WeekDays from './WeekDays';

interface WeekProps {
   week: Week;
   isSelected: boolean;
   onClick: () => void;
   onSaveEvent: (updatedEvent: DayEvent) => void;
}

const Week: React.FC<WeekProps> = ({ week, onClick, isSelected, onSaveEvent }) => {
   return (
      <>
         <div
            className={`calendar__week 
            ${isSelected ? 'calendar__week--selected' : 'calendar__week--compact'}`}
            onClick={onClick}
         >
            <div
               className={`calendar__week-content ${isSelected ? 'calendar__week-content--compact' : ''}`}
            >
               {isSelected ? (
                  <>
                     <Timeline />
                     <div className="calendar__wrapper">
                        <WeekDays isSelected={isSelected} week={week} />
                        <div className="calendar__days">
                           {week.days.map((day, index) => (
                              <Day
                                 key={index}
                                 day={day}
                                 fullView={isSelected}
                                 onSaveEvent={onSaveEvent}
                              />
                           ))}
                        </div>
                     </div>
                  </>
               ) : (
                  <>
                     <div className="calendar__days--compact">
                        {week.days.map((day, index) => (
                           <Day
                              key={index}
                              day={day}
                              fullView={isSelected}
                              onSaveEvent={onSaveEvent}
                           />
                        ))}
                     </div>
                  </>
               )}
            </div>
         </div>
      </>
   );
};

export default Week;

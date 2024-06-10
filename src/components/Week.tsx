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
   const fullWeek = [...days];
   while (fullWeek.length < 7) {
      fullWeek.push({ date: '', day: '', isDayOff: false });
   }

   return (
      <>
         <div className="calendar__week calendar__week--selected" onClick={onClick}>
            <div className="calendar__week-content calendar__week-content--compact">
               <Timeline />
               <div className="calendar__wrapper">
                  <WeekDays isSelected={isSelected} days={fullWeek} />
                  <div className="calendar__days">
                     {fullWeek.map((day, index) => {
                        if (!day.date)
                           return <div key={index} className="calendar__day--empty"></div>;
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
            </div>
         </div>
      </>
   );
};

export default Week;

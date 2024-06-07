import React from 'react';

const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

interface WeekDaysProps {
   days?: Day[];
   isSelected: boolean;
}

const WeekDays: React.FC<WeekDaysProps> = ({ days, isSelected }) => {
   return (
      <div className={`${isSelected ? 'calendar__weekdays--full' : 'calendar__weekdays'}`}>
         {weekDays.map((day, index) => (
            <div key={index} className="calendar__weekday">
               {day}
               {days && ', ' + days[index].date.split('-')[2]}
            </div>
         ))}
      </div>
   );
};

export default WeekDays;

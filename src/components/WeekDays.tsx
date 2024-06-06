import React from 'react';

const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

interface WeekDaysProps {
   week?: Week;
   isSelected: boolean;
}

const WeekDays: React.FC<WeekDaysProps> = ({ week, isSelected }) => {
   return (
      <div className={`${isSelected ? 'calendar__weekdays--full' : 'calendar__weekdays'}`}>
         {weekDays.map((day, index) => (
            <div key={index} className="calendar__weekday">
               {day}
               {week && week.days[index] ? ', ' + week.days[index].num : ''}
            </div>
         ))}
      </div>
   );
};

export default WeekDays;

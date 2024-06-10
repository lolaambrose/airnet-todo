import React from 'react';

const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

interface WeekDaysProps {
   days?: Day[];
   isSelected: boolean;
}

const WeekDays: React.FC<WeekDaysProps> = ({ days, isSelected }) => {
   let fullWeek: Day[] = [];
   if (days) {
      fullWeek = [...days];
      while (fullWeek.length < 7) {
         fullWeek.push({ date: '', day: '', isDayOff: false });
      }
   }

   return (
      <div className={`${isSelected ? 'calendar__weekdays--full' : 'calendar__weekdays'}`}>
         {weekDays.map((day, index) => (
            <div key={index} className="calendar__weekday">
               {day}
               {fullWeek[index] && fullWeek[index].date
                  ? ', ' + fullWeek[index].date.split('-')[2]
                  : ''}
            </div>
         ))}
      </div>
   );
};

export default WeekDays;

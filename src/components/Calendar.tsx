import React, { useState } from 'react';
import Week from './Week';
import weeksData from '../data';

const Calendar: React.FC = () => {
   const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

   const handleWeekClick = (weekNumber: number) => {
      setSelectedWeek(weekNumber === selectedWeek ? null : weekNumber);
   };

   return (
      <div className="calendar">
         <div className="calendar__weeks">
            {weeksData.map((week) => (
               <Week
                  key={week.week}
                  week={week}
                  isSelected={selectedWeek === week.week}
                  onClick={() => handleWeekClick(week.week)}
               />
            ))}
         </div>
      </div>
   );
};

export default Calendar;

import React, { useMemo, useState } from 'react';
import Week from './Week';
import weeksData from '../data';
import WeekDays from './WeekDays';

const Calendar: React.FC = () => {
   const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

   const handleWeekClick = (weekNumber: number) => {
      setSelectedWeek(weekNumber === selectedWeek ? null : weekNumber);
   };

   const weeksToRender = useMemo(() => {
      if (selectedWeek !== null) {
         return weeksData.filter((week) => week.week === selectedWeek);
      }
      return weeksData;
   }, [selectedWeek]);

   return (
      <div className="calendar">
         {!selectedWeek && <WeekDays isSelected={selectedWeek !== null} />}
         <div className="calendar__weeks">
            {weeksToRender.map((week) => (
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

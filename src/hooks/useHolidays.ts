import { useEffect, useState } from 'react';

const useHolidays = (year: number) => {
   const [holidays, setHolidays] = useState<string[]>([]);

   useEffect(() => {
      const fetchHolidays = async () => {
         const cachedHolidays = localStorage.getItem(`holidays-${year}`);
         if (cachedHolidays) {
            setHolidays(JSON.parse(cachedHolidays));
            return;
         }

         try {
            const dates = Array.from({ length: 365 }, (_, i) => {
               const date = new Date(year, 0, i + 1);
               return date.toISOString().split('T')[0];
            });

            const holidayPromises = dates.map(async (date) => {
               const response = await fetch(`https://isdayoff.ru/${date.replace(/-/g, '')}`);
               const result = await response.text();
               return result === '1' ? date : null;
            });

            const holidayResults = await Promise.all(holidayPromises);
            const filteredHolidays = holidayResults.filter(Boolean) as string[];
            setHolidays(filteredHolidays);
            localStorage.setItem(`holidays-${year}`, JSON.stringify(filteredHolidays));
         } catch (error) {
            console.error('Ошибка при загрузке данных о праздничных днях:', error);
         }
      };

      fetchHolidays();
   }, [year]);

   return holidays;
};

export default useHolidays;

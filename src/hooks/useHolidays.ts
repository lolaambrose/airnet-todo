import { useEffect, useState, useCallback } from 'react';
import { HttpClient, FetchHttpClient } from '../api/httpClient';

const useHolidays = (year: number, httpClient: HttpClient = new FetchHttpClient()) => {
   const [holidays, setHolidays] = useState<string[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   const fetchHolidays = useCallback(async () => {
      const cachedHolidays = localStorage.getItem(`holidays-${year}`);
      if (cachedHolidays) {
         setHolidays(JSON.parse(cachedHolidays) as string[]);
         setIsLoading(false);
         return;
      }

      try {
         const dates = Array.from({ length: 365 }, (_, i) => {
            const date = new Date(year, 0, i + 1);
            return date.toISOString().split('T')[0];
         });

         const holidayPromises = dates.map(async (date): Promise<string | null> => {
            const result: string = await httpClient.get(
               `https://isdayoff.ru/${date.replace(/-/g, '')}`,
            );
            return result === '1' ? date : null;
         });

         const holidayResults = await Promise.all(holidayPromises);
         const filteredHolidays = holidayResults.filter(Boolean) as string[];
         setHolidays(filteredHolidays);
         localStorage.setItem(`holidays-${year}`, JSON.stringify(filteredHolidays));
      } catch (error) {
         console.error('Ошибка при загрузке данных о праздничных днях:', error);
      } finally {
         setIsLoading(false);
      }
   }, [year, httpClient]);

   useEffect(() => {
      void fetchHolidays();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return { holidays, isLoading };
};

export default useHolidays;

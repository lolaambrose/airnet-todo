interface DayEvent {
   title: string;
   start: string;
   end: string;
   color: 'pink' | 'yellow' | 'blue' | 'green';
}

interface Day {
   num: number;
   day: string;
   events: DayEvent[];
}

interface Week {
   week: number;
   days: Day[];
}

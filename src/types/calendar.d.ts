interface DayEvent {
   id: number;
   title: string;
   start: string;
   end: string;
   color: 'pink' | 'yellow' | 'blue' | 'green';
   isCompleted: boolean;
   description?: string;
}

interface Day {
   num: number;
   day: string;
   events: DayEvent[];
   isDayOff: boolean;
}

interface Week {
   week: number;
   days: Day[];
}

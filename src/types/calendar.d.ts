interface DayEvent {
   id: number;
   date: string;
   title: string;
   start: string;
   end: string;
   color: 'pink' | 'yellow' | 'blue' | 'green';
   isCompleted: boolean;
   description?: string;
}

interface Day {
   date: string;
   day: 'пн' | 'вт' | 'ср' | 'чт' | 'пт' | 'сб' | 'вс' | '';
   isDayOff: boolean;
}

import { render, screen } from '@testing-library/react';
import Day from '../Day';
import { vi } from 'vitest';

const mockDay: Day = {
   date: '2024-06-01',
   day: 'сб',
   isDayOff: true,
};

const mockEvents: DayEvent[] = [
   {
      id: 1,
      date: '2024-06-01',
      title: 'Test Event',
      start: '10:00',
      end: '11:00',
      color: 'blue',
      isCompleted: false,
   },
];

describe('Day Component', () => {
   it('renders day with events', () => {
      render(<Day day={mockDay} fullView={false} onSaveEvent={vi.fn()} events={mockEvents} />);
      expect(screen.getByText('Test Event')).toBeInTheDocument();
   });
});

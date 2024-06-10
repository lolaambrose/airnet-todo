import { render, screen } from '@testing-library/react';
import Event from '../Event';

const mockEvent: DayEvent = {
   id: 1,
   date: '2024-06-01',
   title: 'Test Event',
   start: '10:00',
   end: '15:00',
   color: 'blue',
   isCompleted: false,
};

describe('Event Component', () => {
   it('renders event details', () => {
      render(<Event event={mockEvent} fullView={false} onSave={vi.fn()} />);
      expect(screen.getByText('Test Event')).toBeInTheDocument();
      expect(screen.getByText('10:00 - 15:00')).toBeInTheDocument();
   });

   it('displays event description in full view', () => {
      const eventWithDescription = { ...mockEvent, description: 'Test Description' };
      render(<Event event={eventWithDescription} fullView={true} onSave={vi.fn()} />);
      expect(screen.getByText('Test Description')).toBeInTheDocument();
   });
});

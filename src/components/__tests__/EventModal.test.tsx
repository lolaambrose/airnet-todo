import { render, screen } from '@testing-library/react';
import EventModal from '../EventModal';
import { vi } from 'vitest';

const mockEvent: DayEvent = {
   id: 1,
   date: '2024-06-01',
   title: 'Test Event',
   start: '10:00',
   end: '11:00',
   color: 'blue',
   isCompleted: false,
   description: 'Test Description',
};

describe('EventModal Component', () => {
   it('renders modal with event details', () => {
      render(
         <EventModal isOpen={true} onRequestClose={vi.fn()} event={mockEvent} onSave={vi.fn()} />,
      );
      expect(screen.getByDisplayValue('Test Event')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
   });
});

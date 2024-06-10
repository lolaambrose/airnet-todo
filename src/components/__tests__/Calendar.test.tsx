import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mock, vi } from 'vitest';

vi.mock('../../hooks/useLocalStorage', () => {
   return {
      // @ts-expect-error key is required for proper mock
      default: (key: string, initialValue: unknown): [unknown, Mock] => [initialValue, vi.fn()],
   };
});

describe('Calendar Component', () => {
   beforeEach(() => {
      vi.resetModules(); // Сброс модулей перед каждым тестом
   });

   it('renders loading state', async () => {
      vi.doMock('../../hooks/useHolidays', () => ({
         default: () => ({ holidays: [], isLoading: true }),
      }));
      const { default: Calendar } = await import('../Calendar'); // Импортируем заново после мока
      render(<Calendar />);
      expect(screen.getByText('Загрузка...')).toBeInTheDocument();
   });

   it('renders calendar with days and events', async () => {
      vi.doMock('../../hooks/useHolidays', () => ({
         default: () => ({ holidays: [], isLoading: false }),
      }));
      const { default: Calendar } = await import('../Calendar');
      render(<Calendar />);
      expect(screen.getByText('Супериюнь')).toBeInTheDocument();
      expect(screen.getByText('Серёга')).toBeInTheDocument();
   });

   it('handles day click', async () => {
      vi.doMock('../../hooks/useHolidays', () => ({
         default: () => ({ holidays: [], isLoading: false }),
      }));
      const { default: Calendar } = await import('../Calendar');
      render(<Calendar />);
      const dayElement = screen.getByText('1');
      void userEvent.click(dayElement);
      expect(screen.getByTestId('back-button')).toBeInTheDocument();
   });
});

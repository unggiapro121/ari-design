import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, it, vi } from 'vitest';

import dayjs from '../../util/date';

import DateOfBirth, { getDateRange } from './DateOfBirth';

interface Context {
  year: number;
  month: number;
  date: number;
}

describe('DateOfBirth', () => {
  beforeEach<Context>(async (ctx) => {
    ctx.year = 2020;
    ctx.month = 1;
    ctx.date = 1;

    vi.setSystemTime(new Date(ctx.year, ctx.month, ctx.date));
  });

  afterEach(() => vi.useRealTimers());

  describe('getRestriction', () => {
    it('returns a valid range of 18 to 100', () => {
      const start = dayjs().subtract(100, 'year');
      const end = dayjs().subtract(18, 'year');

      expect(getDateRange(18, 100, 'year')).toMatchObject({ start, end });
    });
  });

  describe('Component', () => {
    it('renders', () => {
      render(<DateOfBirth />);

      const elements = screen.getAllByRole('spinbutton');

      expect(elements.length).toEqual(3);
    });
    it<Context>('renders with values', (ctx) => {
      render(<DateOfBirth value={dayjs({ ...ctx })} />);

      const elements = screen.getAllByRole('spinbutton');

      expect(elements.length).toEqual(3);

      const [day, month, year] = elements;

      expect(day).toHaveValue(ctx.date);
      expect(month).toHaveValue(ctx.month);
      expect(year).toHaveValue(ctx.year);
    });

    it('renders with custom input props', () => {
      render(
        <DateOfBirth
          inputProps={{
            day: { placeholder: 'Day' },
            month: { placeholder: 'Month' },
            year: { placeholder: 'Year' },
          }}
        />,
      );

      const elements = screen.getAllByRole('spinbutton');

      elements.forEach((el) =>
        expect(el).toHaveAttribute(
          'placeholder',
          el.getAttribute('placeholder'),
        ));
    });

    it('calls onChange when input value has changed', () => {
      const mockFn = vi.fn();

      render(<DateOfBirth onChange={mockFn} />);

      expect(mockFn).not.toBeCalled();

      const [day, month, year] =
        screen.getAllByRole<HTMLInputElement>('spinbutton');

      fireEvent.input(day, { target: { value: 1 } });
      fireEvent.input(month, { target: { value: 1 } });
      fireEvent.input(year, { target: { value: 2000 } });

      expect(mockFn).toHaveBeenCalledTimes(3);
    });
  });
});

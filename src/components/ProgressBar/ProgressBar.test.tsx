import { render, screen } from '@testing-library/react';
import * as React from 'react';

import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  const steps = Array.from({ length: 4 }, (_, i) => i + 1).map(
    (i) => `Step ${i}`,
  );

  test('renders', () => {
    render(<ProgressBar steps={steps} activeIndex={0} />);

    steps.forEach((step) => expect(screen.getByText(step)).toBeDefined());

    const [first] = steps;

    expect(screen.getByText(first)).toHaveTextContent('Current');
  });

  describe('activeIndex', () => {
    test.each<{ criteria: string; value: number }>([
      {
        criteria: 'sets active index to 0 when index is out of bounds',
        value: -1,
      },
      {
        criteria:
          'sets active index to last child when indexes are out of bounds',
        value: steps.length + 1,
      },
    ])('$criteria', ({ value }) => {
      render(<ProgressBar steps={steps} activeIndex={value} />);

      expect(
        screen.getByText(value > steps.length ? 'Step 4' : 'Step 1'),
      ).toHaveTextContent('Current');
    });
  });
});

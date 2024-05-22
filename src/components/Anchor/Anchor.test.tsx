import { render, screen } from '@testing-library/react';
import React from 'react';

import Anchor from './Anchor';

describe('Anchor', () => {
  it('renders', () => {
    render(<Anchor href='www.ampol.com.au' title='ampol' />);
    const el = screen.getByRole('link');

    expect(el).toHaveAttribute('href', 'www.ampol.com.au');
    expect(el).toHaveAccessibleDescription('ampol');
  });

  it.each(['http', 'https'])(
    'applies the target, rel attributes when the href contains an absolute path (%p)',
    (protocol) => {
      render(<Anchor href={`${protocol}://www.ampol.com.au`} />);

      const el = screen.getByRole('link');

      expect(el).toHaveAttribute('target', '_blank');
      expect(el).toHaveAttribute('rel', 'noopener noreferrer');
    },
  );

  it('Overrides the target, rel attributes when the href contains an absolute path', () => {
    render(
      <Anchor href='http://www.ampol.com.au' target='_self' rel='origin' />,
    );

    const el = screen.getByRole('link');

    expect(el).toHaveAttribute('target', '_self');
    expect(el).toHaveAttribute('rel', 'origin');
  });
});

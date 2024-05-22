import { render, screen } from '@testing-library/react';
import React from 'react';

import Typography from './Typography';

describe('Typography', () => {
  const children = 'text';

  it('renders', () => {
    render(<Typography>{children}</Typography>);

    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it('renders with variant and component', () => {
    render(<Typography variant='h2' component='h1'>{children}</Typography>);

    const el = screen.getByText(children);

    expect(el.nodeName).toEqual('H1');
    expect(el).toHaveAttribute('class', 'h2');

  });
});
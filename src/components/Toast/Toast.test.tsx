import { render, screen } from '@testing-library/react';
import React from 'react';

import Typography from '../Typography/Typography';

import Toast from './Toast';

describe('Toast', () => {
  it('renders', () => {
    render(
      <Toast open portal={false} variant="neutral" x="left" y="top">
        <Typography component="p">Toast</Typography>
      </Toast>,
    );

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText('Toast')).toBeInTheDocument();
  });

  it('renders using createPortal', () => {
    render(
      <Toast open portal variant="neutral" x="left" y="top">
        <Typography component="p">Toast</Typography>
      </Toast>,
    );

    const el = screen.getByRole('alertdialog');

    expect(el).toBeInTheDocument();
    expect(el.parentElement?.nodeName).toEqual('BODY');
  });

  it('does not render the component', () => {
    render(
      <Toast>
        <Typography component="p">Toast</Typography>
      </Toast>,
    );
  });
});

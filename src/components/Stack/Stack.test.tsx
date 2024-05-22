import { render, screen } from '@testing-library/react';
import React from 'react';

import Stack from './Stack';

describe('Stack', () => {
  it('renders', () => {
    render(
      <Stack direction='row' gap='xs' className='customClassName'>
        <div>child 1</div>
        <div>child 2</div>
      </Stack>,
    );

    screen
      .getAllByText(/child/)
      .forEach((el, i) => expect(el).toHaveTextContent(`child ${i + 1}`));
  });

  it('appends classname when defined', () => {
    render(
      <Stack direction='row' gap='xs' className='customClassName'>
        <div>child 1</div>
        <div>child 2</div>
      </Stack>,
    );

    expect(screen.getByTestId('Stack')).toHaveClass('customClassName');
  });

  it('appends Divider when Stack contains more then one child', () => {

    const Divider = () => <div data-testid='divider'>--</div>;

    render(
      <Stack direction='row' gap='xs' className='customClassName' divider={<Divider />}>
        <div>child 1</div>
        <div>child 2</div>
        <div>child 3</div>
        <div>child 4</div>
      </Stack>,
    );

    expect(screen.getAllByTestId('divider').length).toEqual(3);

  });

});

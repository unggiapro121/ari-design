import {
  fireEvent,
  render,
} from '@testing-library/react';
import React from 'react';

import Accordion from './Accordion';

// TODO: This test file has been disabled temporarily.
// Since jest required extra configuration to work with svg files and path aliases
// Vitest would unify this approach requiring no additional config or dependencies

describe('accordion component', () => {
  it('should render', () => {
    render(<Accordion />);
  });

  // should render with a title
  it('should render with a title', () => {
    const { getByText } = render(<Accordion title="Test Title" />);

    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('should open when open property is set to true', () => {
    const { getByTestId } = render(
      <Accordion open={true}>
        <p data-testid="accordion body">Test</p>
      </Accordion>,
    );

    const accordionBody = getByTestId('accordion body');

    expect(accordionBody).toBeInTheDocument();
  });

  // should close when open property is set to false
  it('should close when open property is set to false', async () => {
    const content = 'Test content';
    const { queryByText } = render(
      <Accordion open={false}>
        <p>{content}</p>
      </Accordion>,
    );

    expect(queryByText(content)).not.toBeInTheDocument();
  });

  // should toggle when header is clicked on
  it('should toggle when header is clicked on', async () => {
    const content = 'Test content';
    const { getByTestId, queryByText } = render(
      <Accordion>
        <p>{content}</p>
      </Accordion>,
    );

    const accordionHeader = getByTestId('Accordion');

    fireEvent.click(accordionHeader);

    expect(queryByText(content)).toBeInTheDocument();
  });
});

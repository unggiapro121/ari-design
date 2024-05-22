import { render } from '@testing-library/react';
import React from 'react';

import Breadcrumbs, { BreadcrumbsProps } from './Breadcrumbs';
import { Simple as Story } from './Breadcrumbs.stories';

describe('Breadcrumbs component', () => {
  test('renders', () => {
    const testProps = Story.args as BreadcrumbsProps;
    const promo = render(<Breadcrumbs {...testProps} />);

    expect(promo.getByTestId('Breadcrumbs')).toBeTruthy();

    const listItems = promo.getAllByRole('listitem');

    expect(listItems.length).toBe(4);
    expect(listItems[listItems.length - 1].textContent).toBe('Current page');

    const anchors = promo.getAllByRole('link');

    expect(anchors.length).toBe(3);
    expect(anchors[1].textContent).toBe('Subpage');
  });
});

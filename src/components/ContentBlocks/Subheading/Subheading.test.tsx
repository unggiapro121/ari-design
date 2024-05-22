import { render } from '@testing-library/react';
import React from 'react';

import Subheading from './Subheading';

describe('Subheading component', () => {
  test('does render Subheading', async () => {
    const headline = 'Test subheading content';
    const test = render(<Subheading text={headline} />);
    const subheading = await test.findByRole('heading');

    expect(subheading).toBeTruthy();
    expect(subheading.textContent).toContain(headline);
  });
});

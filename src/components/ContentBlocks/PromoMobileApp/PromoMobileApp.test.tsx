import { render } from '@testing-library/react';
import React from 'react';

import PromoMobileApp, { PromoMobileAppProps } from './PromoMobileApp';
import { MobileAppPromotion as Story } from './PromoMobileApp.stories';

describe('PromoMobileApp component', () => {
  test('renders', () => {
    const testProps = Story.args as PromoMobileAppProps;
    const promo = render(<PromoMobileApp {...testProps} />);

    expect(promo.getByTestId('PromoMobileApp')).toBeTruthy();
    expect(promo.getByText(testProps.headline)).toBeTruthy();
  });
});

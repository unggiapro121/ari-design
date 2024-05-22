import { render } from '@testing-library/react';
import React from 'react';

import AccordionBlock, { AccordionBlockProps } from './AccordionBlock';
import { Accordion as Default, FAQ } from './AccordionBlock.stories';

describe('Accordion content block component', () => {
  test('renders Default Accordian', () => {
    const testProps = Default.args as AccordionBlockProps;
    const accordionList = render(<AccordionBlock {...testProps} />);

    expect(accordionList.getByTestId('AccordionContentBlock')).toBeTruthy();

    expect(accordionList.getAllByRole('heading').length).toEqual(testProps.items.length);
    expect(accordionList.getAllByRole('heading')[0].textContent).toEqual(testProps.items[0].heading);    
  });

  test('renders FAQ Accordian', () => {
    const testProps = FAQ.args as AccordionBlockProps;
    const accordionList = render(<AccordionBlock {...testProps} />);

    expect(accordionList.getByTestId('AccordionFAQBlock')).toBeTruthy();

    expect(accordionList.getAllByRole('heading').length).toEqual(testProps.items.length);
    expect(accordionList.getAllByRole('heading')[0].textContent).toEqual(testProps.items[0].heading);    
  });
});

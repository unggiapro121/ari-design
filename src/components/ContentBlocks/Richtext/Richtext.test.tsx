import { render } from '@testing-library/react';
import React from 'react';

import Richtext, { RichtextProps } from './Richtext';
import {
  Inset as StoryLongContent,
  WithHeading as StoryWithHeading,
  WithImageBehindContent as StoryWithImageBehind,
  WithImageOnLeft as StoryWithImageOnLeft,
  WithImageOnRight as StoryWithImageOnRight,
} from './Richtext.stories';

describe('Richtext component', () => {
  test('renders', () => {
    const props = StoryLongContent.args as RichtextProps;
    const longcontent = render(<Richtext {...props} />);

    expect(longcontent.getByTestId('Richtext')).toBeTruthy();
  });

  test('renders with heading', () => {
    const props = StoryWithHeading.args as RichtextProps;
    const withheading = render(<Richtext {...props} />);

    expect(withheading.getAllByRole('heading')[0].textContent).toEqual(props.heading);
  });

  test('renders image behind content', () => {
    const props = StoryWithImageBehind.args as RichtextProps;
    const longcontent = render(<Richtext {...props} />);

    expect(longcontent.getByTestId('Richtext')).toBeTruthy();
    expect(longcontent.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  test('renders image on left of content', () => {
    const props = StoryWithImageOnLeft.args as RichtextProps;
    const longcontent = render(<Richtext {...props} />);

    expect(longcontent.getByTestId('Richtext')).toBeTruthy();

    expect(longcontent.getByAltText('Image on Left')).toBeTruthy();
  });

  test('renders image on right of content', () => {
    const props = StoryWithImageOnRight.args as RichtextProps;
    const longcontent = render(<Richtext {...props} />);

    expect(longcontent.getByTestId('Richtext')).toBeTruthy();
    expect(longcontent.getByAltText('Image on Right')).toBeTruthy();
  });
});

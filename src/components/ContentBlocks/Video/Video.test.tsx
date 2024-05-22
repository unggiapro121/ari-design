import { render } from '@testing-library/react';
import React from 'react';

import Video, { VideoProps } from './Video';
import { Video as Story } from './Video.stories';

describe('Video component', () => {
  test('renders', () => {
    const testProps = Story.args as VideoProps;
    const video = render(<Video {...testProps} />);
    const { headline } = testProps;

    expect(video.getByTestId('Video')).toBeTruthy();
    expect(video.getByText(headline ?? 'How to redeem your fuel discount')).toBeTruthy();
  });
});

import { render } from '@testing-library/react';
import React from 'react';

import FeatureTiles, { FeatureTilesProps } from './FeatureTiles';
import { ThreeUpNoOverlay as Story } from './FeatureTiles.stories';

describe('FeatureTiles component', () => {
  const props = Story.args as FeatureTilesProps;

  test('renders', () => {
    const tiles = render(<FeatureTiles {...props} />);

    expect(tiles.getByTestId('FeatureTiles')).toBeTruthy();

    props.tiles.forEach(tile => {
      expect(tiles.getByText(tile.headline)).toBeTruthy();
      tile.description && expect(tiles.getByText(tile.description)).toBeTruthy();
    });
  });
});

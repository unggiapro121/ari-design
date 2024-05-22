import { render } from '@testing-library/react';
import React from 'react';

import ProofPoint, { ProofPointProps } from './ProofPoint';
import { ProofPoints as Story } from './ProofPoint.stories';

describe('ProofPoint component', () => {
  test('renders', () => {
    const testProps = Story.args as ProofPointProps;
    const proofPoint = render(<ProofPoint {...testProps} />);

    expect(proofPoint.getByTestId('ProofPoint')).toBeTruthy();

    expect(proofPoint.getByText(testProps.tiles[0].headline)).not.toBeNull;
    expect(proofPoint.getByText(testProps.tiles[0].description)).not.toBeNull;

    expect(proofPoint.getByText(testProps.tiles[1].headline)).not.toBeNull;
    expect(proofPoint.getByText(testProps.tiles[1].description)).not.toBeNull;

    expect(proofPoint.getByText(testProps.tiles[2].headline)).not.toBeNull;
    expect(proofPoint.getByText(testProps.tiles[2].description)).not.toBeNull;

    expect(proofPoint.getByText(testProps.tiles[3].headline)).not.toBeNull;
    expect(proofPoint.getByText(testProps.tiles[3].description)).not.toBeNull;
  });
});

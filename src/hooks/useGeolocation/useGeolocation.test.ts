import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { vi } from 'vitest';

import useGeolocation from './useGeolocation';

const arg = {
  coords: {
    latitude: 1,
    longitude: 1,
    accuracy: 1,
    altitude: null,
    altitudeAccuracy: null,
    speed: null,
    heading: null,
  },
} satisfies Partial<GeolocationPosition>;

/**
 * Mocks the `navigator.geolocation` API
 */
const NavigatorMock = {
  geolocation: {
    getCurrentPosition: vi.fn().mockImplementation((cb) => {
      return cb(arg);
    }),
  },
};

describe('useGeolocation', () => {
  describe('Hook behaviour', () => {
    const reactSpy = vi.spyOn(React, 'useState');

    beforeAll(() => {
      vi.stubGlobal('navigator', NavigatorMock);
    });

    afterEach(() => reactSpy.mockClear());

    afterAll(() => {
      vi.unstubAllGlobals();
      reactSpy.mockRestore();
    });

    it('returns default value', () => {
      const { result } = renderHook(() =>
        useGeolocation({ initialize: false }));

      expect(result.current.position).toBeNull();
    });

    it('should register navigator and set the current position', () => {
      renderHook(() => useGeolocation({ initialize: true }));

      expect(global.navigator.geolocation.getCurrentPosition).toBeCalledTimes(
        1,
      );

      expect(React.useState).toBeCalledTimes(2);
    });
  });
  describe('Compatibility', () => {
    const consoleSpy = vi.spyOn(console, 'error');

    beforeAll(() => {
      consoleSpy.mockImplementation(() => 'error');
    });

    afterAll(() => consoleSpy.mockRestore());

    it('throws a console error when geolocation is not bound to Navigator prototype', () => {
      renderHook(() => useGeolocation({ initialize: true }));

      expect(consoleSpy).toBeCalledTimes(1);
    });
  });
});

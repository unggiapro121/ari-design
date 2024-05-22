import React from 'react';

type HookProps = {
  /**
   * Invoke `navigator.geolocation` for permissions and instantiate `Geolocation`
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation
   */
  initialize: boolean;
  /**
   * Position options for tracking
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition#parameters
   */
  positionOptions?: PositionOptions;
};

/**
 * Hook for the `navigator.geolocation` API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 * @returns
 */
const useGeolocation = ({ initialize, positionOptions }: HookProps) => {
  const [position, setPosition] = React.useState<GeolocationCoordinates | null>(
    null,
  );

  const handlePosition: PositionCallback = (p) => setPosition(p.coords);
  const handlePositionError: PositionErrorCallback = () => setPosition(null);

  React.useEffect(() => {
    if (initialize) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          handlePosition,
          handlePositionError,
          positionOptions,
        );
      } else {
        console.error(
          'navigator.geolocation is not compatible with your browser',
        );
      }
    }
  }, []);

  return { position };
};

export default useGeolocation;

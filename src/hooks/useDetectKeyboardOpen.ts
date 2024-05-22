import React from 'react';

/**
 * Attempts to check if virtual keyboard is open on mobile devices
 * There currently exists no perfect solution for this, so this may not
 * potentially work for some devices
 * @returns boolean if virtual keyboard is open
 */
const useDetectKeyboardOpen = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);

  const listener = () => {
    if (window?.visualViewport == null) return false;

    const MIN_KEYBOARD_HEIGHT = 300;

    const isMobile = window.innerWidth < 768;

    setIsKeyboardOpen(
      isMobile &&
        window.screen.height - MIN_KEYBOARD_HEIGHT >
          window.visualViewport.height,
    );
  };

  window?.visualViewport?.addEventListener('resize', listener);

  return isKeyboardOpen;
};

export default useDetectKeyboardOpen;

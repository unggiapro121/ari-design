import { RefObject, useEffect, useState } from 'react';

export const useElementHeight = (elementRef: RefObject<HTMLElement>) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (elementRef.current) {
        // Update the height state with the height of the element
        const elementHeight = elementRef.current.getBoundingClientRect().height;

        setHeight(elementHeight);
      }
    };

    // Initial check
    updateHeight();

    // Set up a resize observer to listen for changes in the element's height
    const resizeObserver = new ResizeObserver(updateHeight);

    if (elementRef.current) {
      resizeObserver.observe(elementRef.current);
    }

    // Clean up the observer when the component unmounts
    return () => {
      if (elementRef.current) {
        resizeObserver.unobserve(elementRef.current);
      }
    };
  }, [elementRef]); // Re-run the effect only if the ref object changes

  return height;
};

export default useElementHeight;

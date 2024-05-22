import { RefObject, useEffect, useState } from 'react';

/**
 * Hook that detects when an element should be sticky based on scroll position.
 * @param elementRef - Ref object for the element to apply sticky behavior to.
 * @returns A boolean value indicating whether the element is currently sticky.
 */
const useSticky = (elementRef: RefObject<HTMLElement>) => {
  const [isSticky, setSticky] = useState(false);
  const [elementTopOffset, setElementTopOffset] = useState(0);

  useEffect(() => {
    if (elementRef.current) {
      // Calculate and set the element's original offset from the top of the document.
      const rect = elementRef.current.getBoundingClientRect();
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop;

      setElementTopOffset(rect.top + scrollTop);
    }

    const handleScroll = () => {
      // Update the isSticky state based on the window's scroll position and the element's original offset.
      setSticky(window.scrollY > elementTopOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef, elementTopOffset]); 

  return isSticky;
};

export default useSticky;

import { useEffect } from 'react';

/**
 * Use to detect if a user has click outside of any element and any of it's children,
 * good for when onBlur falls short.
 */
const useDetectClickOutside = (
  onClickOutside: () => void,
  ref: React.MutableRefObject<HTMLElement | null>,
  hooks: any[] = [],
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(e: Event) {
      if (!ref || !e.target) return;

      // Check if ref was currently in-focus
      if (!ref.current?.matches(':focus-within')) return;

      if (ref.current && !ref.current.contains(e.target as Element)) {
        onClickOutside();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, ...hooks]);
};

export default useDetectClickOutside;

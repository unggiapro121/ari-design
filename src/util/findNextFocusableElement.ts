// Recursively find the next focusable element in the DOM tree
// Could be expensive (use with caution)
const findNextFocusableElement = (
  element: HTMLElement | null,
  iterationCount = 1000,
): HTMLElement | null => {
  if (!element || iterationCount > 1000) {
    return null;
  }

  if (element.tabIndex !== -1) {
    return element;
  }

  return findNextFocusableElement(
    element.nextElementSibling as HTMLElement,
    iterationCount + 1,
  );
};

export default findNextFocusableElement;

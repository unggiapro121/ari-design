import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { expect, vi } from 'vitest';

/**
 * Extends `@testing-library/jest-dom` for vitest
 * @link https://github.com/testing-library/jest-dom
 * @link https://vitest.dev/guide/extending-matchers.html
 */
expect.extend(matchers);

// fix is required for the carousel to render by patching window.matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

afterEach(cleanup);

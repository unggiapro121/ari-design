import "./../src/styles/tailwind.css";
import "./../src/styles/core.scss";

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export const parameters = {
  viewport: { viewports: INITIAL_VIEWPORTS },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        'Getting Started',
        'Documentation',
        'UI',
        'Inputs',
        'Layout',
        'Utility',
        'In Progress',
      ],
    },
  }
}
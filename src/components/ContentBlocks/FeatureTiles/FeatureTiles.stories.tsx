import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Button from '../../Button/Button';

import FeatureTiles from './FeatureTiles';

export default {
  title: 'UI/Content Blocks/Feature Tiles',
  component: FeatureTiles,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof FeatureTiles>;

const Template: ComponentStory<typeof FeatureTiles> = (args) => <FeatureTiles {...args} />;

export const OneUp = Template.bind({});
OneUp.title = 'Overlay/One Up';
OneUp.args = {
  tiles: [
    {
      headline: 'Business initiative',
      description: 'Fast, convenient and reliable charging solutions across Australia.',
      ctaButton: <Button label="Find out more" type="link" href="#" variant="secondary" color="black" bgFill={false} />,
      images: {
        square: {
          description: 'image description',
          url: '/placeholder/Tile/Bondi-Summ-Square.jpg',
        },
        wide: {
          description: 'image description',
          url: '/placeholder/Tile/Bondi-Summ-Wide.jpg',
        },
      },
    },
  ],
  layout: 'overlay',
};

export const TwoUp = Template.bind({});
TwoUp.args = {
  tiles: [
    {
      headline: 'AmpCharge: EV charging',
      description: 'Fast, convenient and reliable charging solutions across Australia.',
      ctaButton: <Button label="Find out more" type="link" href="#" variant="tertiary" color="black" />,
      images: {
        square: {
          description: 'image description',
          url: '/placeholder/Tile/AmpCharge-Square.jpg',
        },
        wide: {
          description: 'image description',
          url: '/placeholder/Tile/AmpCharge-Wide.jpg',
        },
      },
    },
    {
      headline: 'Convenience',
      description: 'Delicious food and freshly ground coffee plus everything you need to fill your pantry, anytime.',
      ctaButton: <Button label="Find out more" type="link" href="#" variant="tertiary" color="black" />,
      images: {
        square: {
          description: 'image description',
          url: '/placeholder/Tile/Foodary-Square.jpg',
        },
        wide: {
          description: 'image description',
          url: '/placeholder/Tile/Foodary-Wide.jpg',
        },
      },
    },
  ],
  layout: 'overlay',
};

export const TwoUpNoOverlay = Template.bind({});
TwoUpNoOverlay.args = {
  ...TwoUp.args,
  layout: undefined,
};

export const ThreeUp = Template.bind({});
ThreeUp.args = {
  tiles: [
    {
      headline: 'Fill up with eligible fuels',
      description: 'Fast, convenient and reliable charging solutions across Australia.',
      images: {
        square: {
          description: 'image description',
          url: '/placeholder/Tile/AmpCharge-Square.jpg',
        },
        wide: {
          description: 'image description',
          url: '/placeholder/Tile/AmpCharge-Wide.jpg',
        },
      },
    },
    {
      headline: 'Convenience',
      description: 'Delicious food and freshly ground coffee plus everything you need to fill your pantry, anytime.',
      ctaButton: <Button label="Find your nearest Foodary" type="link" href="#" variant="tertiary" color="black" />,
      images: {
        square: {
          description: 'image description',
          url: '/placeholder/Tile/Foodary-Square.jpg',
        },
        wide: {
          description: 'image description',
          url: '/placeholder/Tile/Foodary-Wide.jpg',
        },
      },
    },
    {
      headline: 'About Ampol',
      description: 'Proudly fuelling Australia since 1900.',
      ctaButton: <Button label="Learn more about the Ampol app" type="link" href="#" variant="tertiary" color="black" />,
      images: {
        square: {
          description: 'image description',
          url: '/placeholder/Tile/ServoNight-Square.jpg',
        },
        wide: {
          description: 'image description',
          url: '/placeholder/Tile/ServoNight-Wide.jpg',
        },
      },
    },
  ],
  layout: 'overlay',
};

export const ThreeUpNoOverlay = Template.bind({});
ThreeUpNoOverlay.args = {
  ...ThreeUp.args,
  layout: undefined,
};

export const FourUp = Template.bind({});
FourUp.args = {
  tiles: [
    {
      headline: 'AmpCharge: EV charging',
      description: 'Fast, convenient and reliable charging solutions across Australia.',
      ctaButton: <Button label="Find out more" type="link" href="#" variant="tertiary" color="black" />,
      images: {
        square: {
          description: 'image description',
          url: '/placeholder/Tile/AmpCharge-Square.jpg',
        },
        wide: {
          description: 'image description',
          url: '/placeholder/Tile/AmpCharge-Wide.jpg',
        },
      },
    },
    {
      headline: 'Convenience',
      description: 'Delicious food and freshly ground coffee plus everything you need to fill your pantry, anytime.',
      ctaButton: <Button label="Find out more" type="link" href="#" variant="tertiary" color="black" />,
      images: {
        square: {
          description: 'image description',
          url: '/placeholder/Tile/Foodary-Square.jpg',
        },
        wide: {
          description: 'image description',
          url: '/placeholder/Tile/Foodary-Wide.jpg',
        },
      },
    },
    {
      headline: 'About Ampol',
      description: 'Proudly fuelling Australia since 1900.',
      ctaButton: <Button label="Find out more" type="link" href="#" variant="tertiary" color="black" />,
      images: {
        square: {
          description: 'image description',
          url: '/placeholder/Tile/ServoNight-Square.jpg',
        },
        wide: {
          description: 'image description',
          url: '/placeholder/Tile/ServoNight-Wide.jpg',
        },
      },
    },
    {
      headline: 'Business initiative',
      description: 'Fast, convenient and reliable charging solutions across Australia.',
      ctaButton: <Button label="Find out more" type="link" href="#" variant="tertiary" color="black" />,
      images: {
        square: {
          description: 'image description',
          url: '/placeholder/Tile/Bondi-Summ-Square.jpg',
        },
        wide: {
          description: 'image description',
          url: '/placeholder/Tile/Bondi-Summ-Wide.jpg',
        },
      },
    },
  ],
  layout: 'overlay',
};

export const FiveUp = Template.bind({});
FiveUp.args = {
  tiles: [
    {
      headline: 'AmpCharge: EV charging',
      description: 'Fast, convenient and reliable charging solutions across Australia.',
      ctaButton: <Button label="Find out more" type="link" href="#" variant="tertiary" color="black" />,
      images: {
        square: {
          description: 'image description',
          url: '/placeholder/Tile/AmpCharge-Square.jpg',
        },
        wide: {
          description: 'image description',
          url: '/placeholder/Tile/AmpCharge-Wide.jpg',
        },
      },
    },
    {
      headline: 'Convenience',
      description: 'Delicious food and freshly ground coffee plus everything you need to fill your pantry, anytime.',
      ctaButton: <Button label="Find out more" type="link" href="#" variant="tertiary" color="black" />,
      images: {
        square: {
          description: 'image description',
          url: '/placeholder/Tile/Foodary-Square.jpg',
        },
        wide: {
          description: 'image description',
          url: '/placeholder/Tile/Foodary-Wide.jpg',
        },
      },
    },
    {
      headline: 'About Ampol',
      description: 'Proudly fuelling Australia since 1900.',
      ctaButton: <Button label="Find out more" type="link" href="#" variant="tertiary" color="black" />,
      images: {
        square: {
          description: 'image description',
          url: '/placeholder/Tile/ServoNight-Square.jpg',
        },
        wide: {
          description: 'image description',
          url: '/placeholder/Tile/ServoNight-Wide.jpg',
        },
      },
    },
    {
      headline: 'Business initiative',
      description: 'Fast, convenient and reliable charging solutions across Australia.',
      ctaButton: <Button label="Find out more" type="link" href="#" variant="tertiary" color="black" />,
      images: {
        square: {
          description: 'image description',
          url: '/placeholder/Tile/Bondi-Summ-Square.jpg',
        },
        wide: {
          description: 'image description',
          url: '/placeholder/Tile/Bondi-Summ-Wide.jpg',
        },
      },
    },
    {
      headline: 'Convenience',
      description: 'Delicious food and freshly ground coffee plus everything you need to fill your pantry, anytime.',
      ctaButton: <Button label="Find out more" type="link" href="#" variant="tertiary" color="black" />,
      images: {
        square: {
          description: 'image description',
          url: '/placeholder/Tile/Dog-Square.jpg',
        },
        wide: {
          description: 'image description',
          url: '/placeholder/Tile/Foodary-Wide.jpg',
        },
      },
    },
  ],
  layout: 'overlay',
};

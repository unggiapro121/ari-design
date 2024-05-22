import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import { AccordianVariant } from '../../Accordian/Accordion';

import AccordionBlock from './AccordionBlock';

export default {
  title: 'UI/Content Blocks/Accordion',
  component: AccordionBlock,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof AccordionBlock>;

const Template: ComponentStory<typeof AccordionBlock> = (args) => <AccordionBlock {...args} />;

const RichtextA = () => <>
  <p>
    AdBlue® is a chemical solution of technical grade urea (also called carbamide) in water, which is manufactured to ISO quality standards 22241-1, 2, 3 and 4 as well as DIN70070 and CEFIC standards.
  </p>
</>;

const RichtextB = () => <>
  <p>
    Stricter emission standards in Australia have been implemented in recent years, including EURO 4 and 5. To meet these standards, diesel engines have been redesigned to utilise selective catalytic reduction (SCR) systems that require the addition of AdBlue® to minimise exhaust emissions.
  </p>
</>;

const RichtextC = () => <>
  <p>
    Because Ampol AdBlue® is a fully VDA approved and certified product, it means our manufacturing processes have passed rigorous inspections and ongoing audits to ensure consistent product quality that complies with strict ISO standards. Only certified VDA AdBlue® suppliers are licensed to sell branded AdBlue®.</p>
  <p>
    Non VDA approved urea solutions do not offer the same guarantee of performance, product quality, and consistency. Inconsistency of product due to inferior ingredients, contaminants and unsuitable manufacturing processes can lead to:
    <ul>
      <li>Blocked sites within the SCR catalyst leading to downtime and costly repairs.</li>
      <li>Reduced conversion of NOx causing increased frequency of system warning alerts.</li>
    </ul>
    If you have multiple controlled loads, you'll incur usage and supply charges for each controlled load.
  </p>
</>;

const RichtextD = () => <>
  <p>AdBlue® is also available from a number of Ampol truck stops nationwide. Find AdBlue® near you here.</p>
  <p>Ampol AdBlue® is also available in 1000-litre (IBC) or 210-litre drums, and 10-litre top-up packs, with bulk delivery to customer storage facilities nationwide if required.</p>
</>;

const RichtextE = () => <>
  <p>Not only is Ampol AdBlue® fully VDA approved, it also meets stringent ISO 22241-1, 2, 3 and 4 standards, ensuring maximum performance and reliability of your SCR system.</p>
  <p>Non-VDA approved urea solutions do not offer the same guarantee of product quality and performance.</p>
</>;

const RichtextF = () => <>
  <p>
    <ol>
      <li>When using the Ampol app, go to the Profile tab.</li>
      <li>Once here, tap Everyday Rewards and select the ‘Add Everyday Rewards’ link.</li>
      <li>You will then be taken to the Everyday Rewards registration page to register. If you already have an Everyday Rewards account, then sign in to link your profile.</li>
    </ol>
  </p>
  <p>Once linked, you can start collecting points every time you fill up using FuelPay on the Ampol app. Terms and Conditions apply: <a href="https://www.woolworthsrewards.com.au/terms.html">https://www.woolworthsrewards.com.au/terms.html</a> </p>
</>;

export const Accordion = Template.bind({});
Accordion.args = {
  items: [
    {
      heading: 'Single rate',
      description: <RichtextA />,
    },
    {
      heading: 'Time of use',
      description: <RichtextB />,
    },
    {
      heading: 'Controlled load',
      description: <RichtextC />,
    },
    {
      heading: 'Demand',
      description: <RichtextD />,
    },
    {
      heading: 'Solar feed-in',
      description: <RichtextE />,
    },
  ],
};

export const FAQ = Template.bind({});
FAQ.args = {
  items: [
    {
      heading: 'What is AdBlue®?',
      description: <RichtextA />,
    },
    {
      heading: 'Why is AdBlue® necessary?',
      description: <RichtextB />,
    },
    {
      heading: 'Is all AdBlue® the same?',
      description: <RichtextC />,
    },
    {
      heading: 'Where can I buy AdBlue®?',
      description: <RichtextD />,
    },
    {
      heading: 'Why choose Ampol AdBlue®?',
      description: <RichtextE />,
    },
    {
      heading: 'How do I link my Everyday Rewards Card to my Ampol app account?',
      description: <RichtextF />,
    },
  ],
  variant: AccordianVariant.FAQ,
};

export const FAQWithLink = Template.bind({});
FAQWithLink.args = {
  items: [
    {
      heading: 'What is AdBlue®?',
      description: <RichtextA />,
    },
    {
      heading: 'Why is AdBlue® necessary?',
      description: <RichtextB />,
    },
    {
      heading: 'Is all AdBlue® the same?',
      description: <RichtextC />,
    },
    {
      heading: 'Where can I buy AdBlue®?',
      description: <RichtextD />,
    },
    {
      heading: 'Why choose Ampol AdBlue®?',
      description: <RichtextE />,
    },
    {
      heading: 'How do I link my Everyday Rewards Card to my Ampol app account?',
      description: <RichtextF />,
    },
  ],
  variant: AccordianVariant.FAQ,
  link: {
    title: 'Return to search',
    href: '/',
  },
};
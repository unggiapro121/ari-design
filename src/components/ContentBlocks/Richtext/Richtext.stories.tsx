import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Button, { ButtonType } from '../../Button/Button';

import Richtext from './Richtext';

export default {
  title: 'UI/Content Blocks/Long Content',
  component: Richtext,
  parameters: {
    zeplinLink: [
      {
        name: 'Wireframe',
        link: '...',
      },
    ],
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Richtext>;

const Template: ComponentStory<typeof Richtext> = (args) => <Richtext {...args} />;

const RichtextA = () => <>
  <p>An electricity tariff is the way you get charged for the electricity used at your premises. The type of tariff your home is on will be set by your distributor and your meter type. The types of electricity tariffs are:</p>
  <h4>Single rate</h4>
  <p>You'll be charged a flat usage rate for the amount of energy used at your home, no matter what time of day. You'll see this listed on your electricity bill as General Usage and it's charged in cents per kilowatt hour (or c/kWh).</p>
  <h4>Time of use</h4>
  <p>Time of use tariffs mean you are charged a different rate for the energy you use at different times of the day. The types of rates are Peak, Shoulder and Off Peak.</p>
  <ul>
    <li>Peak: This is when electricity cost is the highest and generally applies in the evenings. You'll see this listed on your electricity bill as Peak Usage.</li>
    <li>Shoulder: This is when electricity usage costs a bit less than peak, but more than off peak. Shoulder rates generally apply overnight and in the early mornings. You'll see this listed on your electricity bill as Shoulder Usage.</li>
    <li>Off Peak: This is when electricity usage charges are lowest and generally applies during the day. You'll see this listed on your electricity bill as Off Peak Usage.</li>
  </ul>
  <p>Hint: A great way to keep electricity costs down is to run appliances such as dishwashers and washing machines during off peak times.</p>
  <h3>Controlled load</h3>
  <p>Controlled load refers to electricity which is used for a stand alone item, such as electric hot water systems or underfloor heating. These appliances often have their own meter. We'll charge a lower rate for that appliance and the energy it uses.</p>
  <ul>
    <li>Controlled Load Usage. This is charged in cents per kilowatt hour (or c/kWh) and reflects the energy usage of the stand alone item.</li>
    <li>Controlled Load Supply. This is charged in cents per day (or c/Day) and is a daily charge which covers the cost of delivering electricity to your controlled load item.</li>
  </ul>
  <h2>Demand</h2>
  <p>Demand tariffs are designed to encourage reduced energy usage during peak energy consumption times, which is generally in the evenings as people return home from work and switch on multiple appliances.</p>
  <p>If you're charged a demand tariff, you will incur usage and supply charges but will also incur a demand charge on top of your general usage. Demand charges are calculated based on the maximum power reading recorded between 4pm and 9pm on any day during your billing period. This maximum power reading is then utilised to calculate your monthly charge.</p>
  <p>You'll see demand charges on your electricity bill as Demand kW, and it's charged in dollars per kilowatt per month (or $/kW/month).</p>
  <p>Hint: One way to help keep your demand charge down is to avoid simultaneous use of major appliances (such as dishwashers, washing machines, heating and cooling).</p>
  <h3>Solar feed-in</h3>
  <p>If you have solar installed at your premises, you could also be eligible for a solar feed in tariff. A solar feed in tariff is a credit received on your bill for any unused electricity your home's solar power system sends back to the grid.</p>
  <blockquote>You can also write to us at Ampol Energy, GPO Box 4044, Sydney NSW 2001.</blockquote>
</>;

const RichtextB = () => <>
  <h1>Compliments and complaints</h1>
  <p>Thank you for taking the time to provide your feedback to us.</p>
  <p>If you have a compliment or complaint, please contact our Customer Service Team on 13 14 04 (Monday - Friday, 9am-6pm AEST) or email us at complaints@ampolenergy.com.au.</p>
  <blockquote>You can also write to us at Ampol Energy, GPO Box 4044, Sydney NSW 2001.</blockquote>
  <h2>How we handle complaints</h2>
  <p>Thank you for taking the time to provide your feedback to us.</p>
  <p>If you have a compliment or complaint, please contact our Customer Service Team on 13 14 04 (Monday - Friday, 9am-6pm AEST) or email us at complaints@ampolenergy.com.au.</p>
  <blockquote>You can also write to us at Ampol Energy, GPO Box 4044, Sydney NSW 2001.</blockquote>
</>;

const RichtextC = () => <>
  <h2>Ampol Energy. For where your journey starts.</h2>
  <p>Why energy? As we deliver fuel for today, we also have one eye on the future to make sure our motivation and purpose comes from the communities we engage with.</p>
  <h3>We're changing, for you</h3>
  <p>As our customers' needs change, so is our range of products and services. By developing new solutions in energy and mobility, we'll continue to be the momentum behind every journey.</p>
  <p>From powering your home with electricity, to powering your vehicle on the road, we're here to get you moving and keep you moving.</p>
  <h4>Ampol. Powering better journeys, today and tomorrow.</h4>
</>;

const RichtextD = () => <>
  <h2>Electricity plans for your EV</h2>
  <p>We're working on an energy plan, specifically designed to help you charge at home. Check back here for more updates, or sign up to our waitlist so we can keep you informed as we expand our services.</p>
</>;

const RichtextE = () => <>
  <p>Introducing our first EV charger suitable for the home or workplace.</p>
  <p>Features</p>
  <ul>
    <li>Charging speed of upto 22kW/h</li>
    <li>Charging speed of up to 22kW</li>
    <li>Single or Three Phase power</li>
    <li>Type 2 plug compatible with all Australian EVs</li>
    <li>Weatherproof (built for Australian conditions)</li>
    <li>4G and WI-FI connectivity</li>
    <li>Plug and charge (auto charging)</li>
    <li>2-year product warranty </li>
  </ul>
</>;

export const Inset = Template.bind({});
Inset.args = {
  children: <RichtextB />,
};

export const InsetWithImage = Template.bind({});
InsetWithImage.args = {
  children: <RichtextC />,
  images: {
    square: {
      description: 'Photo of a person relaxing in their home',
      url: '/placeholder/Content/image2.png',
    },
    wide: {
      description: 'Photo of a person relaxing in their home',
      url: '/placeholder/Content/image2.png',
    },
    tall: {
      description: 'Photo of a person relaxing in their home',
      url: '/placeholder/Content/image2.png',
    },
  },
};

export const WithImage = Template.bind({});
WithImage.args = {
  ...InsetWithImage.args,
  isInset: false,
};

export const WithImageBehindContent = Template.bind({});
WithImageBehindContent.args = {
  children: <RichtextD />,
  images: {
    square: {
      description: 'Photo of a person fuelling the car',
      url: '/placeholder/Content/myenergi-square.webp',
    },
    wide: {
      description: 'Photo of a person fuelling the car',
      url: '/placeholder/Content/myenergi.webp',
    },
    tall: {
      description: 'Photo of a person relaxing in their home',
      url: '/placeholder/Content/image2.png',
    },
  },
  isInset: false,
  placeImage: 'behind',
};

export const WithImageOnLeft = Template.bind({});
WithImageOnLeft.args = {
  children: <RichtextD />,
  images: {
    square: {
      description: 'Image on Left',
      url: '/placeholder/Content/myenergi-square.webp',
    },
    wide: {
      description: 'Image on Left',
      url: '/placeholder/Content/myenergi.webp',
    },
    tall: {
      description: 'Photo of a person relaxing in their home',
      url: '/placeholder/Content/image2.png',
    },
  },
  isInset: false,
  placeImage: 'left',
};

export const WithImageOnRight = Template.bind({});
WithImageOnRight.args = {
  children: <RichtextD />,
  images: {
    square: {
      description: 'Image on Right',
      url: '/placeholder/Content/myenergi-square.webp',
    },
    wide: {
      description: 'Image on Right',
      url: '/placeholder/Content/myenergi.webp',
    },
    tall: {
      description: 'Photo of a person relaxing in their home',
      url: '/placeholder/Content/image2.png',
    },
  },
  isInset: false,
  placeImage: 'right',
};

export const WithHeading = Template.bind({});
WithHeading.args = {
  heading: 'Tariff types',
  headingTheme: 'cobalt',
  children: <RichtextA />,
  isInset: false,
  ctaLink: 
    <Button variant="secondary" label="Find out more" color="red" type={ButtonType.Link} href='https://ampol.com.au'/>,
};

export const WithImageAboveContent = Template.bind({});
WithImageAboveContent.args = {
  children: <RichtextA />,
  images: {
    square: {
      description: 'Photo of a person fuelling the car',
      url: '/placeholder/Content/myenergi-square.webp',
    },
    wide: {
      description: 'Photo of a person fuelling the car',
      url: '/placeholder/Content/myenergi.webp',
    },
    tall: {
      description: 'Photo of a person relaxing in their home',
      url: '/placeholder/Content/image2.png',
    },
  },
  isInset: false,
  placeImage: 'above',
  ctaLink: 
    <Button variant="secondary" label="Find out more" color="red" type={ButtonType.Link} href='https://ampol.com.au'/>,
};

export const WithImageAboveContentInset = Template.bind({});
WithImageAboveContentInset.args = {
  children: <RichtextE />,
  images: {
    square: {
      description: 'Photo of a person fuelling the car',
      url: '/placeholder/Content/myenergi-square.webp',
    },
    wide: {
      description: 'Photo of a person fuelling the car',
      url: '/placeholder/Content/myenergi.webp',
    },
    tall: {
      description: 'Photo of a person relaxing in their home',
      url: '/placeholder/Content/image2.png',
    },
  },
  isInset: true,
  placeImage: 'above',
  ctaLink: 
    <Button variant="secondary" label="Find out more" color="red" type={ButtonType.Link} href='https://ampol.com.au'/>,
};
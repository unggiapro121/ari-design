import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Input from '../Input/Input';
import Nav from '../Nav/Nav';

import MobileMenu from './MobileMenu';

const meta: Meta<typeof MobileMenu> = {
  title: 'Layout/MobileMenu',
  component: MobileMenu,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof MobileMenu>;

export const Basic: Story = {
  parameters: { viewport: { defaultViewport: 'iphone14' } },
  render: () => (
    <MobileMenu show offset="0px">
      <MobileMenu.Actions>
        <Nav.Action title="your vehicle" />
        <Nav.Action title="your business" />
        <Nav.Action title="your convenience" />
        <Nav.Action title="about ampol" />
      </MobileMenu.Actions>

      <MobileMenu.SubActions>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima vel
          quo voluptates labore reprehenderit consequuntur autem commodi,
          dolores adipisci ipsam, ab iste officiis facilis totam distinctio nisi
          fugit, sunt mollitia!
        </p>
        <Nav.Action title="your vehicle" />
        <Nav.Action title="your business" />
        <Nav.Action title="your convenience" />
        <Nav.Action title="about ampol" />
      </MobileMenu.SubActions>
    </MobileMenu>
  ),
};

export const CustomMenu: Story = {
  parameters: { viewport: { defaultViewport: 'iphone14' } },
  render: () => {
    const [showMobileMenu, setShowMobileMenu] = React.useState(false);

    return (
      <>
        <Nav.Burger value={showMobileMenu} onChange={setShowMobileMenu} />
        <span>Click me</span>
        <MobileMenu
          show={showMobileMenu}
          offset="0px"
          height="100px"
          className="bg-background-light border-b-2 border-[#e0e0e0]"
        >
          <div className="p-m">
            <Input />
            <br />
          </div>
        </MobileMenu>
      </>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import useSticky from '../../hooks/useSticky';
import ampChargeMock from '../../images/ampcharge-mock.png';
import ampolSiteExample from '../../images/ampol-page-example.png';
import chatIcon from '../../images/icons/icon-chat.svg';
import userIconWhite from '../../images/icons/icon-user-white.svg';
import userIcon from '../../images/icons/icon-user.svg';
import primaryLogo from '../../images/logo-primary-full.png';
import mobileLogo from '../../images/logo-symbol-full-colour.png';
import Banner from '../Banner/Banner';
import Button, { ButtonColor, ButtonVariant } from '../Button/Button';
import Input from '../Input/Input';
import MobileMenu from '../MobileMenu/MobileMenu';

import Nav from './Nav';

const meta: Meta<typeof Nav> = {
  title: 'Layout/Nav',
  component: Nav,
  parameters: {
    viewport: { defaultViewport: 'desktop' },
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Nav>;

const decorators = [
  (Story) => (
    <div>
      <Banner>
        <Banner.Container>
          <Banner.Brands>
            <Banner.Brand image="https://www.ampol.com.au/-/media/images/logos/ampcharge_small_blue.ashx%22" />
            <Banner.Brand image="https://www.ampol.com.au/-/media/images/logos/ampenergy_small_blue.ashx%22" />
          </Banner.Brands>
          <Banner.Actions>
            <Banner.Action title="Support" icon={chatIcon} />
            <Banner.Action title="Sustainability" />
            <Banner.Action title="Login" icon={userIcon} />
          </Banner.Actions>
        </Banner.Container>
      </Banner>
      <Story />
      <img src={ampolSiteExample} className="w-screen" />
    </div>
  ),
];

export const Basic: Story = {
  decorators,
  render: () => (
    <>
      <Nav>
        {(isSticky) => (
          <Nav.Container>
            <Nav.Logo src={isSticky ? mobileLogo : primaryLogo} />
            <Nav.Actions>
              <Nav.Action title="your vehicle" />
              <Nav.Action title="your business" />
              <Nav.Action title="your convenience" />
              <Nav.Action title="about ampol" />
            </Nav.Actions>
          </Nav.Container>
        )}
      </Nav>
    </>
  ),
};

export const Mobile: Story = {
  decorators,
  parameters: { viewport: { defaultViewport: 'iphone14' } },
  render: () => {
    const [showMobileMenu, setShowMobileMenu] = React.useState(false);

    // If you're using a mobile menu, you can define your actions seperately to prevent duplication
    const Actions = () => (
      <>
        <Nav.Action title="your vehicle" />
        <Nav.Action title="your business" />
        <Nav.Action title="your convenience" />
        <Nav.Action title="about ampol" />
      </>
    );

    return (
      <>
        <Nav>
          {(isSticky) => (
            <Nav.Container>
              <Nav.Logo src={isSticky ? mobileLogo : primaryLogo} />
              <Nav.Actions>
                <Actions />
              </Nav.Actions>
              <Nav.Burger value={showMobileMenu} onChange={setShowMobileMenu} />
            </Nav.Container>
          )}
        </Nav>
        <MobileMenu show={showMobileMenu}>
          <MobileMenu.Actions>
            <Actions />
          </MobileMenu.Actions>
          <MobileMenu.SubActions>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
              vel quo voluptates labore reprehenderit consequuntur autem
              commodi, dolores adipisci ipsam, ab iste officiis facilis totam
              distinctio nisi fugit, sunt mollitia!
            </p>
            <Actions />
          </MobileMenu.SubActions>
        </MobileMenu>
      </>
    );
  },
};

export const CustomStickyStyles: Story = {
  decorators,
  render: () => {
    const navRef = React.useRef<HTMLElement>(null);
    const isSticky = useSticky(navRef);

    return (
      <>
        <Nav
          ref={navRef}
          className={
            isSticky ?
              'ads-w-[900px] ads-m-l ads-rounded-lg ads-bg-[#ffffffe4] ads-backdrop-blur-md ads-ring-1 ads-ring-background-light' :
              ''
          }
        >
          <Nav.Container>
            <Nav.Logo src={isSticky ? mobileLogo : primaryLogo} />
            <Nav.Actions>
              <Nav.Action title="your vehicle" />
              <Nav.Action title="your business" />
              <Nav.Action title="your convenience" />
              <Nav.Action title="about ampol" />
            </Nav.Actions>
          </Nav.Container>
        </Nav>
      </>
    );
  },
};

export const CustomActions: Story = {
  decorators,
  render: () => (
    <>
      <Nav>
        {(isSticky) => (
          <Nav.Container>
            <Nav.Logo src={isSticky ? mobileLogo : primaryLogo} />
            <Nav.Actions>
              <Nav.Action title="your vehicle" />
              <Nav.Action title="your business" />
              <Nav.Action title="your convenience" />
              <Nav.Action title="about ampol" />
              {/* Button gets treated like an action and gets put in mobile menu */}
              <Button
                style={{ width: 100, marginLeft: '24px' }}
                label="Join"
                variant={ButtonVariant.Secondary}
                color={ButtonColor.Blue}
              />
            </Nav.Actions>
            {/* A button outside actions will stay in the nav bar */}
            <Button
              style={{ width: 160, marginLeft: '24px' }}
              label="Logout"
              variant={ButtonVariant.Primary}
              color={ButtonColor.Blue}
            />
          </Nav.Container>
        )}
      </Nav>
    </>
  ),
};

export const CustomMobileMenu: Story = {
  decorators,
  parameters: { viewport: { defaultViewport: 'iphone14' } },
  render: () => {
    const [showMobileMenu, setShowMobileMenu] = React.useState(false);

    return (
      <>
        <Nav>
          <Nav.Container>
            <Nav.Logo src={primaryLogo} />
            <Nav.Actions>
              <Nav.Action title="your vehicle" />
              <Nav.Action title="your business" />
              <Nav.Action title="your convenience" />
              <Nav.Action title="about ampol" />
            </Nav.Actions>
            <Nav.Burger value={showMobileMenu} onChange={setShowMobileMenu} />
          </Nav.Container>
        </Nav>
        <MobileMenu
          show={showMobileMenu}
          offset="0px"
          height="100px"
          className="ads-bg-background-light ads-border-b-2 ads-border-[#e0e0e0]"
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

export const AmpChargeExample: Story = {
  render: () => {
    const [showMobileMenu, setShowMobileMenu] = React.useState(false);

    const Actions = () => (
      <>
        <Nav.Action title="charging at home" className="ads-border-[#7ed8e1]" />
        <Nav.Action title="charging on the road" className="ads-border-[#7ed8e1]" />
        <Nav.Action title="business solutions" className="ads-border-[#7ed8e1]" />
        <Nav.Action title="faqs" className="ads-border-[#7ed8e1] " />
        <Nav.Action title="contact us" className="ads-border-[#7ed8e1] " />
      </>
    );

    const Brands = () => (
      <>
        <Banner.Brand
          image="https://ampcharge.ampol.com.au/-/media/images/logos/ampol_small_coloured.ashx"
          className="ads-brightness-[500]"
        />
        <Banner.Brand
          image="https://www.ampol.com.au/-/media/images/logos/ampenergy_small_blue.ashx%22"
          className="ads-brightness-[500]"
        />
      </>
    );

    const BannerActions = () => (
      <Banner.Action title="Find a charger location" icon={userIconWhite} />
    );

    return (
      <>
        <Banner className="ads-border-b-[1px] ads-border-b-[#00000025] ads-bg-ampol-cobalt ads-text-white">
          <Banner.Container>
            <Banner.Brands>
              <Brands />
            </Banner.Brands>
            <Banner.Actions>
              <BannerActions />
            </Banner.Actions>
          </Banner.Container>
        </Banner>
        <Nav className={'tablet:ads-bg-ampol-cobalt tablet:ads-text-white'}>
          {(isSticky) => (
            <Nav.Container>
              <Nav.Logo
                src="https://ampcharge.ampol.com.au/-/media/images/logos/ampcharge_large_blue.ashx"
                className={`tablet:ads-brightness-[500] ads-w-[150px] ${isSticky ? 'tablet:ads-w-[200px]' : 'tablet:ads-w-auto'}`}
              />
              <Nav.Actions>
                <Actions />
              </Nav.Actions>
              <Nav.Burger value={showMobileMenu} onChange={setShowMobileMenu} />
            </Nav.Container>
          )}
        </Nav>
        <MobileMenu show={showMobileMenu}>
          <MobileMenu.Actions>
            <Actions />
          </MobileMenu.Actions>
          <MobileMenu.SubActions className="ads-bg-ampol-cobalt ads-text-white">
            <BannerActions />
            <br />
            <Brands />
          </MobileMenu.SubActions>
        </MobileMenu>
        <img src={ampChargeMock} className="ads-w-screen" />
      </>
    );
  },
};

export const AmpChargeMobileExample: Story = {
  parameters: { viewport: { defaultViewport: 'iphone14' } },
  ...AmpChargeExample,
};

export const Selector: Story = {
  decorators,
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Nav>
          {(isSticky) => (
            <Nav.Container>
              <Nav.Logo src={isSticky ? mobileLogo : primaryLogo} />
              <Nav.Selector
                className="ads-ml-m"
                open={open}
                onOpenChange={setOpen}
                defaultValue="nsw"
              >
                <Nav.Option value="nsw">NSW</Nav.Option>
                <Nav.Option value="vic">VIC</Nav.Option>
                <Nav.Option value="qld">QLD</Nav.Option>
                <Nav.Option value="sa">SA</Nav.Option>
                <Nav.Option value="wa">WA</Nav.Option>
              </Nav.Selector>
            </Nav.Container>
          )}
        </Nav>
      </>
    );
  },
};

export const SelectorMobile: Story = {
  parameters: { viewport: { defaultViewport: 'iphone14' } },
  ...Selector,
};

export const SelectorColour: Story = {
  decorators,
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Nav>
          {(isSticky) => (
            <Nav.Container>
              <Nav.Logo src={isSticky ? mobileLogo : primaryLogo} />
              <Nav.Selector
                className="ads-ml-m"
                open={open}
                onOpenChange={setOpen}
                defaultValue="nsw"
              >
                <Nav.Option
                  value="nsw"
                  className='data-[state="checked"]:ads-bg-ampol-cobalt'
                >
                  NSW
                </Nav.Option>
                <Nav.Option
                  value="vic"
                  className='data-[state="checked"]:ads-bg-ampol-cobalt'
                >
                  VIC
                </Nav.Option>
                <Nav.Option
                  value="qld"
                  className='data-[state="checked"]:ads-bg-ampol-cobalt'
                >
                  QLD
                </Nav.Option>
                <Nav.Option
                  value="sa"
                  className='data-[state="checked"]:ads-bg-ampol-cobalt'
                >
                  SA
                </Nav.Option>
                <Nav.Option
                  value="wa"
                  className='data-[state="checked"]:ads-bg-ampol-cobalt'
                >
                  WA
                </Nav.Option>
              </Nav.Selector>
            </Nav.Container>
          )}
        </Nav>
      </>
    );
  },
};

export const SelectorHeader: Story = {
  decorators,
  render: () => {

    return (
      <>
        <Nav>
          {(isSticky) => (
            <Nav.Container>
              <Nav.Logo src={isSticky ? mobileLogo : primaryLogo} />
              <Nav.Selector
                className="ads-ml-m"
                open={true}
                defaultValue="nsw"
                header='services states'
              >
                <Nav.Option value="nsw">NSW</Nav.Option>
                <Nav.Option value="vic">VIC</Nav.Option>
                <Nav.Option value="qld">QLD</Nav.Option>
                <Nav.Option value="sa">SA</Nav.Option>
                <Nav.Option value="wa">WA</Nav.Option>
              </Nav.Selector>
            </Nav.Container>
          )}
        </Nav>
      </>
    );
  },
};

export const SelectorHeaderMobile: Story = {
  parameters: { viewport: { defaultViewport: 'iphone14' } },
  ...SelectorHeader,
};

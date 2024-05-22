import * as Select from '@radix-ui/react-select';
import React from 'react';

import chevronDown from '../../images/icons/icon-chevron-down.svg';
import cn from '../../util/cn';

export interface NavSelectorProps extends Select.SelectProps {
  children?: React.ReactNode;
  icon?: string;
  className?: string;
  header?: string;
}

/**
 * Renders a selector component styled for the navigation bar. Intended to hold Nav.Option components.
 * @param {ReactNode} props.children - The content to be rendered inside the component.
 * @param {string} props.className - The CSS class name for the component.
 * @param {string} props.icon - Overrides the dropdown icon.
 */
const NavSelector = ({
  children,
  className,
  icon = chevronDown,
  ...props
}: NavSelectorProps) => {
  return (
    <Select.Root {...props}>
      <Select.Trigger
        className={cn(
          'ads-inline-flex ads-items-center ads-justify-center ads-rounded ads-leading-none ads-h-[35px] ads-bg-white ads-outline-none',
          className,
        )}
        aria-label="nav-selector"
      >
        <Select.Value />
        <Select.Icon>
          <img
            src={icon}
            alt="chevron"
            className={`ads-transition-all ads-ml-xs ${props.open ? 'ads-rotate-0' : 'ads-rotate-180'}`}
          />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="ads-overflow-hidden ads-shadow-xl ads-bg-white ads-z-[301] ads-w-screen ads-h-screen ads-mt-[25px] tablet:ads-border-0 tablet:ads-h-auto tablet:ads-mt-[0] tablet:ads-w-auto"
          position="popper"
          collisionPadding={0}
          align="end"
        >
          {props?.header && (
            <div className="ads-bg-background-light ads-text-[#6b6d77] ads-px-m ads-py-[16px]">
              <p className="ads-text-sm ads-m-[0]">{props.header.toUpperCase()}</p>
            </div>
          )}
          <Select.Viewport>{children}</Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

NavSelector.displayName = 'NavSelector';

export default NavSelector;

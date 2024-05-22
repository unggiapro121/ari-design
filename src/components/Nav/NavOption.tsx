import * as Select from '@radix-ui/react-select';
import React from 'react';

import iconTick from '../../images/icons/icon-tick-circle.svg';
import cn from '../../util/cn';

export interface NavOptionProps extends Select.SelectItemProps {
  children: React.ReactNode;
  className?: string;
}

const NavOption = React.forwardRef<HTMLDivElement, NavOptionProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={cn(
          'ads-cursor-pointer ads-leading-none ads-flex ads-items-center ads-relative ads-select-none',
          'tablet:ads-w-[180px] ads-h-[48px] ads-px-m ads-py-xs ads-box-border',
          'data-[highlighted]:ads-outline-none data-[highlighted]:ads-bg-background-light', // highlighted
          'data-[state="checked"]:ads-text-white data-[state="checked"]:ads-font-bold data-[state="checked"]:ads-bg-ampol-blue', // checked
          'data-[disabled]:ads-text-light-grey data-[disabled]:ads-pointer-events-none', // disabled
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="ads-ml-auto">
          <img src={iconTick} alt="selected-icon" />
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);

export default NavOption;

NavOption.displayName = 'NavOption';

import { LoadingOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import React from 'react';

import Icon from '../Icon/Icon';

import styles from './Button.module.scss';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

export enum ButtonColor {
  Red = 'red',
  Blue = 'blue',
  Cobalt = 'cobalt',
  Black = 'black',
  White = 'white',
}

export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
  Link = 'link',
}

export interface ButtonProps {
  /**
   * Text displayed inside of the button
   */
  label: string;
  /**
   * URL, only when `type` is  `"link"`
   */
  href?: string;
  /**
   * Icon displayed before the label inside of the button
   */
  iconPrefix?: typeof Icon;
  /**
   * Icon displayed after the label inside of the button
   */
  iconSuffix?: typeof Icon;
  /**
   * Display variant of the button eg. Primary / Secondary / Tertiary
   */
  variant: ButtonVariant | `${ButtonVariant}`;
  /**
   * Color of the button eg. Red / Blue / Cobalt / Black / White
   */
  color: ButtonColor | `${ButtonColor}`;
  /**
   * Include the background colour fill on the button, for use with `secondary` variant
   */
  bgFill?: boolean;
  /**
   * Type of the button eg. Button / Submit / Reset / Link
   * @default Button
   */
  type?: ButtonType | `${ButtonType}`;
  /**
   * Whether to display the button as inactive state (still clickable)
   */
  inactive?: boolean;
  /**
   * Additional class styles for the button
   */
  className?: string;
  /**
   * Additional styles for the button
   */
  style?: React.CSSProperties;
  /**
   * Button onClick event handler
   */
  onClick?: React.MouseEventHandler;
  /**
   * Id of form to associate this button with
   */
  formId?: string;
  /**
   * Whether to display loading spinner
   */
  loading?: boolean;
}

/**
 * Loading spinner for button loading state 
 */
const Spinner = () => (<LoadingOutlined className={styles.buttonSpinner} data-testid="button-spinner"/>);

/**
 * Ampol style button and variances
 * @see {@link ButtonProps} for available props
 */
const Button = ({
  label,
  href,
  variant,
  color,
  bgFill = true,
  type = ButtonType.Button,
  style,
  className,
  onClick,
  inactive,
  formId,
  iconPrefix,
  iconSuffix,
  loading,
}: ButtonProps) => {

  const buttonStyle = clsx([
    styles.button,
    styles[`button__${color}`],
    styles[`button__${variant}`],
    inactive && styles.button__inactive,
    !bgFill && styles.button__noFill,
    className,
  ]);

  if (type === ButtonType.Link) {
    return <a href={href} className={buttonStyle} style={style} data-testid="Button">{iconPrefix}{label}{iconSuffix}</a>;
  }

  return <>
    <button type={type} className={buttonStyle} style={style} onClick={onClick} form={formId} data-testid="Button">
      {iconPrefix}{label}{iconSuffix}{loading && <Spinner />}
    </button>
  </>;
};

export default Button;

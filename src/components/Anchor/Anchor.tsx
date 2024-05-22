import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

import Typography, { TypographyProps } from '../../components/Typography/Typography';

import styles from './Anchor.module.scss';

type Props = Omit<TypographyProps<'a'>, 'component'> & Variants

type Variants = VariantProps<typeof anchorStyles>

const anchorStyles = cva([styles.anchor], {
  variants: {
    underline: {
      hover: styles['anchorUnderline__hover'],
      fixed: styles.anchorUnderline,
      none: styles['anchorUnderline__none'],
    },
  },
});

/**
 * Anchor tag that utilises the `Typography` component
 * @example
 * ```tsx
 * <Anchor href='https://www.ampol.com,au' />
 * ```
 * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
 */
const Anchor = ({ href, children, underline, className, ...rest }: Props) => {
  const externalLinkProps = href?.startsWith('http') ?
    {
      target: '_blank',
      rel: 'noopener noreferrer',
    } :
    undefined;

  return (
    <Typography
      component='a'
      href={href}
      className={anchorStyles({ underline, className })}
      {...externalLinkProps}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default Anchor;

import { cva, VariantProps } from 'class-variance-authority';
import { createElement } from 'react';

type ComponentMap = Pick<
  JSX.IntrinsicElements,
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'small'
  | 'span'
  | 'strong'
  | 'a'
  | 'ol'
  | 'ul'
  | 'li'
>;

export type TypographyKeys = keyof ComponentMap;

export type Variants = Exclude<
  TypographyKeys,
  'h5' | 'h6' | 'ul' | 'ol' | 'li' | 'strong'
>;

export type TypographyProps<T extends TypographyKeys> = {
  component?: T;
} & ComponentMap[T] &
  VariantProps<typeof typographyStyles>;

const variant: Record<Variants, Variants> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  a: 'a',
  small: 'small',
  span: 'span',
};

export const typographyStyles = cva('', {
  variants: {
    /**
     * Variant for the component
     * @example
     * ```tsx
     * <Typography variant='h2' component='h1' /> // renders H1 with H2 styles
     * ```
     */
    variant,
  },
});

/**
 * Typography component with variant mapping
 * @example
 * ```tsx
 * <Typography component='h1' />
 * ```
 * @example
 * ```tsx
 * <Typography component='h2' variant='h1' /> // renders H2 with H1 styles
 * ```
 */
const Typography = <T extends TypographyKeys>({
  component,
  children,
  variant,
  ...props
}: TypographyProps<T>) => {
  const className = typographyStyles({ variant, className: props.className });

  return createElement(component ?? 'span', { ...props, className }, children);
};

export default Typography;

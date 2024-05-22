import { cva, cx, VariantProps } from 'class-variance-authority';
import * as React from 'react';

import styles from './Stack.module.scss';

const stackStyles = cva(styles.stack, {
  variants: {
    gap: {
      xxs: styles.stack__xxs,
      xs: styles.stack__xs,
      s: styles.stack__s,
      m: styles.stack__m,
      l: styles.stack__l,
    },
  },
});

/**
 * Fills array with a seperator that's interspersed.
 * @example
 * [1,2,3] -> [1,0,2,0,3]
 */
function joinChildren(
  children: React.ReactNode,
  separator: React.ReactElement,
) {
  const childrenArray = React.Children.toArray(children).filter(Boolean);

  return childrenArray.reduce<React.ReactNode[]>((acc, child, idx) => {
    acc.push(child);

    if (idx < childrenArray.length - 1) {
      acc.push(React.cloneElement(separator, { key: `separator-${idx}` }));
    }

    return acc;
  }, []);
}

type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type ResponsiveStyles<T> = T | Partial<Record<Breakpoints, T>>;

type Direction = React.CSSProperties['flexDirection'];
export interface StackProps
  extends VariantProps<typeof stackStyles> {
  /**
   * Child Nodes
   */
  children?: React.ReactNode
  /**
   * CSS Classnames
   */
  className?: string,
  /**
   * Direction to stack elements
   */
  direction: ResponsiveStyles<Direction>;
  /**
   * Controls the alignment of items on the cross axis
   */
  alignItems?: React.CSSProperties['alignItems'];
  /**
   * Controls the distribution of space between and around content items along the main-axis
   */
  justifyContent?: React.CSSProperties['justifyContent'];
  /**
   * The element to be interspersed between child elements
   */
  divider?: React.ReactNode;
}

/**
 * Component for stacking elements vertically or horizontally while maintaining compatibillity across older devices.
 * @example
 * ```tsx
 * <Stack direction='row' gap='sm'>
 *   <div>Block #1</div>
 *   <div>Block #2</div>
 * </Stack>
 * ```
 */
const Stack = ({
  alignItems,
  children,
  className,
  direction = 'row',
  divider,
  gap,
  justifyContent,
}: StackProps) => {
  let breakpointStyle = styles[`stack__${direction}__xs`];

  if (typeof direction !== 'string') {
    const breakpoints = [];

    for (const breakpoint in direction) {
      const directionValue =
        direction[breakpoint as keyof ResponsiveStyles<Direction>];

      if (!directionValue) continue;

      breakpoints.push(`${styles[`stack__${directionValue}__${breakpoint}`]}`);
    }
    breakpointStyle = cx(...breakpoints);
  }

  return (
    <div
      className={cx(
        stackStyles({
          gap,
        }),
        breakpointStyle,
        className,
      )}
      style={{ alignItems, justifyContent }}
      data-testid={Stack.name}
    >
      {divider ?
        joinChildren(children, divider as React.ReactElement) :
        children}
    </div>
  );
};

export default Stack;

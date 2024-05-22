import clsx from 'clsx';
import React from 'react';

import iconChevronRight from '@/images/icons/icon-chevron-right.svg';

import Icon from '../Icon/Icon';

import styles from './Breadcrumbs.module.scss';

export interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Array of data for titles and url paths, or React Elems for SSR/SSG
   */
  items?: {
    elem?: React.ReactElement;
    title?: string;
    path?: string;
  }[];
  /**
   * Aria label override for localisation
   */
  label?: string;
}

export type BreadcrumbsItems = BreadcrumbsProps['items'];

/**
 * Breadcrumbs renders a heirarchy of parent pages with separators
 * @param items array of `title`/`path`/`elem` data, where `elem` is a JSX child node
 * @param label optional aria label override for localisation
 */
export const Breadcrumbs = ({ className, items, label = 'parent pages', ...props }: BreadcrumbsProps) => {
  if (!items?.length) return null;

  const Separator = () => <span className={styles.breadcrumbsSeparator}><Icon size={10} url={iconChevronRight} /></span>;

  return (
    <div className={clsx(styles.breadcrumbs, className)} {...props} data-testid="Breadcrumbs">
      <nav className={styles.breadcrumbsInner} aria-label={label}>
        <ol className={styles.breadcrumbsList}>
          {items.map((item, key) => {
            const { elem, title, path } = item;
            const isTitleOnly = !elem && !path && !!title;
            const Item = () => {
              if (elem) return elem;

              if (path) return <a href={path}>{title}</a>;

              return <span>{title}</span>;
            };

            return (
              <li className={clsx(styles.breadcrumbsItem, isTitleOnly && styles.breadcrumbsItem__current)} key={key}>
                {key > 0 && <Separator />}
                <Item />
              </li>
            );
          })}
        </ol>
      </nav>
    </div >
  );
};

export default Breadcrumbs;

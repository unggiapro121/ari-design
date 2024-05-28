import clsx from 'clsx';
import React from 'react';

import DataTable, { HeaderVariant, TableColumn, TableVariant } from '../../DataTable/DataTable';
import Subheading from '../Subheading/Subheading';

import styles from './Table.module.scss';

export interface TableProps {
  children?: any,
}

export interface TableComponentProps {
  caption: string;
  columns: string[] | TableColumn[];
  data?: any[];
  headerVariant?: HeaderVariant;
  /**
   * Inset layout
   */
  inset: boolean;
  /**
   * show loader
   */
  isLoading?: boolean;
  /**
   * Semantic level of the heading tag
   */
  level?: '1' | '2' | '3' | '4' | '5' | '6';
  /**
   * Row Count for loader
   */
  loadingRowCount?: number;
  rows?: any[];
  /**
   * Display with theme accent colour
   */
  showAccent: boolean;
  showHeading: boolean;
  tableOverflow?: boolean;
}

/**
 * Describe Your Component
 * @param children JSX children
 */
const Table = ({
  caption, 
  columns, 
  data,
  headerVariant,
  inset,
  isLoading,
  level,
  loadingRowCount, 
  rows,
  showAccent,
  showHeading = false,
  tableOverflow,
}: TableComponentProps) => {
  return (
    <div 
      className={clsx(styles.table, inset && styles.table__inset)} 
      data-testid={Table}
    >
      {showHeading && caption  && <Subheading level={level} showAccent={showAccent} text={caption}/>}
      <DataTable 
        caption={caption} 
        columns={columns} 
        data={data}
        headerVariant={headerVariant} 
        isLoading={isLoading}
        loadingRowCount={loadingRowCount}
        rows={rows} 
        tableOverflow={tableOverflow}
        tableVariant={TableVariant.Main}
        textOverflow={'normal'}
      />
    </div>
  );
};

export default Table;
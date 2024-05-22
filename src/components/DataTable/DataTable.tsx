import { ColumnDef, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table';
import clsx from 'clsx';
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';

import Checkbox from '../Checkbox/Checkbox';
import Dropdown, { DropDownValueInterface } from '../Dropdown/Dropdown';
import ReadonlyField from '../ReadonlyInput/ReadonlyField';

import styles from './DataTable.module.scss';

export interface TableColumn {
  header?: string;
  id?: string;
  accessorKey?: string | number;
  accessorFn?: (originalRow: any, index: number) => any;
  cell?: (props: any) => any;
  rtl?: boolean;
  defaultValue?: string;
  disableSort?: boolean;
  defaultSorted?: 'asc' | 'desc';
}

export interface DataTableProps {
  caption: string;
  columns: string[] | TableColumn[];
  data?: any[];
  rows?: any[];
  rowClassFn?: (rowData: any) => string;
  rowSelectedFn?: (rowData: any) => boolean;
  rowSelectionDisabledFn?: (rowData: any) => boolean;
  rowIdFn?: (rowData: any) => string;
  tableVariant?: 'main' | 'list' | TableVariant;
  /**
   * Under most use cases will enable the table to extend out horizonally with scroll
   * bars to fit all column text. Some edge cases may not be supported.
   */
  tableOverflow?: boolean;
  textOverflow?: 'ellipsis' | 'normal';
  headerVariant?: 'Default' | 'Blue' | HeaderVariant;
  columnTemplate?: string;
  selectAll?: boolean;
  selectType?: 'single' | 'multi';
  isLoading?: boolean;
  loadingRowCount?: number;
  noDataMessage?: string | ReactNode;
  hideRowHeader?: boolean;

  isSelectable?: boolean;

  onSelect?: (rowData: any, isChecked: boolean) => void;
  onSelectAll?: (isSelected: boolean) => void;
  onColumnSorted?: (name: string, isAsc: boolean) => void;
  onRowClick?: (rowData: any) => void;
}

export enum TableVariant {
  Main = 'main',
  List = 'list'
}

export enum HeaderVariant {
  Default = 'Default',
  Blue = 'Blue',
  Cobalt = 'Cobalt'
}

/**
 * DataTable is using a sub set of features from the headless table from @tanstack/react-table
 * @param children JSX children
 */
const DataTable = (
  {
    caption,
    columns,
    tableVariant = TableVariant.Main,
    tableOverflow = false,
    textOverflow = 'ellipsis',
    selectType = 'multi',
    headerVariant,
    selectAll,
    isSelectable,
    isLoading,
    loadingRowCount = 10,
    columnTemplate,
    rowClassFn,
    rowSelectedFn,
    rowSelectionDisabledFn,
    rowIdFn,
    data,
    rows,
    onColumnSorted,
    onRowClick,
    onSelect,
    onSelectAll,
    noDataMessage,
    hideRowHeader,
  }: DataTableProps,
) => {
  const [isSelectAll, setIsSelectAll] = useState(selectAll);
  const [sortedColumn, setSortedColumn] = useState({} as { header: any, id: string, isAsc: boolean });
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnOptions, setColumnOptions] = React.useState([] as DropDownValueInterface[]);
  const [defaultColumnOption, setDefaultColumnOption] = React.useState({} as DropDownValueInterface);

  const loadingRows = new Array(loadingRowCount).fill(null);
  const simpleTable = typeof columns?.[0] === 'string';
  const tableColumns = simpleTable ?
    columns.map((col, index) => ({ header: col as string, id: typeof col === 'string' && `${col.replace(' ', '')}`, accessorFn: (row) => row[index] } as TableColumn)) :
    columns as TableColumn[];

  const columnDef: ColumnDef<typeof data>[] = tableColumns.map(({ header, id, accessorKey, accessorFn }) => ({ header, id, accessorKey, accessorFn } as ColumnDef<typeof data>));

  const table = useReactTable({
    data: data || rows || [],
    columns: columnDef,
    manualPagination: true, // Pagination results come from the server, rather than using this component to paginate data
    pageCount: -1, // needs to be set to -1 when manualPagination is used
    getRowId: (row) => rowIdFn ? rowIdFn(row) : row.key, // need this to ensure the selected row has a unique id.  if rowIdFn is not used, then this falls back to default
    state: {
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  const columnCount = table?.getHeaderGroups()?.[0]?.headers?.length;
  const styleColumnCount = { '--column-count': columnCount, '--action-column': isSelectable ? 1 : 2 } as React.CSSProperties;
  const hasActionColumn = tableColumns.some(column => column.id === 'action');

  // define template based on props
  columnTemplate = columnTemplate ?? `repeat(auto-fit, minmax(calc((100% - 70px)/${columnCount}), 1fr))`;
  const template = `${isSelectable ? '70px ' : ''}${columnTemplate}`;

  const handleSortColumn = (event: any, columnId: string) => {
    event?.preventDefault?.();

    if (!columnId) return;

    const columnIdentifier = getColumnIdentifier(columnId);
    const columnHeader = table?.getHeaderGroups()?.[0]?.headers?.find(header => header.id === columnIdentifier);
    const isAsc = sortedColumn.id === columnIdentifier ? !sortedColumn.isAsc : false;

    setSortedColumn({ header: columnHeader?.column?.columnDef?.header, id: columnIdentifier, isAsc: isAsc });

    onColumnSorted?.(columnIdentifier, isAsc);
  };

  const getSortClass = (columnIdentifier: string) => {
    const isCurrentlySorted = sortedColumn.id === columnIdentifier;

    return isCurrentlySorted ?
      sortedColumn.isAsc ?
        `${styles.datatableColumnsort__sorted}` :
        `${styles.datatableColumnsort__sorted} ${styles.datatableColumnsort__desc}` :
      styles.datatableColumnsort__desc;
  };

  const handleOnSelect = (event: ChangeEvent<HTMLInputElement>, row: any) => {
    onSelect?.(row.original, event?.target?.checked);

    return row.getToggleSelectedHandler()(event);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, row: Row<any>) => {
    // toggle all other selections to false
    table.toggleAllRowsSelected(false);

    // Select current row
    row.toggleSelected();

    onSelect?.(row.original, event?.target?.checked);
  };

  const handleOnSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    onSelectAll?.(event?.target?.checked);

    setIsSelectAll(event?.target?.checked);

    return table.getToggleAllRowsSelectedHandler()(event);
  };

  const handleRowClick = (event: React.MouseEvent<HTMLElement>, row: any) => {
    const target = event.target as HTMLElement;

    if (target.tagName === 'INPUT' && (target.getAttribute('type') === 'checkbox' || target.getAttribute('type') === 'radio')) {
      return;
    }

    onRowClick?.(row.original);
  };

  const getColumnIdentifier = (column: string) => {
    const columnIdentifier = column?.split(':')?.[0];

    return columnIdentifier || column;
  };

  const isRowItemSelected = (row: Row<any>): boolean => {
    return rowSelectedFn ? rowSelectedFn(row.original) : row.getIsSelected();
  };

  const isDisabledItemSelected = (row: Row<any>): boolean => {
    return rowSelectedFn ? isRowItemSelected(row) : !isSelectAll && isRowItemSelected(row);
  };

  const isSelectionDisabled = (row: Row<any>): boolean => {
    return rowSelectionDisabledFn && rowSelectionDisabledFn(row.original) || false;
  };

  useEffect(() => {
    const sortableColumns: DropDownValueInterface[] = table?.getHeaderGroups()?.[0]?.headers
      .filter(header => typeof header.column.columnDef.header === 'string' && !tableColumns.find(col => col.accessorKey === header.id || col.header === header.id)?.disableSort)
      .map((header) => {
        const columnIdentifier = getColumnIdentifier(sortedColumn.id);

        const label = header.id === columnIdentifier ? `${header.column.columnDef.header} (${sortedColumn.isAsc ? 'desc' : 'asc'})` : header.column.columnDef.header;
        const value = header.id === columnIdentifier ? `${header.id}:${sortedColumn.isAsc ? 'desc' : 'asc'}` : `${header.id}:desc`;

        return { label, value } as DropDownValueInterface;
      });

    setColumnOptions(sortableColumns);
    if (sortedColumn?.header) {
      setDefaultColumnOption({
        label: `${sortedColumn.header} (${sortedColumn.isAsc ? 'asc' : 'desc'})`,
        value: '',
      });
    }
  }, [sortedColumn]);

  useEffect(() => {
    if (selectType === 'multi') {
      setIsSelectAll(selectAll);
      table.toggleAllRowsSelected(selectAll);
    }
  }, [selectAll]);

  // Set default sorted column
  useEffect(() => {
    const defaultSortedColumnIndex = !simpleTable ? tableColumns.findIndex((column) => column?.defaultSorted) : -1;

    if (defaultSortedColumnIndex >= 0) {
      const header = table.getHeaderGroups()[0].headers[defaultSortedColumnIndex];
      const sortDirection = tableColumns[defaultSortedColumnIndex]?.defaultSorted;

      setSortedColumn({ header: header.column.columnDef.header, id: header.id, isAsc: sortDirection === 'asc' });
    }
  }, [table, simpleTable]);

  return <div data-testid="DataTable" className={clsx(tableOverflow && styles.overflowWrapper)}>
    {onColumnSorted && columnOptions.length > 0 && <div className={styles.datatableSortDropdown}>
      <label htmlFor={'mobileSort-dropdown'}>Sort by</label>
      <Dropdown
        name={'mobileSort'}
        placeHolder={sortedColumn?.header ? `${sortedColumn.header} (${sortedColumn.isAsc ? 'asc' : 'desc'})` : 'Select column'}
        onChange={(e: any) => handleSortColumn(e, e.target.value)}
        options={columnOptions}
        defaultOption={defaultColumnOption}
      />
    </div>}

    {onSelectAll && 
      <div 
        className={`${styles.datatableSelectAll} 
        ${headerVariant === HeaderVariant.Blue || tableVariant === TableVariant.Main && styles.datatableSelectAll__blue}
        ${headerVariant === HeaderVariant.Cobalt && styles.datatableSelectAll__cobalt}`}>
        <Checkbox
          color={headerVariant === HeaderVariant.Cobalt ? 'cobalt' : 'blue'}
          inverted={headerVariant === HeaderVariant.Blue || tableVariant === TableVariant.Main}
          name={'select-all'}
          checked={table.getIsAllRowsSelected()}
          onChange={(e) => handleOnSelectAll(e)}
        />
        <label htmlFor={'select-all'}>{`${table.getIsAllRowsSelected() ? 'Unselect' : 'Select'}`} all</label>
      </div>
    }

    <table
      role="table"
      className={clsx(
        styles.datatable,
        (isSelectable && styles.datatable__selectable) || (hasActionColumn && styles.datatable__actionable),
        tableOverflow && styles.datatable__overflow,
      )}
      style={styleColumnCount}
    >
      <caption>{caption}</caption>
      <thead
        className={`${styles.datatableHeader} 
                    ${tableVariant === TableVariant.Main ? styles.datatableHeader__main : ''} 
                    ${headerVariant === HeaderVariant.Blue ? styles.datatableHeader__blue : ''}
                    ${headerVariant === HeaderVariant.Cobalt ? styles.datatableHeader__cobalt : ''}
                  `}>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} role="row" style={{ gridTemplateColumns: template }}>
            {isSelectable && <th id="colHeadX" role="columnheader" scope="col">
              {onSelectAll && selectType === 'multi' && <Checkbox
                color={headerVariant === HeaderVariant.Cobalt ? 'cobalt' : 'blue'}
                inverted={headerVariant === HeaderVariant.Blue || tableVariant === TableVariant.Main}
                name={headerGroup.id}
                checked={table.getIsAllRowsSelected()}
                onChange={(e) => handleOnSelectAll(e)}
              />}
            </th>}
            {headerGroup.headers.map((header, index: number) => {
              const isVisibleHeader = typeof header.column.columnDef.header === 'string';

              return <th
                key={header.id}
                id={`colHead${index}`}
                role="columnheader"
                scope="col"
                className={tableColumns[index].rtl ? styles.datatableRTL : undefined}
                data-hover={header.column.columnDef.header}
              >
                {
                  onColumnSorted && isVisibleHeader && !tableColumns[index].disableSort &&
                  <a
                    className={`${styles.datatableColumnsort} ${getSortClass(header.id)}`}
                    href={''}
                    aria-label={`sort ${header.column.columnDef.header} `}
                    onClick={(e) => handleSortColumn(e, header.id)}>
                    {header.column.columnDef.header}
                  </a>
                }
                {
                  (!onColumnSorted || tableColumns[index].disableSort) && isVisibleHeader && header.column.columnDef.header
                }
              </th>;
            })}
          </tr>
        ))}
      </thead>
      <tbody
        className={`${styles.datatableBody} ${tableVariant === TableVariant.Main ? styles.datatableBody__main : ''}`}>
        {isLoading &&
          loadingRows.map((_, index) => <tr key={`loading-row-${index}`} role="row" aria-hidden={true} className={styles.datatableLoading}><td colSpan={columnCount} /></tr>)
        }
        {!isLoading && table.getRowModel().rows.length === 0 && <tr
          role="row"
        >
          <td colSpan={columnCount} style={{ justifyContent: 'center', whiteSpace: 'unset' }}>
            {noDataMessage || 'No content'}
          </td>
        </tr>
        }
        {!isLoading && table.getRowModel().rows.map(row => {
          const rowId = rowIdFn ? rowIdFn(row.original) : row.id;

          return <tr
            key={rowId}
            role="row"
            style={{ gridTemplateColumns: template }}
            onClick={(e) => handleRowClick(e, row)}
            className={`${rowClassFn ? rowClassFn(row.original) : ''} ${isSelectable ? styles.datatableCheckboxRow : styles.datatableStandardRow} ${textOverflow === 'normal' ? styles.datatableCellOverflowNormal : ''} ${!!onRowClick ? styles.datatableRowClickable : ''}`}
          >
            {isSelectable && <td scope="row" headers={'colHeadX'} className={styles.datatableCheckboxCell}>
              {selectType === 'multi' && !isSelectionDisabled(row) && <Checkbox
                color={headerVariant === HeaderVariant.Cobalt ? 'cobalt' : 'blue'}
                name={rowId}
                checked={isRowItemSelected(row)}
                onChange={(e) => handleOnSelect(e, row)}
              />}
              {selectType === 'single' && !isSelectionDisabled(row) && <input
                type={'radio'}
                name={'table-radio'}
                checked={isRowItemSelected(row)}
                className={styles.datatableRadioButton}
                onChange={(e) => handleRadioChange(e, row)}
              />}
              {isSelectionDisabled(row) &&
                <ReadonlyField type={selectType === 'multi' ? 'checkbox' : 'radio'} checked={isDisabledItemSelected(row)} />
              }
            </td>}

            {row.getVisibleCells().map((cell, index) => {
              const value = cell.getValue() as ReactNode;

              // first column cell
              if (index === 0) {
                return <th
                  key={cell.id}
                  id={`rowHead-${cell.id}`}
                  role="rowheader"
                  scope="row"
                  headers="colHead1"
                  className={tableColumns[index].rtl ? styles.datatableRTL : undefined}>
                  <div className={`${styles.datatableRowHeader} ${hideRowHeader ? styles.datatableRowHeader__hidden : ''}`} aria-hidden="true">{cell.column.columnDef.header}</div>
                  <div className={styles.datatableCellValue}>
                    {!!value ? value : tableColumns[index].defaultValue}
                  </div>
                </th>;
              }

              return <td
                key={cell.id}
                role="cell"
                headers={`rowHead-${cell.id} colHead${index}`}
                className={`${tableColumns[index].rtl ? styles.datatableRTL : ''} ${cell.id.includes('_action') ? styles.datatableCellAction : ''}`}>
                <div className={`${styles.datatableRowHeader} ${hideRowHeader ? styles.datatableRowHeader__hidden : ''}`} aria-hidden="true">{cell.column.columnDef.header}</div>
                <div className={styles.datatableCellValue}>
                  {!!value ? value : tableColumns[index].defaultValue}
                </div>
              </td>;

            })}
          </tr>;
        })}
      </tbody>
    </table>
  </div>;
};

export default DataTable;

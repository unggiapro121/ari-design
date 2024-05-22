import React from 'react';

import dayjs from '../../util/date';
import Input, { InputProps } from '../Input/Input';
import Stack from '../Stack/Stack';
import Typography from '../Typography/Typography';

import useDate, { ActionTypes } from './useDate';

export type Props = {
  /**
   * Method that passes a `Date` object as a callback
   * @link https://day.js.org
   */
  onChange?: (date: Date) => void;
  /**
   * Value as a `Dayjs` or `Date` object
   * @link https://day.js.org
   */
  value?: dayjs.Dayjs | Date;
  /**
   * Triggers error state
   */
  error?: boolean;
  /**
   * Input props for Day, Month and Year fields
   */
  inputProps?: Partial<
    Record<
      'day' | 'month' | 'year',
      Partial<Omit<InputProps, 'onChange' | 'value' | 'min' | 'max' | 'type'>>
    >
  >;
};

const Seperator = () => <Typography variant='h3'>/</Typography>;

/**
 * Returns a range of start and end date values
 * ```
 * // Assuming year is 2020
 * getDateRange(18, 100, 'year') // { min: 2002, max: 1920 }
 * ```
 */
export function getDateRange(
  start: number,
  end: number,
  type: dayjs.ManipulateType = 'year',
) {
  return {
    start: dayjs().subtract(end, type),
    end: dayjs().subtract(start, type),
  };
}

const DateOfBirth = ({ value, error, onChange, inputProps }: Props) => {
  const { state, dispatch } = useDate(value, [
    (state) =>
      onChange?.(
        dayjs({
          ...state,
          months: state.months ? state.months - 1 : undefined,
        }).toDate(),
      ),
  ]);

  const age = React.useMemo(() => getDateRange(18, 100), []);

  const handler =
    (type: ActionTypes) => (e: React.ChangeEvent<HTMLInputElement>) => {
      return dispatch({ type, payload: +e.target.value });
    };

  return (
    <Stack direction='row' gap='s' alignItems='center' divider={<Seperator />}>
      <Input
        type='number'
        placeholder='DD'
        name='day'
        min={1}
        max={31}
        value={state.date?.toString()}
        onChange={handler('SET_DATE')}
        error={error}
        {...inputProps?.day}
      />
      <Input
        type='number'
        name='month'
        placeholder='MM'
        min={1}
        max={12}
        value={state.months?.toString()}
        onChange={handler('SET_MONTHS')}
        error={error}
        {...inputProps?.month}
      />
      <Input
        type='number'
        name='year'
        placeholder='YYYY'
        value={state.years?.toString()}
        onChange={handler('SET_YEARS')}
        min={age.start.year()}
        max={age.end.year()}
        error={error}
        {...inputProps?.year}
      />
    </Stack>
  );
};

export default DateOfBirth;

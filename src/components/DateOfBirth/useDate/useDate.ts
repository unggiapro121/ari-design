import React from 'react';

import dayjs from '../../../util/date';

import dateReducer from './reducer';
import { Actions, MomentReducer, State } from './types';

const useDate = (
  /**
   * Initial State
   */
  initialState?: dayjs.Dayjs | Date,
  /**
   * Afterware Functions. The functions are called after `dispatch`
   */
  afterwareFns?: Array<(state: State) => void>,
) => {
  /**
   * Ref for handling afterware functions after dispatch has been fired
   */
  const actionRef = React.useRef<Actions | null>(null);

  const [state, dispatcher] = React.useReducer<MomentReducer>(
    dateReducer,
    initialState ? dayjs(initialState).toObject() : {},
  );

  const dispatch = (action: Actions) => {
    actionRef.current = action;

    dispatcher(action);
  };

  React.useEffect(() => {
    if (!actionRef.current) return;

    afterwareFns?.forEach((fn) => fn(state));

    actionRef.current = null;
  }, [afterwareFns]);

  return { state, dispatch };
};

export default useDate;

import { MomentReducer } from './types';

const reducer: MomentReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_DATE':
      return { ...state, date: payload };
    case 'SET_MONTHS':
      return { ...state, months: payload };
    case 'SET_YEARS':
      return { ...state, years: payload };
    default:
      return state;
  }
};

export default reducer;

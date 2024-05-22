import type { Reducer } from 'react';
export type ActionTypes = keyof typeof import('./actions');

export type Actions = { type: ActionTypes; payload: number };

export type MomentReducer = Reducer<State, Actions>;

export type State = Partial<Record<'date' | 'months' | 'years', number>>;

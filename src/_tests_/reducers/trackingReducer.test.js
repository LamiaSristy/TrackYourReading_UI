import trackingReducer from '../../reducers/trackingReducer';
import {
  fetchReadingDays, createDay, deleteDay, updateDay,
} from '../../actions/trackings';

describe('Book Reducer', () => {
  it('Should return the default state', () => {
    const state = trackingReducer(undefined, {});
    expect(state).toEqual([]);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = fetchReadingDays('Action');
    const state = trackingReducer(undefined, action);
    expect(state).toEqual([]);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = createDay('Action');
    const state = trackingReducer(undefined, action);
    expect(state).toEqual([]);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = deleteDay('Action');
    const state = trackingReducer(undefined, action);
    expect(state).toEqual([]);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = updateDay('Action');
    const state = trackingReducer(undefined, action);
    expect(state).toEqual([]);
  });
});

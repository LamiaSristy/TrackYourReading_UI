import bookReducer from '../../reducers/bookReducer';
import {
  fetchUserBook, createBook, updateBook, deleteBook,
} from '../../actions/book';

describe('Book Reducer', () => {
  it('Should return the default state', () => {
    const state = bookReducer(undefined, {});
    expect(state).toEqual([]);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = fetchUserBook('Action');
    const state = bookReducer(undefined, action);
    expect(state).toEqual([]);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = createBook('Action');
    const state = bookReducer(undefined, action);
    expect(state).toEqual([]);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = updateBook('Action');
    const state = bookReducer(undefined, action);
    expect(state).toEqual([]);
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = deleteBook('Action');
    const state = bookReducer(undefined, action);
    expect(state).toEqual([]);
  });
});

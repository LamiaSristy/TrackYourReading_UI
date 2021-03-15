import axios from 'axios';
import { fetchUserBookUrl, createBookUrl, updateBookUrl, deleteBookUrl } from '../helpers/apiEndpoints';
export const DISPLAY_FETCHED_BOOK = 'DISPLAY FETCHED BOOK';
export const CREATE_BOOK = 'CREATE BOOK';
export const CREATE_BOOK_ERROR = 'CREATE BOOK ERROR';
export const UPDATE_BOOK = 'UPDATE BOOK';
export const DELETE_BOOK = 'DELETE BOOK';

export const fetchUserBook = id => dispatch => axios.get(fetchUserBookUrl(id))
  .then(response => response.data)
  .then(data => {
    dispatch({
      type: DISPLAY_FETCHED_BOOK,
      payload: data,
    });
  })
  .catch(error => {
    throw (error);
});

export const createBook = data => async dispatch => {
    try {
      const response = await axios({
        method: 'POST',
        url: createBookUrl(data.user_id),
        data,
        crossdomain: true,
        withCredentials: true,
      });
      dispatch({
        type: CREATE_BOOK,
        data: {
          ...data,
          id: response.data.id ? response.data.id : null,
        },
  
      });
    } catch (error) {
      dispatch({ type: CREATE_BOOK_ERROR, payload: error });
    }
};

export const updateBook = data => async dispatch => {
  try {
    dispatch({ type: UPDATE_BOOK, payload: data });
    const response = await axios({
      method: 'PATCH',
      url: updateBookUrl(data.user_id, data.id),
      data,
      crossdomain: true,
      withCredentials: true,
    });
    return response;
    } catch (error) {
    return (error);
  }
};

export const deleteBook = data => async dispatch => {
  try {
    dispatch({ type: DELETE_BOOK, payload: data });
    const response = await axios({
      method: 'DELETE',
      url: deleteBookUrl(data.user_id, data.id),
      data,
      crossdomain: true,
      withCredentials: true,
    });
    return response;
    } catch (error) {
    return (error);
  }
};
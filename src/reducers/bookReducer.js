import { DISPLAY_FETCHED_BOOK, CREATE_BOOK, DELETE_BOOK, UPDATE_BOOK } from '../actions/book';

let updateObj = {};
let objIndex = {};
let updatedState = [];

export default function bookReducer(state = [], action) {
  switch (action.type) {
    case DISPLAY_FETCHED_BOOK:
      return action.payload;
    case CREATE_BOOK:
      return [...state, action.data];
    case DELETE_BOOK:
      return state.filter(el => el.id !== action.payload.id);
    case UPDATE_BOOK:
      objIndex = state.findIndex(obj => obj.id === action.payload.id);
      updateObj = {
        ...state[objIndex],
        name: action.payload.name,
        author: action.payload.author,
        genre: action.payload.genre,
        pages: action.payload.pages,
      };
      updatedState = [
        ...state.slice(0, objIndex),
        updateObj,
        ...state.slice(objIndex + 1),
      ];
      return updatedState;
    default:
      return state;
  }
}
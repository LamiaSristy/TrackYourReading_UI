import {
  DISPLAY_FETCHED_DAYS, CREATE_DAY, DELETE_DAY, UPDATE_DAY,

} from '../actions/trackings';

let objIndex = {};
let updateElement = {};
let updatedState = [];

export default function trackingReducer(state = [], action) {
  switch (action.type) {
    case DISPLAY_FETCHED_DAYS:
      return action.payload;
    case CREATE_DAY:
      return [...state, action.data];
    case DELETE_DAY:
      return state.filter(el => el.id !== action.payload.id);
    case UPDATE_DAY:
      objIndex = state.findIndex(obj => obj.id === action.payload.id);

      updateElement = {
        ...state[objIndex],
        date: action.payload.date,
        page_no: action.payload.page_no,
      };
      updatedState = [
        ...state.slice(0, objIndex),
        updateElement,
        ...state.slice(objIndex + 1),
      ];
      return updatedState;
    default:
      return state;
  }
}

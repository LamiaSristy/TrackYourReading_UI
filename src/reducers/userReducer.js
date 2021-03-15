import {
  CREATE_USER, CREATE_USER_ERROR, LOGIN_USER,
  LOGOUT_USER, LOGGED_IN, LOGGED_IN_ERROR,
} from '../actions/user';

const initialState = {
  isLogin: false,
  user: {
    username: '',
    id: 0,
  },
  errors: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        isLogin: true,
        user: {
          username: action.payload.user.username,
          password: action.payload.user.password,
          id: action.payload.user.id,
        },
      };
    case LOGGED_IN_ERROR:
      return {
        isLogin: false,
        user: {},
      };

      case CREATE_USER:
        const newState = {
          isLogin: true,
          user: {
            id: action.payload.id,
            username: action.payload.username,
            password: action.payload.password,
            passwordConfirmation: action.payload.passwordConfirmation,
          },
        };
        localStorage.setItem('userState', JSON.stringify(newState));
        return newState;
    // case CREATE_USER:
    //   return {
    //     isLogin: true,
    //     user: {
    //       id: action.payload.id,
    //       username: action.payload.username,
    //       password: action.payload.password,
    //       passwordConfirmation: action.payload.passwordConfirmation,
    //     },
    //   };
    case CREATE_USER_ERROR:
      return {
        isLogin: false,
        error: action.payload,
      };
    case LOGIN_USER:
      if (action.payload.user) {
        const newState = {
          isLogin: true,
          user: {
            username: action.payload.user.username,
            id: action.payload.user.id,
          },
          errors: []
        };
        localStorage.setItem('userState', JSON.stringify(newState));
        return newState;
        // return {
        //   isLogin: true,
        //   user: {
        //     username: action.payload.user.username,
        //     id: action.payload.user.id,
        //   },
        // };
      }
      return {
        isLogin: false,
        errors: action.payload.errors,
      };
    case LOGOUT_USER:
      localStorage.removeItem('userState');
      return {
        isLogin: false,
        user: {},
        books: {},
      };

    default: 
      const savedState = JSON.parse(localStorage.getItem('userState'))
      return savedState == null ? state : savedState;
      // return {
      //   //...state,
      //   savedState
      // };
  }
};
export default userReducer;

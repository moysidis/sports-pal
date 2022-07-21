import React, { useReducer, createContext } from 'react';

const UsersContext = createContext();

const SET_USERS = 'SET_USERS';
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const SET_CURRENT_USER_MESSAGES = 'SET_CURRENT_USER_MESSAGES';
const ADD_TO_CURRENT_USER_MESSAGES = 'ADD_TO_CURRENT_USER_MESSAGES';

const usersReducer = (state, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, userDocs: [...action.userDocs] };
    case SET_CURRENT_USER:
      return { ...state, currentUser: { ...action.currentUser } };
    case SET_CURRENT_USER_MESSAGES:
      return { ...state, userMessages: [...action.userMessages] };
    case ADD_TO_CURRENT_USER_MESSAGES:
      return {
        ...state,
        userMessages: [...state.userMessages, ...action.userMessages],
      };
    default:
      return state;
  }
};

export const UsersProvider = ({ children }) => {
  const initialState = {
    userDocs: [],
    currentUser: null,
    userMessages: [],
  };

  const [usersState, dispatch] = useReducer(usersReducer, initialState);

  const setUsers = (docs) => {
    console.log('action', docs.length);
    dispatch({ type: SET_USERS, userDocs: docs });
  };

  const setCurrentUserData = (cUser) => {
    dispatch({ type: SET_CURRENT_USER, currentUser: cUser });
  };

  const setCurrentUserMessages = (userMessages) => {
    dispatch({ type: SET_CURRENT_USER_MESSAGES, userMessages });
  };

  const addToCurrentUserMessages = (userMessages) => {
    dispatch({ type: ADD_TO_CURRENT_USER_MESSAGES, userMessages });
  };

  return (
    <UsersContext.Provider
      value={{
        usersState,
        setUsers,
        setCurrentUserData,
        setCurrentUserMessages,
        addToCurrentUserMessages,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;

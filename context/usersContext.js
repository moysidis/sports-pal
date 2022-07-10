import React, { useReducer, createContext } from 'react';

const UsersContext = createContext();

const SET_USERS = 'SET_USERS';
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const UPDATE_USER = 'UPDATE_USER';

const usersReducer = (state, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, userDocs: [...action.userDocs] };
    case SET_CURRENT_USER:
      return { ...state, currentUser: { ...action.currentUser } };
    case UPDATE_USER:
      const theDoc = state.userDocs.find(
        (doc) => doc.id === action.updatedData.id
      );
      console.log('Found the Doc', theDoc);
      return { ...state };
    default:
      return state;
  }
};

export const UsersProvider = ({ children }) => {
  const initialState = {
    userDocs: [],
    currentUser: null,
  };

  const [usersState, dispatch] = useReducer(usersReducer, initialState);

  const setUsers = (docs) => {
    console.log('action', docs.length);
    dispatch({ type: SET_USERS, userDocs: docs });
  };

  const setCurrentUserData = (cUser) => {
    dispatch({ type: SET_CURRENT_USER, currentUser: cUser });
  };

  return (
    <UsersContext.Provider value={{ usersState, setUsers, setCurrentUserData }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;

import { combineReducers } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import commonReducer from "./common-reducer";
import authReducer from "./auth-reducer";
import { thunk } from 'redux-thunk'
import appReducer from "./app-reducer";
import { configureStore } from '@reduxjs/toolkit';

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  commonPage: commonReducer,
  auth: authReducer,
  app: appReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store;
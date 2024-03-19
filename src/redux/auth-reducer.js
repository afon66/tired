import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../api/api";

// const SET_USER_DATA = 'auth/SET_USER_DATA';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData(state, action) {
      const { userId, email, login, isAuth } = action.payload
      state.userId = userId
      state.email = email
      state.login = login
      state.isAuth = isAuth
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthUserData.fulfilled, (state, action) => {
        const { userId, email, login, isAuth } = action.payload;
        state.userId = userId;
        state.email = email;
        state.login = login;
        state.isAuth = isAuth;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userId = null;
        state.email = null;
        state.login = null;
        state.isAuth = false;
      });
  }
})

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_USER_DATA:
//       return {
//         ...state,
//         ...action.payload,
//       }

//     default:
//       return state;
//   }
// }

// export const setAuthUserData = (userId, email, login, isAuth) => ({
//   type: SET_USER_DATA, payload:
//     { userId, email, login, isAuth }
// });

export const getAuthUserData = createAsyncThunk(
  'auth/getAuthUserData',
  async () => {
    const response = await authAPI.me();
    if (response.data.resultCode === 0) {
      const { id, login, email } = response.data.data;
      return { userId: id, email, login, isAuth: true };
    } else {
      throw new Error('Unable to fetch user data');
    }
  }
);

// export const getAuthUserData = () => async (dispatch) => {
//   let response = await authAPI.me()

//   if (response.data.resultCode === 0) {
//     let { id, login, email } = response.data.data;
//     dispatch(setAuthUserData(id, email, login, true));
//   }
// }

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }, { dispatch }) => {
    const response = await authAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData())
      return response.data;
    } else {
      throw new Error('Login failed');
    }
  }
);

// export const login = (email, password, rememberMe) => async (dispatch) => {
//   let response = await authAPI.login(email, password, rememberMe)

//   if (response.data.resultCode === 0) {
//     dispatch(getAuthUserData())
//   }
// }

// export const logout = () => async (dispatch) => {
//   let response = await authAPI.logout()

//   if (response.data.resultCode === 0) {
//     dispatch(setAuthUserData(null, null, null, false));
//   }
// }

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
      return null;
    } else {
      throw new Error('Logout failed');
    }
  }
);

export const { setUserData } = authReducer.actions
export default authReducer.reducer;
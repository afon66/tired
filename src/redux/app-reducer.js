import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthUserData } from "./auth-reducer";

// const SET_INITIALIZED = 'SET_INITIALIZED';

let initialState = {
  initialized: false
};

const appReducer = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialized(state) {
      state.initialized = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(initializeApp.fulfilled, (state) => {
      state.initialized = true;
    });
  }
})

// const appReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_INITIALIZED:
//       return {
//         ...state,
//         initialized: true,
//       }
//     default:
//       return state;
//   }
// } 


// export const initialized = () => ({ type: SET_INITIALIZED });

export const initializeApp = createAsyncThunk(
  'app/initializeApp',
  async (_, { dispatch }) => {
    await dispatch(getAuthUserData());
  }
);

// export const initializeApp = () => (dispatch) => {
//   let promise = dispatch(getAuthUserData());
//   promise.then(() => { dispatch(initialized()) })
// }

export const { setInitialized } = appReducer.actions;
export default appReducer.reducer;

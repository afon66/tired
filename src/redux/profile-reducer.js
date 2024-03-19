import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { usersAPI, profileAPI } from "../api/api";

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 12 },
    { id: 2, message: 'It\'s my first post', likesCount: 11 },
    { id: 3, message: 'Blabla', likesCount: 11 },
    { id: 4, message: 'Dada', likesCount: 11 }
  ],
  profile: null,
  status: '',
};

const profileReducer = createSlice({
  name: 'profilePage',
  initialState,
  reducers: {
    addPost(state, action) {
      const newPost = {
        id: state.posts.length + 1,
        message: action.payload,
        likesCount: 0
      }
      state.posts.push(newPost);
    },
    setProfileDesc: (state, action) => {
      state.profile = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.status = action.payload;
      });
  },
})

export const getProfile = createAsyncThunk('profilePage/getProfile',
  async (userId, { dispatch }) => {
    const data = await usersAPI.getProfile(userId);
    // dispatch(setProfileDesc(data))
    return data;
  });

// export const getProfile = (userId) => async (dispatch) => {
//   let data = await usersAPI.getProfile(userId)
//   dispatch(setProfileDesc(data));
// }

// export const getStatus = (userId) => async (dispatch) => {
//   let response = await profileAPI.getStatus(userId)
//   dispatch(setStatus(response.data))
// }

// export const updateStatus = (status) => async (dispatch) => {
//   let response = await profileAPI.updateStatus(status)

//   if (response.data.resultCode === 0) {
//     dispatch(setStatus(status))
//   }
// }

export const getStatus = createAsyncThunk('profilePage/getStatus',
  async (userId, { dispatch }) => {
    const response = await profileAPI.getStatus(userId);
    // dispatch(setStatus(response.data))
    return response.data;
  });

export const updateStatus = createAsyncThunk('profilePage/updateStatus',
  async (status, { dispatch }) => {
    const response = await profileAPI.updateStatus(status);
    // dispatch(setStatus(status))
    return response.data;
  });

export const { addPost, setProfileDesc, setStatus } = profileReducer.actions;
export default profileReducer.reducer;
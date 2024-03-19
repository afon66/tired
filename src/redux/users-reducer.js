import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersAPI } from '../api/api';
import { toggleIsFetching } from './common-reducer';

const initialState = {
  users: [],
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 1,
  followingInProgress: [],
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async ({ currentPage, pageSize }, { dispatch }) => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    return data;
  }
);

const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    follow(state, action) {
      const userId = action.payload;
      state.users = state.users.map(user =>
        user.id === userId ? { ...user, followed: true } : user
      );
    },
    unfollow(state, action) {
      const userId = action.payload;
      state.users = state.users.map(user =>
        user.id === userId ? { ...user, followed: false } : user
      );
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setUsersTotalCount(state, action) {
      state.totalUsersCount = action.payload;
    },
    toggleFollowingProgress(state, action) {
      const { isFetching, userId } = action.payload;
      if (isFetching) {
        state.followingInProgress.push(userId);
      } else {
        state.followingInProgress = state.followingInProgress.filter(
          id => id !== userId
        );
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload.items;
      state.totalUsersCount = action.payload.totalCount;
    });
  },
});

export const {
  follow,
  unfollow,
  setCurrentPage,
  setUsersTotalCount,
  toggleFollowingProgress,
} = usersReducer.actions;

export default usersReducer.reducer;


// import { createSlice } from "@reduxjs/toolkit";
// import { usersAPI } from "../api/api";
// import { toggleIsFetching } from "../redux/common-reducer";

// const FOLLOW = 'FOLLOW';
// const UNFOLLOW = 'UNFOLLOW';
// const SET_USERS = 'SET_USERS';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
// const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'

// let initialState = {
//   users: [],
//   pageSize: 100,
//   totalUsersCount: 0,
//   currentPage: 1,
//   followingInProgress: [],
// };

// const usersSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {
//     follow(state, action) {
//       state.users = state.users.map(u => {
//         if (u.id === action.payload) {
//           return { ...u, followed: true }
//         }
//         return u;
//       })
//     },
//     unfollow(state, action) {
//       state.users = state.users.map(u => {
//         if (u.id === action.payload) {
//           return { ...u, followed: false }
//         }
//         return u;
//       })
//     },
//     setUsers(state, action) {
//       state.users = action.payload
//     },
//     setCurrentPage(state, action) {
//       state.currentPage = action.payload
//     },
//     setTotalUsersCount(state, action) {
//       state.totalUsersCount = action.payload
//     },
//     setToggleFollowingProgress(state, action) {
//       const { isFetching, userId } = action.payload
//       state.followingInProgress = isFetching
//         ? state.followingInProgress = userId
//         : state.followingInProgress.filter(id => id != userId)
//     },
//   },
//   extraReducers: {

//   }
// })

// const usersReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case TOGGLE_FOLLOWING_PROGRESS: {
//       return {
//         ...state,
//         followingInProgress: action.isFetching
//           ? [...state.followingInProgress, action.userId]
//           : state.followingInProgress.filter(id => id != action.userId)
//       }
//     }
//     default:
//       return state;
//   }
// }

// export const followSuccess = (userId) => ({ type: FOLLOW, userId })
// export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
// export const setUsers = (users) => ({ type: SET_USERS, users })
// export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
// export const setUsersTotalCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
// export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId })

// export const getUsers = (currentPage, pageSize) => async (dispatch) => {
//   dispatch(toggleIsFetching(true));

//   let data = await usersAPI.getUsers(currentPage, pageSize)
//   dispatch(toggleIsFetching(false));
//   dispatch(setUsers(data.items));
//   dispatch(setUsersTotalCount(data.totalCount));
// }

// let followUnfollowFunc = async (dispatch, userId, apiMethod, actionCreator) => {
//   dispatch(toggleFollowingProgress(true, userId));
//   let data = await apiMethod(userId)
//   if (data.resultCode === 0) {
//     dispatch(actionCreator(userId));
//   }
//   dispatch(toggleFollowingProgress(false, userId));
// }

// export const follow = (userId) => async (dispatch) => {
//   followUnfollowFunc(dispatch, userId, usersAPI.follow, followSuccess)
// }

// export const unfollow = (userId) => async (dispatch) => {
//   followUnfollowFunc(dispatch, userId, usersAPI.unfollow, unfollowSuccess)
// }

// export default usersReducer;

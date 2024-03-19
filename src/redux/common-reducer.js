const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
  isFetching: false,
}

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.fetch
      }
    default:
      return state
  }
}

export const toggleIsFetching = (fetch) => ({ type: TOGGLE_IS_FETCHING, fetch })

export default commonReducer;
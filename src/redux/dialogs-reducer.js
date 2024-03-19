import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialogs: [
    { id: 1, name: 'Dimych' },
    { id: 2, name: 'Andrew' },
    { id: 3, name: 'Sveta' },
    { id: 4, name: 'Sasha' },
    { id: 5, name: 'Viktor' },
    { id: 6, name: 'Valera' }
  ],
  messages: [
    { id: 1, userId: 1, message: 'Hi' },
    { id: 2, userId: 2, message: 'How is your it-kamasutra?' },
    { id: 3, userId: 3, message: 'Yo' },
    { id: 4, userId: 4, message: 'Yo' },
    { id: 5, userId: 5, message: 'Yo' }
  ],
};

const dialogsReducer = createSlice({
  name: 'dialogsPage',
  initialState,
  reducers: {
    sendMessage(state, action) {
      let mes = {
        id: state.messages.length + 1,
        userId: action.payload.userId,
        message: action.payload.value,
      }
      state.messages.push(mes)
    }
  }
})

export const { sendMessage } = dialogsReducer.actions
export default dialogsReducer.reducer;
import { createSlice } from "@reduxjs/toolkit";

export interface MessageProps {
  message: string;
  sLocation?: string;
  sEmail: string;
  sName: string;
  _id: string;
  dateSent: string;
}

interface messageReducerProps {
  messages: null | MessageProps[];
}

const initialState: messageReducerProps = {
  messages: null,
};

const messageslice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    setmessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setmessages } = messageslice.actions;
export default messageslice.reducer;

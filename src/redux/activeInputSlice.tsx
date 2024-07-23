import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActiveInput: false,
};

const activeInputSlice = createSlice({
  name: "activeInput",
  initialState,
  reducers: {
    inputOn: (state) => {
      state.isActiveInput = true;
    },
    inputOff: () => {
      return initialState;
    },
  },
});

export const { inputOn, inputOff } = activeInputSlice.actions;
export default activeInputSlice.reducer;

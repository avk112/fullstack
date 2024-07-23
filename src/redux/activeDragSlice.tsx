import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActiveDrag: false,
};

const activeDragSlice = createSlice({
  name: "activeDrag",
  initialState,
  reducers: {
    turnOn: (state) => {
      state.isActiveDrag = true;
    },
    turnOff: () => {
      return initialState;
    },
  },
});

export const { turnOn, turnOff } = activeDragSlice.actions;
export default activeDragSlice.reducer;

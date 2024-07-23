import { configureStore } from "@reduxjs/toolkit";
import activeDragSliceReducer from "./activeDragSlice";
import activeInputSliceReducer from "./activeInputSlice";
import userSliceReducer from "./userSlice";

const store = configureStore({
  reducer: {
    activeDrag: activeDragSliceReducer,
    activeInput: activeInputSliceReducer,
    user: userSliceReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import todoReducers from "./features/TodoSlice";

const store = configureStore({
  reducer: { todos: todoReducers },
});

export default store;

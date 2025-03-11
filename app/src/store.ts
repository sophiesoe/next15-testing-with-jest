import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducers from "./features/TodoSlice";

// combined reducers
const rootReducer = combineReducers({
  todos: todoReducers,
});
// Function to create a new store instance
export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
const store = createStore();

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;

export type AppDispatch = typeof store.dispatch;

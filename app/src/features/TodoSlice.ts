import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  text: string;
}

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    {
      id: uuidv4(),
      text: "Feed dog",
    },
    {
      id: uuidv4(),
      text: "Study testing",
    },
  ] as Todo[],
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.push({ id: uuidv4(), text: action.payload });
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, deleteTodo } = todoSlice.actions;

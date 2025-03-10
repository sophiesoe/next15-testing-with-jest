"use client";

import { useFormik } from "formik";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  text: string;
}

const todoSlice = createSlice({
  name: "todos",
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.push({ id: uuidv4(), text: action.payload });
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

const store = configureStore({ reducer: { todos: todoSlice.reducer } });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export default function Home() {
  return (
    <Provider store={store}>
      <TodoComponent />
    </Provider>
  );
}

function TodoComponent() {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: { text: "" },
    onSubmit: (values, { resetForm }) => {
      if (values.text.trim() !== "") {
        dispatch(todoSlice.actions.addTodo(values.text));
        resetForm();
      } else {
        alert("Please enter a task.");
      }
    },
  });

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4" data-testId="title">
        Todo App
      </h1>
      <form onSubmit={formik.handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          name="text"
          value={formik.values.text}
          onChange={formik.handleChange}
          placeholder="Enter a task"
          className="border p-2 flex-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-2 border-b"
          >
            {todo.text}
            <button
              onClick={() => dispatch(todoSlice.actions.deleteTodo(todo.id))}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

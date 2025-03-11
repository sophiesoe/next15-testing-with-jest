"use client";

import { Provider } from "react-redux";
import ToDo from "../../sections/todo/Todo.section";
import store from "../../store";

export default function Home() {
  return (
    <Provider store={store}>
      <ToDo />
    </Provider>
  );
}

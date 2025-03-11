import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import TodoItem from "../../commons/todo/TodoItem.common";
import { deleteTodo } from "../../features/TodoSlice";

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

function TodoList() {
  const dispatch = useDispatch<AppDispatch>();

  const todos = useSelector((state: RootState) => state.todos);

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={() => dispatch(deleteTodo(todo.id))}
        />
      ))}
    </ul>
  );
}

export default TodoList;

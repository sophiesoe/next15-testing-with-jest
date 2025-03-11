import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import TodoItem from "../../commons/todo/TodoItem.common";
import { deleteTodo } from "../../features/TodoSlice";

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

import AddTodo from "../../components/add-todo/AddTodo.component";
import TodoList from "../../components/todo-list/TodoList.component";

function Todo() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4" data-testid="title">
        Todo App
      </h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}
export default Todo;

type TodoProps = {
  todo: {
    id: string;
    text: string;
  };
  deleteTodo: () => void;
};

function TodoItem({ todo, deleteTodo }: TodoProps) {
  return (
    <li className="flex justify-between items-center p-2 border-b">
      {todo.text}
      <button onClick={deleteTodo} className="text-red-500">
        Delete
      </button>
    </li>
  );
}

export default TodoItem;

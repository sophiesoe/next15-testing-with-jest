import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "./TodoList.component";
import { deleteTodo } from "../../features/TodoSlice";
import { TodoProps } from "../../commons/todo/TodoItem.common";

// Mock the react-redux hooks
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock the TodoItem component
jest.mock("../../commons/todo/TodoItem.common", () => {
  const MockTodoItem = (props: TodoProps) => (
    <li>
      {props.todo.text}
      <button onClick={props.deleteTodo}>Delete</button>
    </li>
  );

  // Add displayName to the mock component
  MockTodoItem.displayName = "MockTodoItem";

  return MockTodoItem;
});

describe("TodoList Component", () => {
  const mockDispatch = jest.fn();
  const mockTodos = [
    { id: "1", text: "Learn React" },
    { id: "2", text: "Write Tests" },
  ];

  beforeEach(() => {
    // Mock useSelector to return the mockTodos
    (useSelector as unknown as jest.Mock).mockImplementation((callback) =>
      callback({ todos: mockTodos })
    );

    // Mock useDispatch to return the mockDispatch function
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the list of todos", () => {
    render(<TodoList />);

    // Check if all todos are rendered
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Write Tests")).toBeInTheDocument();
  });

  it("calls deleteTodo when the delete button is clicked", () => {
    render(<TodoList />);

    // Find the delete button for the first todo and click it
    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    // Check if the deleteTodo action was dispatched with the correct id
    expect(mockDispatch).toHaveBeenCalledWith(deleteTodo("1"));
  });
});

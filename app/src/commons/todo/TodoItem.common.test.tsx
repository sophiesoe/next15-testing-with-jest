import { fireEvent, render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem.common";

describe("Todo Item Common", () => {
  const mockTodo = {
    id: "1",
    text: "Mock Todo",
  };

  const mockDeleteTodo = jest.fn();

  beforeEach(() => {
    render(<TodoItem todo={mockTodo} deleteTodo={mockDeleteTodo} />);
  });

  it("should render correctly", () => {
    expect(screen.getByText(/Mock Todo/i)).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", { name: /delete/i });

    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass("text-red-500");
  });

  it("should delete single todo correctly", () => {
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    // click delete button
    fireEvent.click(deleteButton);

    // Check if the deleteTodo function was called
    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
  });
});

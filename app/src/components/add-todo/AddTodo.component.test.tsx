// AddTodo.component.test.tsx
import { render, fireEvent, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import AddTodo from "./AddTodo.component";
import { AppStore, createStore } from "../../store";

// Mock window.alert
window.alert = jest.fn();

describe("AddTodo Component", () => {
  let store: AppStore;
  beforeEach(() => {
    // Reset the store before each test
    store = createStore();

    // render before each test
    render(
      <Provider store={store}>
        <AddTodo />
      </Provider>
    );
  });

  it("renders correctly", () => {
    expect(screen.getByPlaceholderText("Enter a task")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("submits the form with a valid task", async () => {
    const input = screen.getByPlaceholderText("Enter a task");
    const button = screen.getByRole("button", { name: "Add" });

    // Simulate user typing a task
    await act(async () => {
      fireEvent.change(input, { target: { value: "New Test Task" } });
      fireEvent.click(button);
    });

    // Check if the addTodo action was dispatched
    const state = store.getState();
    expect(state.todos).toContainEqual({
      id: expect.any(String),
      text: "New Test Task",
    });

    // Check if the input is cleared after submission
    expect(input).toHaveValue("");
  });

  it("does not submit the form with an empty task", async () => {
    const button = screen.getByRole("button", { name: "Add" });

    // Simulate form submission without entering a task
    await act(async () => {
      fireEvent.click(button);
    });

    // Check if no todos were added
    const state = store.getState();
    expect(state.todos).toHaveLength(0);

    // Check if the alert is shown
    expect(window.alert).toHaveBeenCalledWith("Please enter a task.");
  });

  it("updates the input field correctly", async () => {
    const input = screen.getByPlaceholderText("Enter a task");

    // Simulate user typing a task
    await act(async () => {
      fireEvent.change(input, { target: { value: "New Task" } });
    });

    // Check if the input value is updated
    expect(input).toHaveValue("New Task");
  });
});

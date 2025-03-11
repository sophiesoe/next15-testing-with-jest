import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home.page";

describe("TodoComponent", () => {
  //  before each test, render TodoApp
  beforeEach(() => {
    render(<Home />);
  });

  test("render the title", async () => {
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
  });

  
});

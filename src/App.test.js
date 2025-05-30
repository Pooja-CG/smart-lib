import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

test("renders HomePage content", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  // Make sure this matches some text in your HomePage component!
  const heading = screen.getByText(/welcome to smartlib/i);
  expect(heading).toBeInTheDocument();
});

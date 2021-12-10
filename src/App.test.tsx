import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const numIterations = 100;

for (let i = 0; i < numIterations; i++) {
  it(`${i} - can fill out a form`, () => {
    render(<App />);
    const nameInput = screen.getByRole("textbox", {
      name: /name/i,
    });
    const ageInput = screen.getByRole("spinbutton", {
      name: /age/i,
    });
    const titleInput = screen.getByRole("textbox", {
      name: /title/i,
    });

    userEvent.type(nameInput, "john");
    userEvent.type(ageInput, "23");
    userEvent.type(titleInput, "carpenter");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    screen.getByText(/Submitted data: Name: john, Age: 23, Title: carpenter/i);
  });
}

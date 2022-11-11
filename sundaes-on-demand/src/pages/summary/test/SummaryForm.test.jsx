import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("checkbox is unchecked and button is disabled by default", () => {
  render(<SummaryForm />);

  const checkboxButton = screen.getByRole("button", { name: /confirm order/i });
  expect(checkboxButton).toBeInTheDocument();
  expect(checkboxButton).toBeDisabled();

  const checkbox = screen.getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();
});

test("checking checkbox enables button, checking it again disables button", () => {
  render(<SummaryForm />);

  const checkboxButton = screen.getByRole("button", { name: /confirm order/i });
  const checkbox = screen.getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });

  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(checkboxButton).toBeEnabled();

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(checkboxButton).toBeDisabled();
});

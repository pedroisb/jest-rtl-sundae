import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";
// userEvent is imported directly from default instead of destructuring

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

test("checking checkbox enables button, checking it again disables button", async () => {
  render(<SummaryForm />);

  // setup method is necessary to create a user instance
  const user = userEvent.setup();

  const checkboxButton = screen.getByRole("button", { name: /confirm order/i });
  const checkbox = screen.getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });

  // we have changed fireEvent.click to use user.click below

  // userEvent results in a promise, therefore we'll need to use await
  // in order to use await, you'll have to make the test function async
  await user.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(checkboxButton).toBeEnabled();

  await user.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(checkboxButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);

  const user = userEvent.setup();

  //popover starts hidden
  const nullPopover = screen.queryByText(/no icecream will actually be delivered/i)
  expect(nullPopover).not.toBeInTheDocument();
  //queryBy is used instead of getBy when we expect the element NOT to be in the document

  //popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  await userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/no icecream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover disappears when we mouse out
  await userEvent.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});

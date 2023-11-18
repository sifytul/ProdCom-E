import SignIn from "@/app/auth/signin/page";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

function renderAndGrabElements() {
  render(<SignIn />);

  const emailFields = screen.getByRole("textbox");
  const passwordFields = screen.getByPlaceholderText("password");
  const button = screen.getByRole("button", { name: /sign in/i });
  const link = screen.getByRole("link", { name: /sign up/i });

  return {
    emailFields,
    passwordFields,
    button,
    link,
  };
}

describe("SignIn", () => {
  test("render email and password input fields and a button with 'sign in' text", () => {
    const { emailFields, passwordFields, button } = renderAndGrabElements();

    expect(emailFields).toBeInTheDocument();
    expect(passwordFields).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('render Sign Up link" ', () => {
    const { link } = renderAndGrabElements();

    expect(link).toBeInTheDocument();

    expect(link).toHaveTextContent("Sign Up");
  });

  test("if email or password is empty, then the button will be disabled", () => {
    const { button } = renderAndGrabElements();
    expect(button).toBeDisabled();
  });

  test("if the email and password not empty, then the the sign in button should be active", () => {
    const { emailFields, passwordFields, button } = renderAndGrabElements();

    fireEvent.change(emailFields, { target: { value: "sifat@email.com" } });

    // expect(button).toBeDisabled();

    fireEvent.change(passwordFields, { target: { value: "password" } });
    expect(button).toBeEnabled();
  });
});

afterEach(() => {
  cleanup();
});

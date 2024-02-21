import SignUp from "@/app/(client)/auth/signup/page";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

const renderAndGrabElements = () => {
  render(<SignUp />);

  const nameFields = screen.getByPlaceholderText("Your name");
  const emailFields = screen.getByPlaceholderText("Your email address");
  const passwordFields = screen.getByPlaceholderText("password");
  const button = screen.getByRole("button", { name: /sign up/i });
  const link = screen.getByRole("link", { name: /sign in/i });

  return {
    nameFields,
    emailFields,
    passwordFields,
    button,
    link,
  };
};

describe("SignUp", () => {
  test("render name, email and password input fields and a button with 'sign up' text", () => {
    const { nameFields, emailFields, passwordFields, button } =
      renderAndGrabElements();

    expect(nameFields).toBeInTheDocument();
    expect(emailFields).toBeInTheDocument();
    expect(passwordFields).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("render Sign In link", () => {
    const { link } = renderAndGrabElements();
    expect(link).toBeInTheDocument();

    expect(link).toHaveTextContent("Sign in");
  });

  test("if email or password is empty, then the button will be disabled", () => {
    const { button } = renderAndGrabElements();
    expect(button).toBeDisabled();
  });

  test("if the email and password not empty, then the the sign up button should be active", () => {
    const { nameFields, emailFields, passwordFields, button } =
      renderAndGrabElements();

    expect(button).toBeDisabled();

    fireEvent.change(nameFields, { target: { value: "sifat" } });
    fireEvent.change(emailFields, { target: { value: "sifat@email.com" } });
    fireEvent.change(passwordFields, { target: { value: "password" } });
    expect(button).toBeEnabled();
  });
});

afterEach(() => {
  cleanup();
});

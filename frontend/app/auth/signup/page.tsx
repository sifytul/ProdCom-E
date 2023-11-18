"use client";
import Button from "@/components/shared/Button";
import InputField from "@/components/shared/InputField";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

type Props = {};

const SignUp = (props: Props) => {
  const initialValue = {
    name: "",
    email: "",
    password: "",
    termsAccepted: false,
  };
  const [formState, setFormState] = useState({ ...initialValue });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormState({
      ...formState,
      [e.target.name]: e.target.value || !e.target.checked,
    });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //TODO: Need to implement submission
  };

  const isSignUpButtonDisabled = () => {
    const { name, email, password } = formState;
    return !(name && email && password);
  };

  return (
    <>
      {/* right section  */}
      <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
      <p className="text-neutral-gray font-inter mb-8">
        Already have an account?{" "}
        <span className="text-primary font-semibold">
          <Link href={"/auth/signin"}>Sign in</Link>
        </span>
      </p>
      <form
        onSubmit={submitHandler}
        className="flex flex-col w-full space-y-8 font-inter"
      >
        <InputField
          name="name"
          placeholder="Your name"
          value={formState.name}
          changeHandler={changeHandler}
        />
        <InputField
          name="email"
          placeholder="Your email address"
          // Icon={BsFillPersonFill}
          value={formState.email}
          changeHandler={changeHandler}
        />
        <InputField
          name="password"
          placeholder="password"
          value={formState.password}
          changeHandler={changeHandler}
          passwordField
        />
        <div className="flex justify-between items-center">
          <input
            name="rememberMe"
            checked={formState.termsAccepted}
            type="checkbox"
            onChange={changeHandler}
            placeholder="terms & conditions"
          />
          <span className="text-neutral-gray pl-2">
            I agree with{" "}
            <span className="font-semibold text-neutral-black">
              Privacy Policy
            </span>{" "}
            and{" "}
            <span className="font-semibold text-neutral-black">
              Terms of Use
            </span>
          </span>
        </div>
        <Button
          text="Sign Up"
          type="submit"
          disabled={isSignUpButtonDisabled()}
        />
      </form>
    </>
  );
};

export default SignUp;

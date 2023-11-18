"use client";
import Button from "@/components/shared/Button";
import InputField from "@/components/shared/InputField";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

type Props = {};

const SignIn = (props: Props) => {
  const initialValue = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const [formState, setFormState] = useState({ ...initialValue });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormState({
      ...formState,
      [e.target.name]: e.target.value || !e.target.checked,
    });
    console.log(e);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //TODO: Need to implement submission
  };

  let isSignInButtonDisabled = !(formState.email && formState.password);

  return (
    <>
      {/* right section  */}
      <h1 className="text-2xl font-semibold mb-6">Sign In</h1>
      <p className="text-neutral-gray font-inter mb-8">
        Don&apos;t have an account yet?{" "}
        <span className="text-primary font-semibold">
          <Link href={"/auth/signup"}>Sign Up</Link>
        </span>
      </p>
      <form
        onSubmit={submitHandler}
        className="flex flex-col w-full space-y-8 font-inter"
      >
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
          <div>
            <input
              name="rememberMe"
              checked={formState.rememberMe}
              type="checkbox"
              onChange={changeHandler}
              placeholder="remember me"
            />
            <span className="text-neutral-gray pl-2">Remember me</span>
          </div>
          <p className="font-semibold">Forgot password?</p>
        </div>
        <Button
          text="Sign In"
          type="submit"
          disabled={isSignInButtonDisabled}
        />
      </form>
    </>
  );
};

export default SignIn;

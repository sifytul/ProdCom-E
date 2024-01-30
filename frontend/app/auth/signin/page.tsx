"use client";
import { Button } from "@/components/ui/button";
import InputField from "@/components/shared/InputField";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store";
import { setAuth, setJid, setUser } from "@/store/slices/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean(),
});

type TFormData = z.infer<typeof formSchema>;

const SignIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const params = useSearchParams();
  const redirectTo = params.get("redirect");

  const initialValue = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValue,
  });

  const submitHandler = async (data: TFormData) => {
    //TODO: Need to implement submission

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/auth/signin",
        {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          mode: "cors",
        }
      );

      const responseData = await res.json();
      if (!res.ok) {
        if (responseData.message) {
          responseData.message.forEach((message) => {
            toast.error(message);
          });
        } else if (responseData.errors) {
          responseData.errors.forEach((error) => {
            toast.error(error.message);
          });
        }
        return;
      }

      dispatch(setAuth(true));
      dispatch(setUser(responseData.data));
      dispatch(setJid(responseData.accessToken));

      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push("/");
      }
      toast.success("Welcome back Chief!");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <>
      {/* right section  */}
      <h1 className="text-2xl font-semibold mb-6">Sign In</h1>
      <p className="text-neutral-gray font-inter mb-8">
        Don&apos;t have an account yet?{" "}
        <span className="text-accent font-semibold">
          {redirectTo ? (
            <Link href={"/auth/signup?redirect=" + redirectTo}>Sign Up</Link>
          ) : (
            <Link href={"/auth/signup"}>Sign Up</Link>
          )}
        </span>
      </p>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col w-full space-y-6 font-inter"
      >
        <div>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <InputField
                placeholder="franklin@example.com"
                label="Email"
                {...field}
              />
            )}
          />

          {errors.email?.message && (
            <p className="text-red-500 p-2">{errors.email?.message}</p>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <InputField
                placeholder="secret123"
                label="Password"
                passwordField
                {...field}
              />
            )}
          />
          {errors.password?.message && (
            <p className="text-red-500 p-2">{errors.password?.message}</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <Controller
              control={control}
              name="rememberMe"
              render={({ field: { value, ...fieldProps } }) => (
                <Checkbox
                  placeholder="remember me"
                  checked={value}
                  onCheckedChange={(value) => {
                    fieldProps.onChange(value);
                  }}
                  {...fieldProps}
                />
              )}
            />
            <span className="text-neutral-gray pl-2">Remember me</span>
          </div>
          <Link href={"/auth/forgot-password"}>
            <p className="font-semibold">Forgot password?</p>
          </Link>
        </div>
        <Button
          type="submit"

          // disabled={isSignInButtonDisabled}
        >
          Sign In
        </Button>
      </form>
    </>
  );
};

export default SignIn;

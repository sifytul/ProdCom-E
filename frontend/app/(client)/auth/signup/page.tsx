"use client";
import InputField from "@/components/shared/InputField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useAppDispatch } from "@/store";
import { setAuth, setJid, setUser } from "@/store/slices/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const formSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Please accept the terms and conditions",
  }),
});

type TFormData = z.infer<typeof formSchema>;

const SignUp = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      termsAccepted: false,
    },
  });

  const submitHandler: SubmitHandler<TFormData> = async (data: TFormData) => {
    //TODO: Need to implement submission
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/auth/register",
        {
          method: "POST",
          body: JSON.stringify(data),
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
            errors[message] = message;
          });
        } else if (responseData.errors) {
          responseData.errors.forEach((error) => {
            toast.error(error.message);
            errors[error.message] = error.message;
          });
        }
        return;
      }

      if (!responseData.success) {
        throw new Error(responseData.message);
      }
      dispatch(setAuth(true));
      dispatch(setJid(responseData.accessToken));
      dispatch(setUser(responseData.data));
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push("/");
      }
      toast.success("Account created successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <>
      {/* right section  */}
      <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
      <p className="text-neutral-gray font-inter mb-8">
        Already have an account?{" "}
        <span className="text-accent font-semibold">
          <Link href={"/auth/signin"}>Sign in</Link>
        </span>
      </p>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col w-full space-y-6 font-inter"
      >
        <div>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputField
                label="Name"
                placeholder="James Franklin"
                {...field}
              />
            )}
          />
          {errors.name?.message && (
            <p className="text-red-500 p-2">{errors.name?.message}</p>
          )}
        </div>
        <div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                label="Email"
                placeholder="franklin@example.com"
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
            name="password"
            control={control}
            render={({ field }) => (
              <InputField
                label="Password"
                placeholder="secret123"
                passwordField
                {...field}
              />
            )}
          />
          {errors.password?.message && (
            <p className="text-red-500 p-2">{errors.password?.message}</p>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <Controller
              name="termsAccepted"
              control={control}
              rules={{ required: true }}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  placeholder="terms & conditions"
                  checked={field.value}
                  onCheckedChange={(value) => field.onChange(value)}
                />
              )}
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
          {errors.termsAccepted?.message && (
            <p className="text-red-500 p-2">{errors.termsAccepted?.message}</p>
          )}
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
    </>
  );
};

export default SignUp;

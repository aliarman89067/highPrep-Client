import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import images from "@/constant/images";
import { useLoginModal, useSignupModal, useUser } from "@/context";
import axios from "axios";
import { useState } from "react";
import { handleGoogleAuth } from "@/lib/utils";

export default function LoginForm() {
  // Hooks
  const { closeModal: closeLoginModal } = useLoginModal();
  const { openModal: OpenSignupModal, closeModal: closeSignupModal } =
    useSignupModal();
  const { setUser } = useUser();
  const [customError, setCustomError] = useState<string>("");

  // Login Schema
  const loginSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
  });

  type LoginSchema = z.infer<typeof loginSchema>;

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: LoginSchema) => {
    const { data } = await axios.post("/get-user", { ...values });

    if (data.success === false) {
      if (data.message === "Email or password is wrong") {
        setCustomError("Email or password is wrong");
      } else {
        setCustomError("Something went wrong try again");
      }
    }
    if (data.success === true) {
      setUser(data.data);
      closeLoginModal();
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg relative">
      {/* Close Button */}
      <div
        onClick={() => {
          closeLoginModal();
          form.clearErrors();
          form.reset();
        }}
        className="absolute top-2 right-2 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-800 group transition-all"
      >
        <X className="w-5 h-5 group-hover:text-white transition-all" />
      </div>
      {/* Container */}
      <div className="flex flex-col gap-2 px-4 py-2">
        {/* Greetings */}
        <div className="flex flex-col space-y-1 items-center">
          <h2 className="text-2xl text-primary font-semibold">Login</h2>
          <p className="text-base text-darkGreen">Welcome Back!</p>
          <div className="h-[1px] w-full bg-gray-300"></div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {Object.values(form.formState.errors).length > 0 && (
              <p className="text-red-500 text-sm">Please fill all the fields</p>
            )}
            {customError && (
              <p className="text-red-500 text-sm">{customError}</p>
            )}
            <Button type="submit" className="w-full mt-3">
              Login
            </Button>
          </form>
        </Form>
        <p className="text-center text-gray-800 text-sm">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => {
              closeLoginModal();
              form.reset();
              OpenSignupModal();
            }}
            className="text-gray-900 underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
        <div
          onClick={() =>
            handleGoogleAuth({
              setCustomError,
              setUser,
              closeLoginModal,
              closeSignupModal,
            })
          }
          className="cursor-pointer w-full h-12 rounded-md border border-gray-400 flex items-center justify-center mt-3 gap-2 hover:bg-gray-100 hover:shadow-lg transition-all"
        >
          <h3 className="text-base font-semibold text-gray-800">
            Continue with google
          </h3>
          <img
            src={images.googleImage}
            alt="Google logo"
            className="w-6 h-6 object-cover items-center"
          />
        </div>
      </div>
    </div>
  );
}

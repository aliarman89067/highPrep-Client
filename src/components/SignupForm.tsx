import { useLoginModal, useSignupModal, useUser } from "@/context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { ChangeEvent, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "@/firebase";
import axios from "axios";
import { handleGoogleAuth } from "@/lib/utils";

export default function SignupForm() {
  // Hooks
  const { closeModal: closeSignupModal } = useSignupModal();
  const { openModal: openLoginModal, closeModal: closeLoginModal } =
    useLoginModal();
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [customError, setCustomError] = useState<string>("");

  const { setUser } = useUser();

  // Login Schema
  const signupSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    image: z.string().optional(),
  });

  type SignupSchema = z.infer<typeof signupSchema>;

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    setImageLoading(true);
    if (e.target.files) {
      try {
        const file = e.target.files[0];
        const ext = file.type.split("/")[1];
        const storage = getStorage(app);
        const fileName = Date.now() + ext;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        form.setValue("image", url);
      } catch (error) {
        console.log(error);
        alert("Something went wrong please try again");
      } finally {
        setImageLoading(false);
      }
    }
  };

  const handleSubmit = async (values: SignupSchema) => {
    setCustomError("");
    const { data } = await axios.post("/create-user", { ...values });
    if (data.success === false) {
      if (data.message === "This email already used") {
        setCustomError("This email is already used");
      } else {
        setCustomError("Something went wrong try again");
      }
    }
    if (data.success === true) {
      setUser(data.data);
      closeSignupModal();
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg relative">
      {/* Close Button */}
      <div
        onClick={() => {
          if (imageLoading) return;
          closeSignupModal();
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
          <h2 className="text-2xl text-primary font-semibold">Signup</h2>
          <p className="text-base text-darkGreen">Most Welome!</p>
          <div className="h-[1px] w-full bg-gray-300"></div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-2 items-center">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
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
                  <FormItem className="flex-1">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="flex-1 flex flex-col">
                  <FormLabel>
                    Image
                    <span className="text-xs text-gray-500 ml-2">
                      *Optional
                    </span>
                  </FormLabel>
                  <FormControl>
                    <>
                      {imageLoading ? (
                        <div className="w-28 h-10 flex items-center justify-center rounded-sm border border-gray-400 text-gray-700 text-sm  opacity-70 gap-1">
                          Loading
                          <Loader2 className="text-gray-700 w-5 h-5 animate-spin" />
                        </div>
                      ) : (
                        <label>
                          {form.getValues("image") ? (
                            <img
                              src={form.getValues("image")}
                              alt="User Image"
                              className="w-14 h-14 rounded-full object-cover cursor-pointer"
                            />
                          ) : (
                            <>
                              <div className="w-28 h-10 flex items-center justify-center rounded-sm border border-gray-400 text-gray-700 text-sm cursor-pointer hover:bg-gray-100 hover:shadow-lg">
                                Select Image
                              </div>
                            </>
                          )}
                          <Input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImage}
                          />
                        </label>
                      )}
                    </>
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
            <Button
              disabled={imageLoading}
              type="submit"
              className="w-full mt-3"
            >
              Sign up
            </Button>
          </form>
        </Form>
        <p className="text-center text-gray-800 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => {
              if (imageLoading) return;
              closeSignupModal();
              form.reset();
              openLoginModal();
            }}
            className="text-gray-900 underline cursor-pointer"
          >
            Login
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

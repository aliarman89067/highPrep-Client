import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "@/firebase";
import axios from "axios";
import { useUser } from "@/context";
import { toast } from "sonner";

type Props = {
  data: {
    _id: string;
    name: string;
    email: string;
    image: string;
    isPremium: boolean;
    packageName: string;
    purchaseAt: string;
    expiresAt: string;
    packagePrice: number;
    oAuth: boolean;
  } | null;
  setData: Dispatch<SetStateAction<any>>;
  isButtonLoading: boolean;
  setIsButtonLoading: Dispatch<SetStateAction<boolean>>;
};

export default function UserProfileForm({
  data,
  setData,
  isButtonLoading,
  setIsButtonLoading,
}: Props) {
  // Hooks
  const [customError, setCustomError] = useState<string>("");
  const { setUser } = useUser();

  const profileSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
    image: z.string().optional(),
  });

  type ProfileSchema = z.infer<typeof profileSchema>;

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: data?.name,
      email: data?.email,
      oldPassword: "",
      newPassword: "",
      image: data?.image,
    },
  });

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsButtonLoading(true);
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
        setIsButtonLoading(false);
      }
    }
  };

  const handleSubmit = async (values: ProfileSchema) => {
    if (!isButtonLoading) {
      try {
        setIsButtonLoading(true);

        setCustomError("");
        const { data: responseData } = await axios.post("/update-user-form", {
          ...values,
          userId: data?._id,
        });
        if (!responseData.success) {
          setCustomError(responseData.message);
        } else {
          const { _id, name, email, image } = responseData.data;
          setUser({ _id, name, email, image });
          setData(responseData.data);
          toast.success("User updated successfully");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsButtonLoading(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-2 max-w-2xl"
      >
        <div className="flex gap-2 items-center">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={data?.oAuth} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {!data?.oAuth && (
          <div className="flex gap-2 items-center">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel
                    className={`${
                      customError === "Old Password is wrong" && "text-red-500"
                    }`}
                  >
                    Old Password
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        )}
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="flex-1 flex flex-col">
              <FormLabel>
                Image
                <span className="text-xs text-gray-500 ml-2">*Optional</span>
              </FormLabel>
              <FormControl>
                <>
                  {isButtonLoading ? (
                    <div className="w-28 h-10 flex items-center justify-center rounded-sm border border-gray-400 text-gray-700 text-sm  opacity-70 gap-1">
                      Loading
                      <Loader2 className="text-gray-700 w-5 h-5 animate-spin" />
                    </div>
                  ) : (
                    <label className="w-fit">
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
        {customError && <p className="text-red-500 text-sm">{customError}</p>}
        <Button
          disabled={isButtonLoading}
          type="submit"
          className="w-[130px] mt-3"
        >
          Update Info
        </Button>
      </form>
    </Form>
  );
}

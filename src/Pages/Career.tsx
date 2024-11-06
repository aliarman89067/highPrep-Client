import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { app } from "@/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Check } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Career() {
  // Hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pfdLoading, setPfdLoading] = useState<boolean>(false);

  const careerSchema = z.object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    email: z.string().min(1, { message: "Email is required" }),
    phone: z.string().min(1, { message: "Phone Number is required" }),
    city: z.string().min(1, { message: "City Name is required" }),
    option: z.string().min(1, { message: "Select Position you want to apply" }),
    resume: z.string().min(1, { message: "Resume is required" }),
  });

  type CareerSchema = z.infer<typeof careerSchema>;

  const form = useForm<CareerSchema>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      option: "",
      resume: "",
    },
  });

  const handleSetPosition = (e: string) => {
    if (e !== "none") {
      form.setValue("option", e);
    }
  };

  const handleSubmit = (values: CareerSchema) => {};

  const handlePdfUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPfdLoading(true);
      try {
        const file = e.target.files[0];
        const storage = getStorage(app);
        const fileName = Date.now() + ".pdf";
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        form.setValue("resume", url);
      } catch (error) {
        console.log(error);
      } finally {
        setPfdLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <MaxWidthWrapper classNames="min-h-screen py-10 my-5 px-5 bg-gray-100 rounded-lg">
        <h1 className="text-xl font-bold text-primary capitalize">
          Apply to high school prep
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="max-w-xl mt-5 space-y-3"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      className="border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      className="border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      className="border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      className="border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (City)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      className="border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Positions
                    <br />
                    <span className="text-sm font-normal text-gray-500">
                      Select the position you want to apply
                    </span>
                  </FormLabel>
                  <br />
                  <select
                    disabled={isLoading}
                    className="w-[180px] px-2 py-2 rounded-md border border-gray-300"
                    onChange={(e) => handleSetPosition(e.target.value)}
                    value={field.value || ""}
                  >
                    <option value="none">Select Position</option>
                    <option value="Web Developer">Web Developer</option>
                    <option value="App Developer">App Developer</option>
                  </select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resume"
              render={() => (
                <FormItem>
                  <FormLabel>Resume/CV</FormLabel>
                  {pfdLoading ? (
                    <p className="text-base text-gray-600">Uploading...</p>
                  ) : (
                    <FormControl>
                      {form.getValues("resume") ? (
                        <div className="flex items-center gap-3">
                          <p className="text-base text-gray-800 flex items-center gap-1">
                            PDF selected <Check />
                          </p>
                          <label>
                            <span className="rounded-md flex items-center justify-center border border-gray-300 bg-gray-100 text-gray-800 text-base px-3 py-1 cursor-pointer hover:bg-gray-200 transition-all">
                              Change PDF
                            </span>
                            <Input
                              disabled={isLoading}
                              type="file"
                              accept=".pdf"
                              onChange={handlePdfUpload}
                              className="border-gray-300 hidden"
                            />
                          </label>
                        </div>
                      ) : (
                        <Input
                          disabled={isLoading}
                          type="file"
                          accept=".pdf"
                          onChange={handlePdfUpload}
                          className="border-gray-300"
                        />
                      )}
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Submit</Button>
          </form>
        </Form>
      </MaxWidthWrapper>
      <Footer />
    </>
  );
}

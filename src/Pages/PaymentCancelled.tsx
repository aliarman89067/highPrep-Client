import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentCancelled() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <MaxWidthWrapper>
        <div className="flex flex-col items-center mt-10">
          <h1 className="text-4xl font-bold text-red-500 text-center">
            Payment Cancelled
          </h1>
          <X className="w-20 h-20 text-red-500" />
          <p className="text-base text-center text-red-500">
            Please try again later
          </p>
          <Button onClick={() => navigate("/")} size="lg" className="mt-5">
            Go back home
          </Button>
        </div>
      </MaxWidthWrapper>
    </>
  );
}

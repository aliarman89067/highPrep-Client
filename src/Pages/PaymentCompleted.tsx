import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import correct from "../assets/lottie/correct.json";
import Lottie from "lottie-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PaymentCompleted() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const packageName = queryParams.get("packageName");

  return (
    <>
      <Navbar />
      <MaxWidthWrapper>
        <div className="flex flex-col items-center mt-10">
          <h1 className="text-4xl font-bold text-darkGreen text-center">
            Payment completed <br /> Successfully
          </h1>
          <Lottie
            animationData={correct}
            autoPlay
            loop={false}
            className="w-40 h-40"
          />
          <h3 className="text-2xl font-bold text-primary text-center">
            You just buy
          </h3>
          <h3 className="text-2xl font-bold text-primary text-center">
            {packageName} Subscription
          </h3>
          <Button onClick={() => navigate("/")} size="lg" className="mt-5">
            Go back home
          </Button>
        </div>
      </MaxWidthWrapper>
    </>
  );
}

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import correct from "../assets/lottie/correct.json";
import Lottie from "lottie-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context";
import { useEffect, useState } from "react";
import axios from "axios";
import images from "@/constant/images";
import { Home } from "lucide-react";

export default function PaymentCompleted() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const packageName = queryParams.get("packageName");
  const { _id, setUser } = useUser();
  useEffect(() => {
    if (!_id) return;
    setIsLoading(true);
    axios
      .get(`/update-user-membership/${_id}`)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen relative">
        <img
          src={images.successBg}
          alt="Background Image"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/10 backdrop-blur-sm">
          <div className="absolute top-5 left-1/2 -translate-x-1/2 border-4 border-gray-500 rounded-lg bg-white p-4 flex flex-col items-center max-w-2xl w-full overflow-hidden">
            <div className="w-[300px] h-[300px] rounded-full bg-red-500 absolute -top-32 -right-32 blur-3xl opacity-20"></div>
            <div className="w-[300px] h-[300px] rounded-full bg-darkGreen absolute -bottom-32 -left-32 blur-3xl opacity-20"></div>
            <img
              src={images.successSvg}
              alt="Success Text"
              className="w-[430px] object-cover"
            />
            <img
              src={images.success}
              alt="Success"
              className="w-[300px] object-cover pointer-events-none select-none -translate-y-4"
            />
            <h3 className="mb-5 text-lg font-semibold text-gray-600 -mt-4">
              You purchased {packageName} package
            </h3>
            <Button
              onClick={() => navigate("/")}
              disabled={isLoading}
              className="px-6 h-12 gap-2"
            >
              Go Back To Home <Home />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

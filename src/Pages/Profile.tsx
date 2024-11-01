import IsUserLogin from "@/components/IsUserLogin";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfileForm from "@/components/UserProfileForm";
import { useUser } from "@/context";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Profile() {
  type UserType = {
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
  };

  // Hooks
  const navigate = useNavigate();
  const { _id } = useUser();
  const { isUser } = IsUserLogin();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<null | UserType>(null);
  const [dates, setDates] = useState({
    purchasedDate: "",
    expiredDate: "",
  });
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  if (!isUser) {
    return <Navigate to={"/"} />;
  }
  useEffect(() => {
    setIsLoading(true);
    if (!isUser) return;
    axios
      .get(`/get-profile-data/${_id}`)
      .then(({ data }) => {
        if (data.isPremium) {
          handleCreateDates(data);
        }
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg text-gray-800 text-center font-semibold">
          Loading...
        </p>
      </div>
    );
  }
  const handleCreateDates = (data: UserType) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    // Purchased Date
    const purDate = new Date(data.purchaseAt);
    const purDay = purDate.getDate();
    const purMonthIndex = purDate.getMonth();
    const purYear = purDate.getFullYear();

    const purMonthName = monthNames[purMonthIndex];
    const purFormattedDate = `${purDay}-${purMonthName}-${purYear}`;
    setDates((prev) => ({ ...prev, purchasedDate: purFormattedDate }));
    // Expired Date
    const expDate = new Date(data.expiresAt);
    const expDay = expDate.getDate();
    const expMonthIndex = expDate.getMonth();
    const expYear = expDate.getFullYear();
    const expMonthName = monthNames[expMonthIndex];
    const expFormattedDate = `${expDay}-${expMonthName}-${expYear}`;
    setDates((prev) => ({ ...prev, expiredDate: expFormattedDate }));
  };
  return (
    <>
      <Navbar />
      <MaxWidthWrapper classNames="mt-5 mb-10">
        <Tabs defaultValue="information">
          <TabsList className="w-[300px] grid grid-cols-2 h-10 mb-5">
            <TabsTrigger
              disabled={isButtonLoading}
              value="information"
              className="py-2"
            >
              User Info
            </TabsTrigger>
            <TabsTrigger
              disabled={isButtonLoading}
              value="history"
              className="py-2"
            >
              History
            </TabsTrigger>
          </TabsList>
          <TabsContent value="information">
            {/* User Info Start */}
            <UserProfileForm
              data={data}
              setData={setData}
              isButtonLoading={isButtonLoading}
              setIsButtonLoading={setIsButtonLoading}
            />
            <div>
              {data?.isPremium ? (
                <div className="flex flex-col gap-1 mt-3">
                  <h3 className="text-primary text-lg font-semibold">
                    You are a premium member
                  </h3>
                  <div className="flex gap-4 flex-wrap mb-4">
                    <div className="flex flex-col gap-1 border border-gray-400 px-4 py-2 rounded-md w-[200px]">
                      <span className="text-gray-600 font-semibold">
                        Package Limit
                      </span>
                      <div className="w-full h-[1px] rounded-lg bg-gray-200"></div>
                      <div className="text-darkGreen font-bold text-lg">
                        {data.packageName}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 border border-gray-400 px-4 py-2 rounded-md w-[200px]">
                      <span className="text-gray-600 font-semibold">
                        Package Price
                      </span>
                      <div className="w-full h-[1px] rounded-lg bg-gray-200"></div>
                      <div className="text-darkGreen font-bold text-lg">
                        {data.packagePrice}$
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    <div className="flex flex-col gap-1 border border-gray-400 px-4 py-2 rounded-md w-[200px]">
                      <span className="text-gray-600 font-semibold">
                        Purchase At
                      </span>
                      <div className="w-full h-[1px] rounded-lg bg-gray-200"></div>
                      <div className="text-darkGreen font-bold text-lg">
                        {dates.purchasedDate}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 border border-gray-400 px-4 py-2 rounded-md w-[200px]">
                      <span className="text-gray-600 font-semibold">
                        Expires At
                      </span>
                      <div className="w-full h-[1px] rounded-lg bg-gray-200"></div>
                      <div className="text-darkGreen font-bold text-lg">
                        {dates.expiredDate}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1 mt-3">
                  <h3 className="text-primary text-lg font-semibold">
                    Become a premium member
                  </h3>
                  <Button
                    onClick={() => navigate("/membership")}
                    disabled={isButtonLoading}
                    variant="outline"
                    className="bg-darkGreen hover:bg-darkGreen/90 text-white hover:text-white w-fit"
                  >
                    Membership
                  </Button>
                </div>
              )}
            </div>
            {/* User Info End */}
          </TabsContent>
          <TabsContent value="history">Change your password here.</TabsContent>
        </Tabs>
      </MaxWidthWrapper>
    </>
  );
}

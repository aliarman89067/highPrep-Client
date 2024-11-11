import Footer from "@/components/Footer";
import IsUserLogin from "@/components/IsUserLogin";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import ProfileSideBar from "@/components/ProfileSideBar";
import { Button } from "@/components/ui/button";
import UserHistory from "@/components/UserHistory";
import UserProfileForm from "@/components/UserProfileForm";
import { useUser } from "@/context";
import axios from "axios";
import { History, User } from "lucide-react";
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
    playedSubUnits: {
      gradeName: string;
      subjectName: string;
      subjectId: string;
      unitId: string;
      unitName: string;
      playedTime: string;
    }[];
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
  const [tabs, setTabs] = useState<"user-info" | "history">("user-info");

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
  const tabsData = [
    {
      name: "User Info",
      label: "user-info",
      icon: (
        <User
          className={`w-4 h-4 ${
            tabs === "user-info" ? "text-white" : "text-gray-800"
          }`}
        />
      ),
    },
    {
      name: "History",
      label: "history",
      icon: (
        <History
          className={`w-4 h-4  ${
            tabs === "history" ? "text-white" : "text-gray-800"
          }`}
        />
      ),
    },
  ];
  const changeTab = (tabLabel: "user-info" | "history") => {
    setTabs(tabLabel);
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row w-full h-full relative gap-6 md:gap-14">
        {/* Side bar */}
        <div className="hidden md:block h-screen w-[220px] shadow-xl border-r border-gray-300 bg-gray-100">
          <div className="flex flex-col gap-2 w-full px-2 mt-5">
            {tabsData.map((tab, index) => (
              <div
                key={index}
                onClick={() => changeTab(tab.label as "user-info" | "history")}
                className={`flex items-center gap-2 ${
                  tab.label === tabs
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-all w-full py-2 px-3 rounded-md cursor-pointer group`}
              >
                {tab.icon}
                <p
                  className={`text-sm font-semibold ${
                    tab.label === tabs ? "text-white" : "text-gray-800"
                  }`}
                >
                  {tab.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Side bar with hamburger */}
        <div className="flex md:hidden">
          <ProfileSideBar tabs={tabs} setTabs={setTabs} />
        </div>
        <MaxWidthWrapper classNames="mt-0 md:mt-5 mb-10 px-5">
          {tabs === "user-info" && (
            <>
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
            </>
          )}
          {tabs === "history" && (
            <>
              {/* User Info End */}
              <UserHistory playedSubUnits={data?.playedSubUnits} />
            </>
          )}
        </MaxWidthWrapper>
      </div>
      <Footer />
    </>
  );
}

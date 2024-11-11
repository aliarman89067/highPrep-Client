import { History, Menu, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Dispatch, SetStateAction } from "react";

type Props = {
  tabs: "user-info" | "history";
  setTabs: Dispatch<SetStateAction<"user-info" | "history">>;
};

export default function ProfileSideBar({ tabs, setTabs }: Props) {
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
    <Sheet>
      <SheetTrigger className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mt-5 ml-5 hover:opacity-75 transition-all">
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[220px] p-0 pt-12">
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
      </SheetContent>
    </Sheet>
  );
}

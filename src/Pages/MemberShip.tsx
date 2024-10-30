import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { membershipData } from "@/constant/membershipData";

export default function MemberShip() {
  return (
    <>
      <Navbar />
      <MaxWidthWrapper>
        <div className="flex justify-center gap-6 flex-wrap mt-14">
          {membershipData.map((item) => (
            <div
              style={{ border: `1px solid ${item.color}` }}
              className="w-[280px] h-[350px] rounded-lg flex flex-col justify-between items-center p-6"
            >
              <h1 style={{ color: item.color }} className="text-7xl font-bold">
                {item.price}$
              </h1>
              <div className="h-[1px] w-full rounded-[50px] bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold text-[#404040]">
                  {item.heading1}
                </h1>
                <h1 className="text-2xl font-bold text-[#2D2D2D]">
                  {item.heading2}
                </h1>
              </div>
              <div className="h-[1px] w-full rounded-[50px] bg-gray-200"></div>
              <button
                style={{ backgroundColor: item.color }}
                className="w-full h-12 rounded-md border-none outline-none text-base text-white font-medium hover:opacity-90 transition-all hover:shadow-lg"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </>
  );
}

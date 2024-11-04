import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { Medal } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function GradeByName() {
  // Hooks
  const { gradeName } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData(null);
    setIsLoading(true);
    axios
      .get(`/get-grade-by-name/${gradeName}`)
      .then(({ data }) => {
        setData(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [gradeName]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-800">Loading...</p>
      </div>
    );
  }
  const showUnitsLength = (chapters: any) => {
    const totalUnits = chapters.reduce(
      (total: any, acc: any) => total + acc.units.length,
      0
    );

    return totalUnits;
  };

  return (
    <>
      <Navbar />
      <MaxWidthWrapper classNames="min-h-[calc(100vh-120px)]">
        <div className="flex gap-2 items-center justify-center my-10">
          <h1 className="text-darkGreen text-5xl font-bold font-poppins">
            {gradeName}
          </h1>
          <Medal size={40} color="#38b000 " />
        </div>
        {data ? (
          <div className="px-4 py-3 rounded-md border border-blue w-[350px] sm:w-[400px] mx-auto">
            <div className="flex items-center gap-2 -ml-5">
              <div
                style={{ backgroundColor: "#0B863C" }}
                className={`w-12 h-10 rounded-tr-full rounded-br-full rounded-tl-sm rounded-bl-sm flex items-center justify-center text-white font-semibold text-lg`}
              >
                7
              </div>
              <h1
                style={{ color: "#0B863C" }}
                className="text-2xl font-light font-poppins"
              >
                {data.name}
              </h1>
            </div>
            <p className="text-textSecondary font-poppins text-sm mt-2">
              {data.description}
            </p>
            <div className="h-[1px] w-full rounded-lg bg-gray-300 my-3"></div>
            <div className="flex flex-col gap-1">
              {data.subjects.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between w-full"
                >
                  <p className="text-text text-sm font-poppins">{item.name}</p>
                  <Link
                    // to={`/${grade.gradeName}/${item.name}/${grade.id}`}
                    to={`/${data.name}/${item.name}/${item._id}`}
                    className="text-sm text-blue font-poppins hover:underline"
                  >
                    {/* {handleLessonsCount(grade.id, item.name)} Skills &gt;&gt; */}
                    {showUnitsLength(item.chapters)} Skills &gt;&gt;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full h-screen flex items-center justify-center">
            <p className="text-lg font-medium text-red-500">
              Something went wrong try again
            </p>
          </div>
        )}
      </MaxWidthWrapper>
      <Footer />
    </>
  );
}

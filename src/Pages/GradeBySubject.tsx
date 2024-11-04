import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { Medal } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function GradeBySubject() {
  // Hooks
  const { subjectName } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData(null);
    setIsLoading(true);
    axios
      .get(`/get-grade-by-subject/${subjectName}`)
      .then(({ data }) => {
        setData(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [subjectName]);

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
  const colors = ["#0B863C", "#EABC00", "#7027A5", "#C83131"];

  return (
    <>
      <Navbar />
      <MaxWidthWrapper classNames="min-h-[calc(100vh-120px)]">
        <div className="flex gap-2 items-center justify-center my-10">
          <h1 className="text-darkGreen text-5xl font-bold font-poppins">
            {subjectName}
          </h1>
          <Medal size={40} color="#38b000 " />
        </div>
        {data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 mb-6 mx-5">
            {data.length > 0 &&
              data.map((grade: any, index: any) => (
                <div
                  key={index}
                  className="px-4 py-3 rounded-md border border-blue"
                >
                  <div className="flex items-center gap-2 -ml-5">
                    <div
                      style={{ backgroundColor: colors[index] }}
                      className={`w-12 h-10 rounded-tr-full rounded-br-full rounded-tl-sm rounded-bl-sm flex items-center justify-center text-white font-semibold text-lg`}
                    >
                      7
                    </div>
                    <h1
                      style={{ color: colors[index] }}
                      className="text-2xl font-light font-poppins"
                    >
                      {grade.name}
                    </h1>
                  </div>
                  <p className="text-textSecondary font-poppins text-sm mt-2">
                    {grade.description}
                  </p>
                  <div className="h-[1px] w-full rounded-lg bg-gray-300 my-3"></div>
                  <div className="flex flex-col gap-1">
                    {grade.subjects.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between w-full"
                      >
                        <p className="text-text text-sm font-poppins">
                          {item.subject.name}
                        </p>
                        <Link
                          to={`/${grade.name}/${item.subject.name}/${item.subject._id}`}
                          className="text-sm text-blue font-poppins hover:underline"
                        >
                          {showUnitsLength(item.subject.chapters)} Skills
                          &gt;&gt;
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="w-full h-screen flex items-center justify-center">
            <p className="text-lg font-medium text-red-500">
              No data found try someother grade or subject
            </p>
          </div>
        )}
      </MaxWidthWrapper>
      <Footer />
    </>
  );
}

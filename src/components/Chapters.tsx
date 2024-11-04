import { Medal } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
// import { chapterData } from "@/constant/chapterData";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { unitData } from "@/constant/unitData";

export default function Chapters() {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data: gradesData } = await axios.get("/getGrades");
        setData(gradesData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const showUnitsLength = (chapters: any) => {
    const totalUnits = chapters.reduce(
      (total: any, acc: any) => total + acc.units.length,
      0
    );

    return totalUnits;
  };
  // const handleLessonsCount = (gradeId: number, subjectName: string) => {
  //   const unit = unitData.find((unit) => unit.id === gradeId);
  //   // @ts-ignore
  //   const lessons = unit[subjectName];
  //   const lessonCount = lessons.reduce(
  //     (total: number, acc: any) => total + acc.lessons.length,
  //     0
  //   );
  //   return lessonCount;
  // };
  const colors = ["#0B863C", "#EABC00", "#7027A5", "#C83131"];
  return (
    <MaxWidthWrapper classNames=" flex flex-col mt-10 min-h-screen">
      <div className="flex flex-col gap-1 items-center justify-center">
        <div className="flex gap-2 items-center justify-center">
          <h1 className="text-darkGreen text-5xl font-bold font-poppins">
            Grades
          </h1>
          <Medal size={40} color="#38b000 " />
        </div>
        <p className="text-sm font-poppins text-textSecondary">
          Find Your Grade, Select Your Subject, and Master Your Daily Tasks!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 mb-6 mx-5">
        {data?.length > 0 &&
          data.map((grade: any, index: number) => (
            <div
              key={index}
              className="px-4 py-3 rounded-md border border-blue"
            >
              <div className="flex items-center gap-2 -ml-5">
                <div
                  style={{ backgroundColor: colors[index] }}
                  className={`w-12 h-10 rounded-tr-full rounded-br-full rounded-tl-sm rounded-bl-sm flex items-center justify-center text-white font-semibold text-lg`}
                >
                  {/* {grade.gradeNumber} */}7
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
                      {item.name}
                    </p>
                    <Link
                      // to={`/${grade.gradeName}/${item.name}/${grade.id}`}
                      to={`/${grade.name}/${item.name}/${item._id}`}
                      className="text-sm text-blue font-poppins hover:underline"
                    >
                      {/* {handleLessonsCount(grade.id, item.name)} Skills &gt;&gt; */}
                      {showUnitsLength(item.chapters)} Skills &gt;&gt;
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </MaxWidthWrapper>
  );
}

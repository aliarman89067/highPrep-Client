import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { unitData } from "@/constant/unitData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SubjectTemp() {
  const { gradeName, subjectName, gradeId } = useParams();

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (gradeName || subjectName || gradeId) {
      const lessonsData = unitData.find((unit) => unit.id === Number(gradeId));
      // @ts-ignore
      if (lessonsData && lessonsData[subjectName]) {
        // @ts-ignore
        setData(lessonsData[subjectName]);
      }
    }
  }, []);
  let alphabetCounting = ["A", "B", "C", "D", "E", "F", ""];
  return (
    <>
      <Navbar />
      <MaxWidthWrapper classNames="my-7 py-6 px-4 bg-orange-50 rounded-lg">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold text-blue">{gradeName}</h1>
          <div className="w-[60px] h-[6px] bg-primary rounded-xl translate-y-1"></div>
          <h1 className="text-4xl font-bold text-blue tracking-widest">
            {subjectName}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {data.length > 0 &&
            data.map((chapter: any, index: any) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <p className="text-gray-800 text-lg font-medium">
                    {alphabetCounting[index]}.
                  </p>
                  <p className="text-darkGreen text-xl font-medium">
                    {chapter.unitName}
                  </p>
                </div>
                {chapter?.lessons?.length > 0 &&
                  chapter?.lessons.map((unit: any, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <p className="text-gray-900 text-base font-medium">
                        {index + 1}.
                      </p>
                      <span className="text-gray-800 text-base hover:underline cursor-pointer">
                        {unit}
                      </span>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </MaxWidthWrapper>
    </>
  );
}

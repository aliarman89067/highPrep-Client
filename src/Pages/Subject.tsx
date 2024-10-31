import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Subject() {
  const [data, setData] = useState<any>();

  const { gradeName, subjectId, subjectName } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/getGradeById/${subjectId}`);

        setData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  if (!data) {
    return (
      <p className="w-full h-screen flex items-center justify-center">
        Loading...
      </p>
    );
  }
  let alphabetCounting = ["A", "B", "C", "D", "E", "F", ""];
  return (
    <>
      <Navbar />
      <MaxWidthWrapper classNames="my-7 py-6 px-4 bg-orange-50 rounded-lg">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold text-blue">{gradeName}</h1>
          <div className="w-[60px] h-[6px] bg-primary rounded-xl translate-y-1"></div>
          <h1 className="text-4xl font-bold text-blue tracking-widest">
            {data?.name}
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {data?.chapters?.length > 0 &&
            data?.chapters.map((chapter: any, index: number) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <p className="text-gray-800 text-lg font-medium">
                    {alphabetCounting[index]}.
                  </p>
                  <p className="text-darkGreen text-xl font-medium">
                    {chapter.name}
                  </p>
                </div>
                {chapter?.units?.length > 0 &&
                  chapter?.units.map((unit: any, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <p className="text-gray-900 text-base font-medium">
                        {index + 1}.
                      </p>
                      <Link
                        to={`/${gradeName}/${subjectName}/${subjectId}/${unit?._id}`}
                        className="text-gray-800 text-base hover:underline"
                      >
                        {unit?.name}
                      </Link>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </MaxWidthWrapper>
    </>
  );
}

import Lottie from "lottie-react";
import book from "../assets/lottie/book.json";
// import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

// type Props = {
//   playedSubUnits:
//     | {
//         gradeName: string;
//         subjectName: string;
//         subjectId: string;
//         unitId: string;
//         unitName: string;
//         playedTime: string;
//       }[]
//     | undefined;
// };
const dummyData = [
  {
    gradeName: "Tenth",
    subjectName: "Math",
    subjectId: 1,
    unitId: 4,
    unitName: "Identify hypotheses and conclusions",
    playedTime: "00:01:25",
  },
  {
    gradeName: "Tenth",
    subjectName: "Math",
    subjectId: 1,
    unitId: 2,
    unitName: "Converses, inverses, and contrapositives",
    playedTime: "00:00:30",
  },
  {
    gradeName: "Tenth",
    subjectName: "Math",
    subjectId: 1,
    unitId: 3,
    unitName: "Biconditionals",
    playedTime: "00:00:53",
  },
];
// TODO: ADD Props Again
export default function UserHistory() {
  return (
    <>
      {dummyData && dummyData.length > 0 ? (
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-800 text-lg font-semibold">
            {dummyData.length} History Found
          </h3>
          <div className="flex flex-col gap-1 mt-4">
            {dummyData.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <span
                  // to={`/${item.gradeName}/${item.subjectName}/${item.subjectId}/${item.unitId}/${item.unitName}`}
                  key={item.unitId}
                  className="flex items-center gap-2 hover:underline cursor-pointer w-fit"
                >
                  <span className="text-gray-900 text-base font-medium">
                    {index + 1}.
                  </span>
                  <span className="text-gray-800 text-base hover:underline">
                    {item.unitName}
                  </span>
                </span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-darkGreen" />
                  <span className="tracking-widest text-darkGreen font-semibold text-sm">
                    {item.playedTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full h-screen">
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-gray-800 text-lg font-semibold">
              No history Found
            </h3>
            <p className="text-gray-600 tracking-wide">
              You didn&apos;t try any activity
            </p>
            <Lottie
              animationData={book}
              autoPlay
              loop
              className="w-52 -translate-y-10"
            />
          </div>
        </div>
      )}
    </>
  );
}

import Lottie from "lottie-react";
import book from "../assets/lottie/book.json";
import { Link } from "react-router-dom";

type Props = {
  playedSubUnits:
    | {
        gradeName: string;
        subjectName: string;
        subjectId: string;
        unitId: string;
        unitName: string;
      }[]
    | undefined;
};
export default function UserHistory({ playedSubUnits }: Props) {
  return (
    <>
      {playedSubUnits && playedSubUnits.length > 0 ? (
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-800 text-lg font-semibold">
            {playedSubUnits.length} History Found
          </h3>
          <div className="flex flex-col gap-1 mt-4">
            {playedSubUnits.map((item, index) => (
              <Link
                to={`/${item.gradeName}/${item.subjectName}/${item.subjectId}/${item.unitId}/${item.unitName}`}
                key={item.unitId}
                className="flex items-center gap-2 hover:underline cursor-pointer"
              >
                <span className="text-gray-900 text-base font-medium">
                  {index + 1}.
                </span>
                <span className="text-gray-800 text-base hover:underline">
                  {item.unitName}
                </span>
              </Link>
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

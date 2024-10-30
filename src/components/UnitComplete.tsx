import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Repeat, SkipForward, Undo2 } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  unitName: string;
  setIsUniteComplete: Dispatch<SetStateAction<boolean>>;
  setIsCorrectAns: Dispatch<SetStateAction<boolean>>;
  setQuestionNumber: Dispatch<SetStateAction<number>>;
  setScore: Dispatch<SetStateAction<number>>;
  setQuestionAnswered: Dispatch<SetStateAction<number>>;
  totalTime: string | undefined;
  gradeName: string | undefined;
  subjectName: string | undefined;
  subjectId: string | undefined;
};

export default function UnitComplete({
  unitName,
  setIsCorrectAns,
  setIsUniteComplete,
  setQuestionAnswered,
  setScore,
  setQuestionNumber,
  totalTime,
  gradeName,
  subjectName,
  subjectId,
}: Props) {
  const handlePlayAgain = () => {
    setIsUniteComplete(false);
    setQuestionNumber(0);
    setScore(0);
    setQuestionAnswered(0);
    setIsCorrectAns(false);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col space-y-2 items-center justify-center">
          <h3 className="text-4xl font-bold text-primary">Congratulations</h3>
          <div className="flex gap-3 items-center">
            <span className="w-[70px] h-[3px] rounded-[100%] bg-primary/80"></span>
            <p className="text-lg tracking-wider font-light text-gray-800">
              You completed
            </p>
            <span className="w-[70px] h-[3px] rounded-[100%] bg-primary/80"></span>
          </div>
          <p className="text-lg tracking-wider font-meduim text-darkGreen">
            {unitName}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-darkGreen text-base">Total Time</p>
          <p className="text-darkGreen text-xl font-bold">{totalTime}</p>
        </div>
        <div className="flex gap-4 items-center">
          <Link to={`/${gradeName}/${subjectName}/${subjectId}`}>
            <Button className="bg-darkGreen hover:bg-darkGreen/80 flex flex-col w-[120px] h-[65px] font-bold text-base">
              <p>Go Back</p>
              <Undo2 />
            </Button>
          </Link>
          <Button
            onClick={handlePlayAgain}
            className="bg-blue hover:bg-blue/80 flex flex-col w-[120px] h-[65px] font-bold text-base"
          >
            <p>Play Again</p>
            <div>
              <Repeat />
            </div>
          </Button>
          <Button className="bg-primary hover:bg-primary/80 flex flex-col w-[120px] h-[65px] font-bold text-base">
            <p>Next</p>
            <SkipForward />
          </Button>
        </div>
      </div>
    </div>
  );
}

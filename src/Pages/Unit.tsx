import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import IncompleteMessage from "@/components/IncompleteMessage";
import InputUnit from "@/components/InputUnit";
import ChooseUnit from "@/components/ChooseUnit";
import correctLottie from "../assets/lottie/correct.json";
import Lottie from "lottie-react";
import Timer from "@/components/Timer";
import ChooseMultipleUnit from "@/components/ChooseMultipleUnit";
import UnitComplete from "@/components/UnitComplete";
import { unitTimers } from "@/context";
import Navbar from "@/components/Navbar";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function Unit() {
  const { pathname } = useLocation();
  const { gradeName, subjectName, subjectId, unitId, unitName } = useParams();

  const [data, setData] = useState<any>();
  const [isIncomplete, setIsIncomplete] = useState<boolean>(false);
  const [userAns, setUserAns] = useState<string[]>([]);
  const [isWrongAns, setIsWrongAns] = useState<boolean>(false);
  const [isCorrectAns, setIsCorrectAns] = useState<boolean>(false);
  const [questionAnswered, setQuestionAnswered] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [awardingWord, setAwardingWord] = useState<string>("Outstanding");
  const [isUniteComplete, setIsUniteComplete] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<string>("");

  const { start, timer } = unitTimers();

  useEffect(() => {
    const regexExp =
      /^\/[A-Za-z0-9%]+\/[A-Za-z]+\/[A-Fa-f0-9]+\/[A-Fa-f0-9]+\/[A-Za-z0-9%]+$/;
    (async () => {
      const { data } = await axios.post(`/getUnit`, {
        gradeName,
        subjectName,
        subjectId,
        unitId,
        unitName,
      });
      setData(data.data);
      if (regexExp.test(pathname)) {
        start();
        timer.startTime = Date.now();
        timer.playedSubUnitsId = data.playedId;
      }
    })();
  }, [pathname]);

  useEffect(() => {
    if (isCorrectAns) {
      setAwardingWord(
        awardingWords[Math.floor(Math.random() * awardingWords.length - 1)]
      );
      setTimeout(() => {
        if (score === 100) {
          setIsUniteComplete(true);
        } else {
          setQuestionNumber((prev) => prev + 1);
          setIsCorrectAns(false);
        }
      }, 1500);
    }
  }, [isCorrectAns]);

  if (!data) {
    return (
      <p className="w-full h-screen flex items-center justify-center">
        Loading...
      </p>
    );
  }
  const awardingWords = [
    "Outstanding",
    "Fantastic",
    "Superb",
    "Excellent",
    "Remarkable",
    "Fabulous",
    "Impressive",
    "Extraordinary",
    "Spectacular",
  ];

  return (
    <>
      <Navbar />

      <section className="relative w-full min-h-screen flex justify-center items-center bg-skyBlue px-4">
        {isIncomplete && (
          <IncompleteMessage
            isIncomplete={isIncomplete}
            setIsIncomplete={setIsIncomplete}
          />
        )}
        <div
          style={{
            height: isUniteComplete
              ? 600
              : isWrongAns
              ? "auto"
              : data.subUnits[questionNumber].screenHeight || 650,
          }}
          className={`relative w-full md:w-[90%] lg:w-[1024px] bg-white rounded-lg px-6 py-4 my-4 flex items-center justify-center`}
        >
          {isUniteComplete ? (
            <UnitComplete
              unitName={data?.name}
              setIsUniteComplete={setIsUniteComplete}
              setQuestionAnswered={setQuestionAnswered}
              setQuestionNumber={setQuestionNumber}
              setScore={setScore}
              setIsCorrectAns={setIsCorrectAns}
              totalTime={totalTime}
              gradeName={gradeName}
              subjectName={subjectName}
              subjectId={subjectId}
            />
          ) : (
            <>
              <Timer
                questionAnswered={questionAnswered}
                score={score}
                setTotalTime={setTotalTime}
              />
              {/* Correct Answer Start */}
              {!isWrongAns && isCorrectAns && (
                <Dialog open={true}>
                  <DialogContent className="[&>button]:hidden">
                    <div
                      className={` rounded-lg z-50 transition-all duration-500 pointer-events-none flex items-center justify-center`}
                    >
                      <div className="flex flex-col gap-3 items-center">
                        <Lottie
                          animationData={correctLottie}
                          className="w-[140px] h-[140px]"
                        />
                        <h1 className="text-green-500 text-3xl font-semibold">
                          {awardingWord}
                        </h1>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              {/* Correct Answer End */}

              {data.subUnits[questionNumber].type === "Input" && (
                <InputUnit
                  data={data.subUnits[questionNumber]}
                  isWrongAns={isWrongAns}
                  setIsWrongAns={setIsWrongAns}
                  userAns={userAns}
                  setUserAns={setUserAns}
                  setIsIncomplete={setIsIncomplete}
                  setQuestionAnswered={setQuestionAnswered}
                  setScore={setScore}
                  setIsCorrectAns={setIsCorrectAns}
                />
              )}
              {data.subUnits[questionNumber].type === "Choose One" && (
                <ChooseUnit
                  data={data.subUnits[questionNumber]}
                  setIsIncomplete={setIsIncomplete}
                  IsWrongAns={isWrongAns}
                  setIsWrongAns={setIsWrongAns}
                  setIsCorrectAns={setIsCorrectAns}
                  setQuestionAnswered={setQuestionAnswered}
                  setScore={setScore}
                />
              )}
              {data.subUnits[questionNumber].type === "Choose Multiple" && (
                <ChooseMultipleUnit
                  data={data.subUnits[questionNumber]}
                  setIsIncomplete={setIsIncomplete}
                  IsWrongAns={isWrongAns}
                  setIsWrongAns={setIsWrongAns}
                  isCorrectAns={isCorrectAns}
                  setIsCorrectAns={setIsCorrectAns}
                  setQuestionAnswered={setQuestionAnswered}
                  setScore={setScore}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

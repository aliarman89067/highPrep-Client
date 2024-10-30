import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  questionAnswered: number;
  score: number;
  setTotalTime: Dispatch<SetStateAction<string>>;
};

export default function Timer({
  questionAnswered,
  score,
  setTotalTime,
}: Props) {
  const [second, setSecond] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [hour, setHour] = useState<number>(0);

  useEffect(() => {
    const secInterval = setInterval(() => {
      setSecond((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(secInterval);
    };
  }, []);

  useEffect(() => {
    if (second > 60) {
      setMinute((prev) => prev + 1);
      setSecond(0);
    }
    if (minute > 60) {
      setHour((prev) => prev + 1);
      setMinute(0);
    }
    setTotalTime(
      `${hour < 10 ? `0${hour}` : `${hour}`} : ${
        minute < 10 ? `0${minute}` : `${minute}`
      } : ${second < 10 ? `0${second}` : `${second}`}`
    );
  }, [second]);
  return (
    <div className="absolute top-5 right-5">
      <div className="w-[110px]  rounded-sm">
        <div className="px-3 py-2 bg-darkGreen">
          <p className="text-white font-semibold text-base text-center">
            Questions <br /> Answered{" "}
          </p>
        </div>
        <div className="px-3 py-4 bg-gray-200">
          <p className="text-blue font-bold text-4xl text-center">
            {questionAnswered}
          </p>
        </div>
        <div className="px-3 py-2 bg-blue">
          <p className="text-white font-semibold text-base text-center">
            Time <br /> Elapsed
          </p>
        </div>
        <div className="px-1 py-4 bg-gray-200 flex items-center justify-center gap-2">
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="w-6 h-5 border border-gray-400 flex items-center justify-center text-gray-600 font-semibold">
              {hour}
            </div>
            <p className="text-xs font-semibold text-gray-500">HR</p>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="w-6 h-5 border border-gray-400 flex items-center justify-center text-gray-600 font-semibold">
              {minute}
            </div>
            <p className="text-xs font-semibold text-gray-500">MIN</p>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="w-6 h-5 border border-gray-400 flex items-center justify-center text-gray-600 font-semibold">
              {second}
            </div>
            <p className="text-xs font-semibold text-gray-500">SEC</p>
          </div>
        </div>
        <div className="px-3 py-2 bg-darkGreen">
          <p className="text-white font-semibold text-base text-center">
            Score
          </p>
        </div>
        <div className="px-3 py-4 bg-gray-200">
          <p className="text-blue font-bold text-4xl text-center">{score}</p>
        </div>
      </div>
    </div>
  );
}

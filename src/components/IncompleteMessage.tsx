import React from "react";
import { Button } from "./ui/button";

export default function IncompleteMessage({
  setIsIncomplete,
}: {
  setIsIncomplete: (value: boolean) => void;
}) {
  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-black/60 flex items-center justify-center z-50">
      <div className="p-3 rounded-lg bg-black/40 w-[300px] lg:w-[600px]">
        <div className="bg-white rounded-lg flex flex-col gap-5 p-4">
          <h1 className="text-2xl lg:text-3xl font-semibold text-primary">
            Incomplete Answer
          </h1>
          <div className="flex flex-col gap-4">
            <p className="text-gray-800 text-base lg:text-lg">
              You did not finish the question. Do you want to go back to the
              question?
            </p>

            <div className="flex items-center gap-4 justify-end">
              <Button
                className="w-[200px] h-[40px]"
                onClick={() => setIsIncomplete(false)}
              >
                Go back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

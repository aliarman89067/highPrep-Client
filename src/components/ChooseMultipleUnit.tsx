import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import icons from "@/constant/icons";
import { Loader2 } from "lucide-react";

type Props = {
  data: any;
  setIsIncomplete: Dispatch<SetStateAction<boolean>>;
  setIsWrongAns: Dispatch<SetStateAction<boolean>>;
  IsWrongAns: boolean;
  setIsCorrectAns: Dispatch<SetStateAction<boolean>>;
  isCorrectAns: boolean;
  setQuestionAnswered: Dispatch<SetStateAction<number>>;
  setScore: Dispatch<SetStateAction<number>>;
};

export default function ChooseMultipleUnit({
  data,
  setIsIncomplete,
  IsWrongAns,
  setIsWrongAns,
  isCorrectAns,
  setIsCorrectAns,
  setQuestionAnswered,
  setScore,
}: Props) {
  const [targetId, setTargetId] = useState<number[] | null>(null);
  const [htmlDataCorrect, setHtmlDataCorrect] = useState<string>("");
  const [htmlDataWrong, setHtmlDataWrong] = useState<string>("");
  const [isPageLoaded, setisPageLoaded] = useState(false);

  const divRef = useRef<any>();

  useEffect(() => {
    setTargetId([]);
  }, [isCorrectAns]);

  let isImageLoad = false;

  useEffect(() => {
    if (isImageLoad) return;
    const imgElement = divRef.current.querySelector("img");
    if (imgElement) {
      const img = new Image();
      img.src = imgElement.src;
      img.onload = () => {
        setisPageLoaded(false);
        isImageLoad = true;
      };
    }
  }, []);

  const handleChangeOpacityOver = (e: any) => {
    if (e.target.tagName === "DIV") {
      const divElements = divRef.current.querySelectorAll("div");
      const divArray = Array.from(divElements) as any[];
      divArray.forEach((div) => {
        if (div.tagName === "DIV" && div.id) {
          if (div.id !== targetId) {
            if (div.id === e.target.id) {
              div.style.opacity = "70%";
            } else {
              div.style.opacity = "100%";
            }
          }
        }
      });
    }
    if (e.target.tagName === "LABEL") {
      const inputElements = divRef.current.querySelectorAll("input");
      const inputArray = Array.from(inputElements) as any[];
      inputArray.forEach((input) => {
        if (input.tagName === "INPUT" && input.id) {
          // if (input.id !== targetId) {
          //   if (input.id === e.target.id) {
          //     input.style.opacity = "70%";
          //   } else {
          //     input.style.opacity = "100%";
          //   }
          // }
        }
      });
    }
  };

  const handleChangeOpacityOut = (e: any) => {
    if (e.target.tagName === "IMG" && e.target.id) {
      const imgElements = divRef.current.querySelectorAll("img");
      const imgArray = Array.from(imgElements) as any[];
      imgArray.forEach((img) => {
        const isActive = targetId?.includes(img.id);
        if (isActive) return;
        if (img.tagName === "IMG" && img.id) {
          if (img.id !== targetId) {
            img.style.opacity = "60%";
          }
        }
      });
    }
  };

  const handleClick = (e: any) => {
    if (e.target.tagName === "IMG" && e.target.id) {
      let htmlString = "";
      const currenttarget = e.target.id;
      const isActive = targetId?.includes(currenttarget) || false;
      setTargetId((prevIds) => {
        if (isActive) {
          // If it is active, remove it from targetId
          return prevIds?.filter((id) => id !== currenttarget) || null;
        } else {
          // If it is not active, add it to targetId
          return [...(prevIds || []), currenttarget];
        }
      });
      e.target.style.opacity = isActive ? "80%" : "100%";
      e.target.style.scale = isActive ? "100%" : "108%";

      const imgElements = divRef.current.querySelectorAll("img");

      const imgArray = Array.from(imgElements) as any[];
      imgArray.forEach((div) => {
        htmlString += div.outerHTML;
      });
      setHtmlDataCorrect(htmlString);
      setHtmlDataWrong(htmlString);
    }
    if (e.target.dataset.set) {
      const url = e.target.dataset.set;
      const audio = document.createElement("audio");
      audio.src = url;

      const prevSrc = e.target.src;

      e.target.src =
        "https://firebasestorage.googleapis.com/v0/b/highschoolprep.appspot.com/o/listeningImage.jpg?alt=media&token=75445845-ce0c-410f-b730-733932fb3d60";
      audio.oncanplay = () => {};
      audio.onended = () => {
        e.target.src = prevSrc;
      };
      audio.play();
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!targetId?.length) {
      setIsIncomplete(true);
      return;
    }
    let isFound = false;
    let isCorrect = true;

    for (const ans of data?.correctAnswer) {
      const correctAns = JSON.parse(ans.answer);
      if (correctAns) {
        isFound = true;
        if (!targetId.includes(ans.id.toString())) {
          isFound = true;
          isCorrect = false;
          break;
        }
      } else {
        if (targetId.includes(ans.id.toString())) {
          isFound = true;
          isCorrect = false;
          break;
        }
      }
    }

    if (isFound) {
      if (!isCorrect) {
        // For Correct Html Data Start
        let htmlStringCorrect = "";
        const tempDivCorrect = document.createElement("div");
        tempDivCorrect.innerHTML = htmlDataCorrect;
        const divElementsCorrect = tempDivCorrect.querySelectorAll("img");
        divElementsCorrect.forEach((img) => {
          if (img.id) {
            img.style.top = "0%";
            img.style.opacity = "100%";
            img.style.cursor = "default";
            img.style.scale = "100%";
            data?.correctAnswer.forEach((ans: any) => {
              if (ans.id === Number(img.id)) {
                if (JSON.parse(ans.answer)) {
                  img.style.filter = "grayScale(0%)";
                  img.style.scale = "108%";
                } else {
                  img.style.filter = "grayScale(100%)";
                }
              }
            });
            htmlStringCorrect += img.outerHTML;
          }
        });

        setHtmlDataCorrect(htmlStringCorrect);

        // For Correct Html Data End
        // For Wrong Html Data Start

        let htmlStringWrong = "";
        const tempDivWrong = document.createElement("div");
        tempDivWrong.innerHTML = htmlDataWrong;
        const divElementsWrong = tempDivWrong.querySelectorAll("img");
        divElementsWrong.forEach((img) => {
          if (img.id) {
            img.style.top = "0%";
            img.style.opacity = "100%";
            img.style.cursor = "default";
            // @ts-ignore
            if (targetId.includes(img.id)) {
              img.style.filter = "grayScale(0%)";
            } else {
              img.style.filter = "grayScale(100%)";
            }

            htmlStringWrong += img.outerHTML;
          }
        });
        setHtmlDataWrong(htmlStringWrong);
        // For Wrong Html Data End

        setIsWrongAns(true);
      } else {
        setIsCorrectAns(true);
        setScore((prev) => prev + 10);
      }
    }
    setQuestionAnswered((prev) => prev + 1);
  };
  const handleTryAgain = () => {
    setIsWrongAns(false);
    setTargetId(null);
  };

  return (
    <>
      {isPageLoaded && (
        <div className="w-full h-full bg-white absolute top-0 left-0 rounded-lg flex items-center justify-center z-50">
          <div className="flex gap-2 items-center">
            <Loader2 className="w-7 h-7 text-primary animate-spin" />
            <p className="text-primary font-medium text-base">Loading...</p>
          </div>
        </div>
      )}
      {IsWrongAns ? (
        <div className="flex flex-col gap-2 mt-5 w-full">
          {/* Correct Answer */}
          <div className="relative flex flex-col gap-3 min-h-[380px]">
            <h1 className="text-4xl font-semibold text-blue">
              Sorry, incorrect...
            </h1>
            <p className="text-darkGreen text-base">The correct answer is:</p>
            <div
              style={{ height: `${data?.questionHeight}px` }}
              className="flex items-center relative"
            >
              <div
                className="absolute top-0 w-full"
                dangerouslySetInnerHTML={{ __html: htmlDataCorrect }}
              />
            </div>
            <Button
              onClick={handleTryAgain}
              className="w-[80px] bg-darkGreen hover:bg-darkGreen/80 mt-10 mr-auto"
            >
              Got it
            </Button>
          </div>
          {/* Explanation */}
          <div className="flex flex-col gap-3 mb-8">
            <h1 className="text-2xl font-semibold text-darkGreen">
              Explanation
            </h1>
            <div
              style={{ height: `${data?.reviewHeight}px` }}
              className={`relative border border-gray-400 rounded-md`}
            >
              <img
                src={icons.review}
                alt="Review"
                className="absolute -left-3 top-5"
              />
              <div
                onClick={handleClick}
                className="absolute w-full top-5 z-50"
                dangerouslySetInnerHTML={{ __html: data?.review }}
              />
              <div className="relative flex flex-col gap-3 h-full">
                <h3
                  style={{
                    bottom: `calc(${data?.questionHeight || 0}px + 10px)`,
                  }}
                  className={`absolute left-10 text-xl font-medium text-darkGreen`}
                >
                  You answered:
                </h3>
                <div
                  style={{ bottom: `${data?.questionHeight}px` }}
                  className={`flex items-center absolute w-full`}
                >
                  <div dangerouslySetInnerHTML={{ __html: htmlDataWrong }} />
                </div>
              </div>
            </div>
          </div>
          {/* Solution */}
          <div
            style={{ height: `${data?.explanationHeight}px` }}
            className={`relative border border-gray-400 rounded-md`}
          >
            <img
              src={icons.explanation}
              alt="Review"
              className="absolute -left-3 top-5"
            />
            <div
              onClick={handleClick}
              className="absolute top-5 w-full"
              dangerouslySetInnerHTML={{ __html: data?.explanation }}
            />
          </div>
          <Button
            onClick={handleTryAgain}
            className="w-[80px] bg-darkGreen hover:bg-darkGreen/80"
          >
            Got it
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={`w-[68%] sm:w-[75%] md:w-[75%] lg:w-[850px] h-full absolute top-0 left-8`}
        >
          <div
            ref={divRef}
            onClick={handleClick}
            onMouseOver={handleChangeOpacityOver}
            onMouseOut={handleChangeOpacityOut}
            dangerouslySetInnerHTML={{ __html: data?.question }}
          />
        </form>
      )}
    </>
  );
}

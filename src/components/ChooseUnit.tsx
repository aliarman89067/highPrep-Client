import {
  createElement,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import icons from "@/constant/icons";

type Props = {
  data: any;
  setIsIncomplete: Dispatch<SetStateAction<boolean>>;
  setIsWrongAns: Dispatch<SetStateAction<boolean>>;
  IsWrongAns: boolean;
  setIsCorrectAns: Dispatch<SetStateAction<boolean>>;
  setQuestionAnswered: Dispatch<SetStateAction<number>>;
  setScore: Dispatch<SetStateAction<number>>;
};

export default function ChooseUnit({
  data,
  setIsIncomplete,
  IsWrongAns,
  setIsWrongAns,
  setIsCorrectAns,
  setQuestionAnswered,
  setScore,
}: Props) {
  const [targetId, setTargetId] = useState<null | number>(null);
  const [htmlDataCorrect, setHtmlDataCorrect] = useState<string>("");
  const [htmlDataWrong, setHtmlDataWrong] = useState<string>("");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [increaseHeight, setIncreaseHeight] = useState({
    question: 0,
    review: 0,
    explanation: 0,
  });
  const [smallScreen, setsmallScreen] = useState({
    question: "",
    review: "",
    explanation: "",
    correctData: "",
  });

  const divRef = useRef<any>();

  const changeQuestionPos = () => {
    const div = document.createElement("div");
    div.innerHTML = data?.question;
    const elements = Array.from(div.querySelectorAll("*"));

    const newElements = elements.filter((el) => {
      const topValue = el.style.top;
      return topValue && topValue;
    });

    newElements.sort((a, b) => {
      return parseFloat(a.style.top) - parseFloat(b.style.top);
    });

    let htmlString = "";

    newElements.forEach((el, index) => {
      const div = document.createElement("div");
      div.style.position = "relative";

      let offsetValue = 0;
      if (el.tagName === "SPAN") {
        document.body.appendChild(el);
        offsetValue = el.getBoundingClientRect().height;
        document.body.removeChild(el);
      } else {
        if (el.tagName === "DIV" && el.id) {
          const widthValue = Number(el.style.width.replace("px", ""));
          if (widthValue > 300) {
            el.style.width = "280px";
            div.appendChild(el);
          } else {
            div.appendChild(el);
          }
        } else {
          div.appendChild(el);
        }
      }
      if (offsetValue > 0) {
        div.style.height = offsetValue + "px";
        div.appendChild(el);
      }

      htmlString += div.outerHTML;
    });
    setsmallScreen((prev) => ({ ...prev, question: htmlString }));
  };

  const changeReviewPos = () => {
    const div = document.createElement("div");
    div.innerHTML = data?.review;
    const elements = Array.from(div.querySelectorAll("*"));

    const newElements = elements.filter((el) => {
      const topValue = el.style.top;
      return topValue && topValue;
    });

    newElements.sort((a, b) => {
      return parseFloat(a.style.top) - parseFloat(b.style.top);
    });

    let htmlString = "";
    let increaseHeight = 0;

    newElements.forEach((el) => {
      const div = document.createElement("div");
      div.style.position = "relative";

      let offsetValue = 0;
      if (el.tagName === "SPAN") {
        document.body.appendChild(el);
        offsetValue = el.getBoundingClientRect().height;
        document.body.removeChild(el);
      } else {
        div.appendChild(el);
      }
      if (offsetValue > 0) {
        increaseHeight += offsetValue;
        div.style.height = offsetValue + "px";
        div.appendChild(el);
      }

      htmlString += div.outerHTML;
    });
    setsmallScreen((prev) => ({ ...prev, review: htmlString }));
    setIncreaseHeight((prev) => ({ ...prev, review: increaseHeight }));
  };

  const changeExplanationPos = () => {
    const div = document.createElement("div");
    div.innerHTML = data?.explanation;
    const elements = Array.from(div.querySelectorAll("*"));

    const newElements = elements.filter((el) => {
      const topValue = el.style.top;
      return topValue && topValue;
    });

    newElements.sort((a, b) => {
      return parseFloat(a.style.top) - parseFloat(b.style.top);
    });

    let htmlString = "";
    let increaseHeight = 0;

    newElements.forEach((el, index) => {
      const div = document.createElement("div");
      div.style.position = "relative";

      let offsetValue = 0;
      if (el.tagName === "SPAN") {
        document.body.appendChild(el);
        offsetValue = el.getBoundingClientRect().height;
        document.body.removeChild(el);
      } else {
        div.appendChild(el);
      }
      if (offsetValue > 0) {
        increaseHeight += offsetValue;
        div.style.height = offsetValue + "px";
        div.appendChild(el);
      }

      htmlString += div.outerHTML;
    });
    setsmallScreen((prev) => ({ ...prev, explanation: htmlString }));
    setIncreaseHeight((prev) => ({ ...prev, explanation: increaseHeight }));
  };

  const changeCorrectData = () => {
    const div = document.createElement("div");
    div.innerHTML = htmlDataCorrect;
    const elements = Array.from(div.querySelectorAll("*"));
    const newElements = elements.filter((el) => {
      const topValue = el.style?.top;
      return topValue && topValue;
    });
    newElements.sort((a, b) => {
      return parseFloat(a.style.top) - parseFloat(b.style.top);
    });

    const parentDiv = document.createElement("div");
    parentDiv.style.position = "relative";
    parentDiv.style.height = data?.questionHeight + "px";
    newElements.forEach((el) => {
      if (el.tagName === "DIV") {
        const widthValue = Number(el.style.width.replace("px", ""));
        if (widthValue > 300) {
          el.style.width = "270px";
        }
      }
      parentDiv.appendChild(el);
    });
    setsmallScreen((prev) => ({ ...prev, correctData: parentDiv.outerHTML }));
  };

  useEffect(() => {
    changeQuestionPos();
    changeReviewPos();
    changeExplanationPos();
    changeCorrectData();
  }, [windowWidth, htmlDataCorrect, IsWrongAns, data]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      setWindowWidth(width);
    });
  }, [window.innerWidth]);

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
  };

  const handleChangeOpacityOut = (e: any) => {
    if (e.target.tagName === "DIV") {
      const divElements = divRef.current.querySelectorAll("div");
      const divArray = Array.from(divElements) as any[];
      divArray.forEach((div) => {
        if (div.tagName === "DIV") {
          if (div.id !== targetId) {
            div.style.opacity = "100%";
          }
        }
      });
    }
  };

  const handleClick = (e: any) => {
    if (e.target.id) {
      let htmlString = "";
      // Updating Styles
      const divElements = divRef.current.querySelectorAll("div");

      const divArray = Array.from(divElements) as any[];
      divArray.forEach((div) => {
        if (div.id) {
          div.style.opacity = "100%";
          if (div.id === e.target.id) {
            setTargetId(e.target.id);
            if (e.target.tagName === "DIV") {
              div.style.backgroundColor = "#ade8f4";
            }
            div.style.scale = "107%";
          } else {
            div.style.backgroundColor = "white";
            div.style.scale = "100%";
          }
          htmlString += div.outerHTML;
        }
      });
      setHtmlDataCorrect(htmlString);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!targetId) {
      setIsIncomplete(true);
      return;
    }
    let isFound = false;
    let isCorrect = false;
    data?.correctAnswer.forEach((ans: any) => {
      if (ans.id === Number(targetId)) {
        isFound = true;
        isCorrect = JSON.parse(ans.answer);
      }
    });

    if (isFound) {
      if (!isCorrect) {
        // For Correct Html Data Start
        const divElement = document.createElement("div");
        divElement.innerHTML = data?.example;
        const questionElements = divElement.querySelectorAll("*");

        const parentDivCorrect = document.createElement("div");
        parentDivCorrect.style.position = "relative";
        parentDivCorrect.style.height = data?.questionHeight + "px";

        questionElements.forEach((el) => {
          if (el.id) {
            data?.correctAnswer.forEach((ans: any) => {
              if (ans?.id === Number(el.id)) {
                if (JSON.parse(ans.answer)) {
                  // @ts-ignore
                  el.style.opacity = "100%";
                  // @ts-ignore
                  el.style.backgroundColor = "#ade8f4";
                  // @ts-ignore
                  el.style.scale = "107%";
                } else {
                  // @ts-ignore
                  el.style.opacity = "80%";
                  // @ts-ignore
                  el.style.backgroundColor = "#fff";
                  // @ts-ignore
                  el.style.scale = "100%";
                }
              }
            });
            parentDivCorrect.appendChild(el);
          }
        });
        setHtmlDataCorrect(parentDivCorrect.outerHTML);
        // For Correct Html Data End

        // For Wrong Html Data Start

        const parentDivWrong = document.createElement("div");
        parentDivWrong.style.position = "absolute";
        parentDivWrong.style.height = data?.questionHeight + "px";

        questionElements.forEach((el) => {
          if (el.id) {
            // @ts-ignore
            if (el.id === targetId) {
              // @ts-ignore
              el.style.opacity = "100%";
              // @ts-ignore
              el.style.backgroundColor = "#ade8f4";
              // @ts-ignore
              el.style.scale = "107%";
            } else {
              // @ts-ignore
              el.style.opacity = "80%";
              // @ts-ignore
              el.style.backgroundColor = "white";
              // @ts-ignore
              el.style.scale = "100%";
            }
            parentDivWrong.appendChild(el);
          }
        });
        setHtmlDataWrong(parentDivWrong.outerHTML);
        // For Wrong Html Data End

        setIsWrongAns(true);
        setTargetId(null);
      } else {
        setIsCorrectAns(true);
        setScore((prev) => prev + 10);
        setTargetId(null);
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
      {IsWrongAns ? (
        <div className="flex flex-col gap-8 mt-5 w-full">
          {/* Correct Answer */}
          <div className="relative flex flex-col gap-3 w-[700px]">
            <h1 className="text-4xl font-semibold text-blue">
              Sorry, incorrect...
            </h1>
            <p className="text-darkGreen text-base">The correct answer is:</p>
            <div className="flex items-center">
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html:
                    windowWidth > 800
                      ? htmlDataCorrect
                      : smallScreen.correctData,
                }}
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
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold text-darkGreen">
              Explanation
            </h1>
            <div
              style={{
                height:
                  windowWidth > 800
                    ? `${data?.reviewHeight}px`
                    : `${data?.reviewHeight + increaseHeight.review}px`,
              }}
              className={`relative border border-gray-400 rounded-md ${
                windowWidth > 800 ? "px-8" : "px-6"
              } py-5`}
            >
              <img
                src={icons.review}
                alt="Review"
                className="absolute -left-3 top-5"
              />
              <div
                className="relative"
                dangerouslySetInnerHTML={{
                  __html: windowWidth > 800 ? data?.review : smallScreen.review,
                }}
              />
              <div className="absolute bottom-2 flex flex-col gap-3 h-full">
                <h3
                  style={{
                    bottom: `calc(${data?.questionHeight || 0}px + 10px)`,
                  }}
                  className={`absolute text-xl font-medium text-darkGreen whitespace-nowrap`}
                >
                  You answered:
                </h3>
                <div
                  style={{ bottom: `${data?.questionHeight}px` }}
                  className={`flex items-center absolute`}
                >
                  <div dangerouslySetInnerHTML={{ __html: htmlDataWrong }} />
                </div>
              </div>
            </div>
          </div>
          {/* Solution */}
          <div
            style={{
              height:
                windowWidth > 800
                  ? `${data?.explanationHeight}px`
                  : `${data?.explanationHeight + increaseHeight.explanation}px`,
            }}
            className={`relative border border-gray-400 rounded-md py-5 ${
              windowWidth > 800 ? "px-8" : "px-6"
            }`}
          >
            <img
              src={icons.explanation}
              alt="Review"
              className="absolute -left-3 top-5"
            />
            <div
              className="relative"
              dangerouslySetInnerHTML={{
                __html:
                  windowWidth > 800
                    ? data?.explanation
                    : smallScreen.explanation,
              }}
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
          className={`w-[68%] sm:w-[75%] md:w-[75%] lg:w-[850px] h-full absolute top-0 ${
            windowWidth > 800 ? "left-8" : "left-4"
          }`}
        >
          <div
            ref={divRef}
            onClick={handleClick}
            onMouseOver={handleChangeOpacityOver}
            onMouseOut={handleChangeOpacityOut}
            dangerouslySetInnerHTML={{
              __html: windowWidth > 800 ? data?.question : smallScreen.question,
            }}
          />
        </form>
      )}
    </>
  );
}

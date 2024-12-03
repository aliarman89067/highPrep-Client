import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import icons from "@/constant/icons";

type Props = {
  data: any;
  setIsIncomplete: Dispatch<SetStateAction<boolean>>;
  setIsWrongAns: Dispatch<SetStateAction<boolean>>;
  IsWrongAns: boolean;
  setIsCorrectAns: Dispatch<SetStateAction<boolean>>;
  isCorrectAns: boolean;
  setQuestionAnswered: Dispatch<SetStateAction<number>>;
  setScore: Dispatch<SetStateAction<number>>;
  setScreenHeight: any;
};

export default function ChooseTextUnit({
  data,
  setIsIncomplete,
  setIsWrongAns,
  IsWrongAns,
  setIsCorrectAns,
  isCorrectAns,
  setScreenHeight,
  setQuestionAnswered,
  setScore,
}: Props) {
  // States
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [increaseHeight, setIncreaseHeight] = useState({
    question: 0,
    review: 0,
    explanation: 0,
    screenHeight: 0,
    questionHeight: 0,
  });
  const [smallScreen, setsmallScreen] = useState({
    question: "",
    review: "",
    explanation: "",
    correctData: "",
    wrongData: "",
  });
  const [htmlDataCorrect, setHtmlDataCorrect] = useState<string>("");
  const [htmlDataWrong, setHtmlDataWrong] = useState<string>("");
  const [targetId, setTargetId] = useState<null | number>(null);
  // Ref
  const divRef = useRef<any>("null");

  const changeQuestionPos = () => {
    const div = document.createElement("div");
    div.style.pointerEvents = "none";
    div.innerHTML = data?.question;
    const elements = Array.from(div.querySelectorAll("*"));

    const newElements = elements.filter((el) => {
      // @ts-ignore
      const topValue = el.style.top;
      return topValue && topValue;
    });

    newElements.sort((a, b) => {
      // @ts-ignore
      return parseFloat(a.style.top) - parseFloat(b.style.top);
    });

    let htmlString = "";
    let increaseHeight = 0;
    newElements.forEach((el) => {
      const div = document.createElement("div");
      div.style.pointerEvents = "none";
      div.style.position = "relative";

      let offsetValue = 0;
      if (el.tagName === "SPAN") {
        document.body.appendChild(el);
        offsetValue = el.getBoundingClientRect().height;
        document.body.removeChild(el);
      } else {
        if (el.tagName === "DIV" && el.id) {
          // @ts-ignore
          const widthValue = Number(el.style.width.replace("px", ""));
          if (widthValue > 350) {
            // @ts-ignore
            el.style.width = "300px";
            const insideText = el.querySelector("p");
            if (insideText) {
              insideText.style.fontSize = "14px";
            }
            // @ts-ignore
            el.style.pointerEvents = "auto";
            div.appendChild(el);
          } else {
            // @ts-ignore
            el.style.pointerEvents = "auto";
            div.appendChild(el);
          }
        } else {
          // @ts-ignore
          el.style.pointerEvents = "auto";
          div.appendChild(el);
        }
      }
      if (offsetValue > 0) {
        if (offsetValue > 30) {
          div.style.height = offsetValue + "px";
          increaseHeight += offsetValue;
        }
        // @ts-ignore
        el.style.pointerEvents = "auto";
        div.appendChild(el);
      }

      htmlString += div.outerHTML;
    });
    setsmallScreen((prev) => ({ ...prev, question: htmlString }));
    // setIncreaseHeight((prev) => ({ ...prev, questionHeight: increaseHeight }));
    setScreenHeight(data?.screenHeight + increaseHeight);
  };

  const changeReviewPos = () => {
    const div = document.createElement("div");
    div.innerHTML = data?.review;
    const elements = Array.from(div.querySelectorAll("*"));

    const newElements = elements.filter((el) => {
      // @ts-ignore
      const topValue = el.style.top;
      return topValue && topValue;
    });

    newElements.sort((a, b) => {
      // @ts-ignore
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
        if (el.tagName === "DIV" || el.tagName === "IMG") {
          // @ts-ignore
          const widthValue = Number(el.style.width.replace("px", ""));
          if (widthValue > 350) {
            // @ts-ignore
            el.style.width = "300px";
            const insideText = el.querySelector("p");
            if (insideText) {
              insideText.style.fontSize = "14px";
            }
          }
        }
        div.appendChild(el);
      }
      if (offsetValue > 0) {
        if (offsetValue > 30) {
          div.style.height = offsetValue + "px";
          increaseHeight += offsetValue;
        }

        div.appendChild(el);
      }

      htmlString += div.outerHTML;
    });
    setsmallScreen((prev) => ({ ...prev, review: htmlString }));
    setIncreaseHeight((prev) => ({ ...prev, review: increaseHeight }));
  };

  const changeCorrectData = () => {
    const div = document.createElement("div");
    div.style.pointerEvents = "none";
    div.innerHTML = htmlDataCorrect;
    const elements = Array.from(div.querySelectorAll("*"));

    const newElements = elements.filter((el) => {
      // @ts-ignore
      const topValue = el.style.top;
      return topValue && topValue;
    });

    newElements.sort((a, b) => {
      // @ts-ignore
      return parseFloat(a.style.top) - parseFloat(b.style.top);
    });

    let htmlString = "";
    let increaseHeight = 0;
    newElements.forEach((el) => {
      const div = document.createElement("div");
      div.style.pointerEvents = "none";
      div.style.position = "relative";

      let offsetValue = 0;
      if (el.tagName === "SPAN") {
        document.body.appendChild(el);
        offsetValue = el.getBoundingClientRect().height;
        document.body.removeChild(el);
      } else {
        if (el.tagName === "DIV" && el.id) {
          // @ts-ignore
          const widthValue = Number(el.style.width.replace("px", ""));
          if (widthValue > 350) {
            // @ts-ignore
            el.style.width = "300px";
            const insideText = el.querySelector("p");
            if (insideText) {
              insideText.style.fontSize = "14px";
            }
            // @ts-ignore
            el.style.pointerEvents = "auto";
            div.appendChild(el);
          } else {
            // @ts-ignore
            el.style.pointerEvents = "auto";
            div.appendChild(el);
          }
        } else {
          // @ts-ignore
          el.style.pointerEvents = "auto";
          div.appendChild(el);
        }
      }
      if (offsetValue > 0) {
        if (offsetValue > 30) {
          div.style.height = offsetValue + "px";
          increaseHeight += offsetValue;
        }
        // @ts-ignore
        el.style.pointerEvents = "auto";
        div.appendChild(el);
      }

      htmlString += div.outerHTML;
    });
    setsmallScreen((prev) => ({ ...prev, correctData: htmlString }));
    setIncreaseHeight((prev) => ({ ...prev, screenHeight: increaseHeight }));
  };
  const changeWrongtData = () => {
    const div = document.createElement("div");
    div.innerHTML = htmlDataWrong;
    const elements = Array.from(div.querySelectorAll("*"));

    const newElements = elements.filter((el) => {
      // @ts-ignore
      const topValue = el.style.top;
      return topValue && topValue;
    });

    newElements.sort((a, b) => {
      // @ts-ignore
      return parseFloat(a.style.top) - parseFloat(b.style.top);
    });

    let htmlString = "";

    let prevTop = 0;

    newElements.forEach((el) => {
      const div = document.createElement("div");
      div.style.position = "relative";
      div.style.width = "600px";

      let offsetValue = 0;
      if (el.tagName === "SPAN") {
        document.body.appendChild(el);
        offsetValue = el.getBoundingClientRect().height;
        document.body.removeChild(el);
      } else {
        if (el.tagName === "DIV" && el.id) {
          // @ts-ignore
          const widthValue = Number(el.style.width.replace("px", ""));
          if (widthValue > 350) {
            // @ts-ignore
            el.style.width = "300px";
            // @ts-ignore
            const prevHeight = Number(el.style.height.replace("px", ""));
            // @ts-ignore
            el.style.height = prevHeight + 40 + "px";
            // @ts-ignore
            prevTop += Number(el.style.top.replace("px", ""));
            // @ts-ignore
            el.style.top = prevTop + 40 + "px";
            const insideText = el.querySelector("p");
            if (insideText) {
              insideText.style.fontSize = "14px";
            }
            div.appendChild(el);
          } else {
            div.appendChild(el);
          }
        } else {
          div.appendChild(el);
        }
      }
      if (offsetValue > 0) {
        if (offsetValue > 30) {
          div.style.height = offsetValue + "px";
        }
        div.appendChild(el);
      }

      htmlString += div.outerHTML;
    });
    setsmallScreen((prev) => ({ ...prev, wrongData: htmlString }));
  };
  const changeExplanationPos = () => {
    const div = document.createElement("div");
    div.innerHTML = data?.explanation;
    const elements = Array.from(div.querySelectorAll("*"));

    const newElements = elements.filter((el) => {
      // @ts-ignore
      const topValue = el.style.top;
      return topValue && topValue;
    });

    newElements.sort((a, b) => {
      // @ts-ignore
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
        if (offsetValue > 30 && el.tagName === "SPAN") {
          increaseHeight += offsetValue;
          div.style.height = offsetValue + "px";
        }
        if (el.tagName === "DIV" || el.tagName === "IMG") {
          // @ts-ignore
          const widthValue = Number(el.style.width.replace("px", ""));
          if (widthValue > 350) {
            // @ts-ignore
            el.style.width = "300px";
            const insideText = el.querySelector("p");
            if (insideText) {
              insideText.style.fontSize = "14px";
            }
          }
        }
        div.appendChild(el);
      }

      htmlString += div.outerHTML;
    });
    setsmallScreen((prev) => ({ ...prev, explanation: htmlString }));
    setIncreaseHeight((prev) => ({ ...prev, explanation: increaseHeight }));
  };

  //   Useeffect
  useEffect(() => {
    changeQuestionPos();
    changeReviewPos();
    changeExplanationPos();
    changeCorrectData();
    changeWrongtData();
  }, [windowWidth, isCorrectAns, IsWrongAns]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      setWindowWidth(width);
    });
  }, [window.innerWidth]);

  useEffect(() => {
    if (data?.screenHeight) {
      setScreenHeight(data?.screenHeight);
      changeQuestionPos();
    }
  }, [data]);

  const handleChangeOpacityOver = (e: any) => {
    const elements = divRef.current.querySelectorAll("*");

    elements.forEach((el: any) => {
      if (el.id === targetId) return;
      if (el.tagName === "SPAN" && el.id) {
        if (el.id === e.target.id) {
          el.style.textDecoration = "underline";
          el.style.textDecorationColor = "#00b4d8";
          el.style.textDecorationThickness = "2px";
          el.style.textUnderlineOffset = "3px";
          el.style.textDecorationStyle = "dashed";
          el.style.cursor = "pointer";
        } else {
          el.style.textDecoration = "none";
          el.style.cursor = "pointer";
        }
      }
    });
  };
  const handleChangeOpacityOut = (e: any) => {
    const elements = divRef.current.querySelectorAll("*");

    elements.forEach((el: any) => {
      if (el.id === targetId) return;
      if (el.tagName === "SPAN" && el.id) {
        if (el.id === e.target.id) {
          el.style.textDecoration = "none";
          el.style.cursor = "pointer";
        }
      }
    });
  };

  const handleClick = (e: any) => {
    if (e.target.id) {
      let htmlString = "";
      // Updating Styles
      const divElements = divRef.current.querySelectorAll("*");

      const divArray = Array.from(divElements) as any[];
      divArray.forEach((div) => {
        if (div.id) {
          div.style.opacity = "100%";
          if (e.target.tagName === "SPAN") {
            if (div.id === e.target.id) {
              setTargetId(e.target.id);
              div.style.textDecoration = "underline";
              div.style.textDecorationColor = "#00b4d8";
              div.style.textDecorationThickness = "2px";
              div.style.textUnderlineOffset = "3px";
              div.style.textDecorationStyle = "solid";
              div.style.cursor = "pointer";
            } else {
              div.style.textDecoration = "none";
              div.style.cursor = "pointer";
            }
          }
          htmlString += div.outerHTML;
        }
      });
      setHtmlDataCorrect(htmlString);
    }
  };
  // Submit
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

        // Calculate Top Value Start
        const elements = Array.from(divElement.querySelectorAll("*"));

        const newElements = elements.filter((el) => {
          // @ts-ignore
          const topValue = el.style.top;
          const isIdExist = el.id;
          if (topValue && isIdExist) return topValue;
        });

        newElements.sort((a, b) => {
          // @ts-ignore
          return parseFloat(a.style.top) - parseFloat(b.style.top);
        });
        // Calculate Top Value End

        let htmlStringCorrect = "";
        let elOffsetHeightCorrect = 0;

        questionElements.forEach((el) => {
          if (el.id) {
            data?.correctAnswer.forEach((ans: any) => {
              if (ans?.id === Number(el.id)) {
                if (el.tagName === "SPAN") {
                  if (JSON.parse(ans.answer)) {
                    // @ts-ignore
                    el.style.textDecoration = "underline";
                    // @ts-ignore
                    el.style.textDecorationColor = "#00b4d8";
                    // @ts-ignore
                    el.style.textDecorationThickness = "2px";
                    // @ts-ignore
                    el.style.textUnderlineOffset = "3px";
                    // @ts-ignore
                    el.style.textDecorationStyle = "solid";
                    // @ts-ignore
                    el.style.cursor = "pointer";

                    // for (let i = 0; i <= newElements.length - 1; i++) {
                    //   if (el != newElements[0]) {
                    //     const prevTopValue = Number(
                    //       // @ts-ignore
                    //       el.style.top.replace("px", "")
                    //     );
                    //     document.body.appendChild(el);
                    //     elOffsetHeightCorrect =
                    //       el.getBoundingClientRect().height;
                    //     document.body.removeChild(el);
                    //     // @ts-ignore
                    //     el.style.top =
                    //       prevTopValue - elOffsetHeightCorrect + "px";
                    //   }
                    // }
                    // @ts-ignore
                    el.style.top = "10px";

                    htmlStringCorrect += el.outerHTML;
                  } else {
                    // @ts-ignore
                    el.style.textDecoration = "none";
                    // @ts-ignore
                    el.style.cursor = "pointer";
                  }
                }
              }
            });
          }
        });
        // parentDivCorrect.style.display = "flex";
        setHtmlDataCorrect(htmlStringCorrect);
        // For Correct Html Data End

        // For Wrong Html Data Start

        let htmlStringWrong = "";
        let elOffsetHeightWrong = 0;
        questionElements.forEach((el) => {
          if (el.id) {
            if (el.tagName === "SPAN") {
              // @ts-ignore
              if (el.id === targetId) {
                // @ts-ignore
                el.style.textDecoration = "underline";
                // @ts-ignore
                el.style.textDecorationColor = "#ff758f";
                // @ts-ignore
                el.style.textDecorationThickness = "2px";
                // @ts-ignore
                el.style.textUnderlineOffset = "3px";
                // @ts-ignore
                el.style.textDecorationStyle = "solid";
                // @ts-ignore
                el.style.cursor = "pointer";
                // @ts-ignore
                // for (let i = 0; i <= newElements.length - 1; i++) {
                //   if (el != newElements[0]) {
                //     // @ts-ignore
                //     const prevTopValue = Number(el.style.top.replace("px", ""));
                //     document.body.appendChild(el);
                //     elOffsetHeightWrong = el.getBoundingClientRect().height;
                //     document.body.removeChild(el);
                //     // @ts-ignore
                //     el.style.top = prevTopValue - elOffsetHeightWrong + "px";
                //   }
                // }
                el.style.top = "10px";
                htmlStringWrong += el.outerHTML;
              } else {
                // @ts-ignore
                el.style.textDecoration = "none";
                // @ts-ignore
                el.style.cursor = "pointer";
              }
            }
          }
        });

        setHtmlDataWrong(htmlStringWrong);
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

  console.log(data?._id);

  return (
    <>
      {IsWrongAns ? (
        <div className="flex flex-col gap-8 mt-5 w-full">
          {/* Correct Answer */}
          <div className="relative flex flex-col gap-3 min-h-[380px] w-[70%]  sm:w-[75%] md:w-[75%] lg:w-[850px]">
            <h1 className="text-4xl font-semibold text-blue">
              Sorry, incorrect...
            </h1>
            <p className="text-darkGreen text-base">The correct answer is:</p>
            <div
              style={{
                height:
                  windowWidth > 1000
                    ? data?.questionHeight
                    : data?.questionHeight + increaseHeight.screenHeight,
              }}
              className="flex items-start relative"
            >
              <div
                className="w-full pointer-events-none select-none"
                dangerouslySetInnerHTML={{
                  __html:
                    windowWidth > 1000
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
                  windowWidth > 1000
                    ? `${data?.reviewHeight}px`
                    : `${data?.reviewHeight + increaseHeight.review}px`,
              }}
              className={`relative border border-gray-400 rounded-md ${
                windowWidth > 1000 ? "px-8" : "px-6"
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
                  __html:
                    windowWidth > 1000 ? data?.review : smallScreen.review,
                }}
              />
              <div className="flex flex-col gap-3 h-full">
                <h3
                  style={{
                    bottom: `calc(${data?.questionHeight || 0}px + 10px)`,
                  }}
                  className={`absolute text-xl font-medium text-darkGreen whitespace-nowrap `}
                >
                  You answered:
                </h3>
                <div
                  style={{
                    bottom: `${data?.questionHeight}px`,
                  }}
                  className={`flex items-center absolute bottom-2 w-[90%] lg:w-[800px]`}
                >
                  <div
                    className="pointer-events-none select-none"
                    dangerouslySetInnerHTML={{
                      __html: htmlDataWrong,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Solution */}
          <div
            style={{
              height:
                windowWidth > 1000
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
          className={`w-[68%] sm:w-[75%] md:w-[75%] lg:w-[800px] h-full absolute top-0 ${
            windowWidth > 800 ? "left-8" : "left-4"
          }`}
        >
          <div
            ref={divRef}
            onClick={handleClick}
            onMouseOver={handleChangeOpacityOver}
            onMouseOut={handleChangeOpacityOut}
            dangerouslySetInnerHTML={{
              __html:
                windowWidth > 1000 ? data?.question : smallScreen.question,
            }}
          />
        </form>
      )}
    </>
  );
}

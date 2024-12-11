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
  setQuestionAnswered: Dispatch<SetStateAction<number>>;
  setScore: Dispatch<SetStateAction<number>>;
  setScreenHeight: any;
};

export default function ChooseUnit({
  data,
  setIsIncomplete,
  IsWrongAns,
  setIsWrongAns,
  setIsCorrectAns,
  setQuestionAnswered,
  setScore,
  setScreenHeight,
}: Props) {
  const [targetId, setTargetId] = useState<null | number>(null);
  const [htmlDataCorrect, setHtmlDataCorrect] = useState<string>("");
  const [htmlDataWrong, setHtmlDataWrong] = useState<string>("");
  const [isPageLoaded, setisPageLoaded] = useState<boolean>(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [increaseHeight, setIncreaseHeight] = useState({
    question: 0,
    review: 0,
    reminder: 0,
    explanation: 0,
  });
  const [smallScreen, setsmallScreen] = useState({
    question: "",
    review: "",
    reminder: "",
    explanation: "",
    correctData: "",
    wrongData: "",
  });

  const divRef = useRef<any>();

  const changeQuestionPos = () => {
    const div = document.createElement("div");
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
    let increaseOffsetHeight = 0;

    newElements.forEach((el) => {
      const div = document.createElement("div");
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
          if (widthValue >= 300) {
            // @ts-ignore
            el.style.width = "280px";
            // @ts-ignore
            // const prevHeight = Number(el.style.height.replace("px", ""));
            // // @ts-ignore
            // el.style.height = prevHeight + 40 + "px";
            // // @ts-ignore
            // prevTop += Number(el.style.top.replace("px", ""));
            // // @ts-ignore
            // el.style.top = prevTop + 40 + "px";
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
          increaseOffsetHeight += offsetValue;
        }
        div.appendChild(el);
      }

      htmlString += div.outerHTML;
    });
    setsmallScreen((prev) => ({ ...prev, question: htmlString }));
    setScreenHeight(data?.screenHeight + increaseOffsetHeight);
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
  const changeReminderPos = () => {
    if (data?.reminder) {
      const div = document.createElement("div");
      div.innerHTML = data?.reminder;
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
      setsmallScreen((prev) => ({ ...prev, reminder: htmlString }));
      setIncreaseHeight((prev) => ({ ...prev, reminder: increaseHeight }));
    }
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

  const changeCorrectData = () => {
    const div = document.createElement("div");
    div.innerHTML = htmlDataCorrect;

    const elements = Array.from(div.querySelectorAll("*"));

    const newElements = elements.filter((el) => {
      // @ts-ignore
      const topValue = el.style?.top;
      return topValue && topValue;
    });
    newElements.sort((a, b) => {
      // @ts-ignore
      return parseFloat(a.style.top) - parseFloat(b.style.top);
    });

    const parentDiv = document.createElement("div");
    parentDiv.style.position = "relative";
    parentDiv.style.height = data?.questionHeight + "px";

    newElements.forEach((el) => {
      if (el.tagName === "DIV" || el.tagName === "IMG") {
        // @ts-ignore
        const widthValue = Number(el.style.width.replace("px", ""));
        if (widthValue >= 300) {
          // @ts-ignore
          el.style.width = "280px";
          const insideText = el.querySelector("p");
          if (insideText) {
            insideText.style.fontSize = "14px";
          }
        }
      }
      const newDiv = document.createElement("div");
      newDiv.style.position = "relative";
      // @ts-ignore
      newDiv.style.width = Number(el.style.width.replace("px", "")) + "px";
      newDiv.appendChild(el);
      parentDiv.appendChild(newDiv);
    });
    setsmallScreen((prev) => ({ ...prev, correctData: parentDiv.outerHTML }));
  };
  const changeWrongtData = () => {
    const div = document.createElement("div");
    div.innerHTML = htmlDataWrong;

    const elements = Array.from(div.querySelectorAll("*"));

    const newElements = elements.filter((el) => {
      // @ts-ignore
      const topValue = el.style?.top;
      return topValue && topValue;
    });
    newElements.sort((a, b) => {
      // @ts-ignore
      return parseFloat(a.style.top) - parseFloat(b.style.top);
    });

    const parentDiv = document.createElement("div");

    newElements.forEach((el) => {
      if (el.tagName === "DIV" || el.tagName === "IMG") {
        // @ts-ignore
        const widthValue = Number(el.style.width.replace("px", ""));
        if (widthValue > 300) {
          // @ts-ignore
          el.style.width = "300px";
          const insideText = el.querySelector("p");
          if (insideText) {
            insideText.style.fontSize = "14px";
          }
        }
      }
      const newDiv = document.createElement("div");
      newDiv.style.position = "relative";
      // @ts-ignore
      newDiv.style.width = Number(el.style.width.replace("px", "")) + "px";
      newDiv.appendChild(el);
      parentDiv.appendChild(newDiv);
    });
    setsmallScreen((prev) => ({ ...prev, wrongData: parentDiv.outerHTML }));
  };

  useEffect(() => {
    changeQuestionPos();
    changeReviewPos();
    changeExplanationPos();
    changeCorrectData();
    changeWrongtData();
    changeReminderPos();
  }, [windowWidth, htmlDataCorrect, IsWrongAns, data]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      setWindowWidth(width);
    });
  }, [window.innerWidth]);

  useEffect(() => {
    if (!divRef) return;
    setisPageLoaded(true);

    const div = document.createElement("div");
    div.innerHTML = data?.question;

    const imgElement = div.querySelector("img");

    if (imgElement) {
      const newImg = new Image();
      newImg.src = imgElement.src;
      newImg.onload = () => {
        setisPageLoaded(false);
      };
    } else {
      setisPageLoaded(false);
    }
  }, [data]);

  useEffect(() => {
    if (data?.screenHeight) {
      setScreenHeight(data?.screenHeight);
      changeQuestionPos();
    }
  }, [data]);

  const handleChangeOpacityOver = (e: any) => {
    if (e.target.tagName === "DIV" || e.target.tagName === "IMG") {
      const divElements = divRef.current.querySelectorAll("*");
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
        if (div.tagName === "IMG" && div.id) {
          if (div.id !== targetId) {
            if (div.id === e.target.id) {
              div.style.scale = "106%";
              div.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
            } else {
              div.style.scale = "100%";
              div.style.boxShadow = "none";
            }
          }
        }
      });
    }
  };
  console.log(data._id, "Choose one ID");

  const handleChangeOpacityOut = (e: any) => {
    if (e.target.tagName === "DIV" || e.target.tagName === "IMG") {
      const divElements = divRef.current.querySelectorAll("*");
      const divArray = Array.from(divElements) as any[];
      divArray.forEach((div) => {
        if (div.tagName === "DIV") {
          if (div.id !== targetId) {
            div.style.opacity = "100%";
          }
        }
        if (div.tagName === "IMG") {
          if (div.id !== targetId) {
            div.style.scale = "100%";
            div.style.boxShadow = "none";
          }
        }
      });
    }
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
          if (e.target.tagName === "DIV") {
            if (div.id === e.target.id) {
              setTargetId(e.target.id);
              div.style.backgroundColor = "#ade8f4";
              div.style.scale = "107%";
            } else {
              div.style.backgroundColor = "white";
              div.style.scale = "100%";
            }
          }
          if (e.target.tagName === "IMG") {
            if (div.id === e.target.id) {
              setTargetId(e.target.id);
              div.style.scale = "110%";
              div.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
              div.style.filter = "grayscale(0%)";
            } else {
              div.style.scale = "100%";
              div.style.boxShadow = "none";
              div.style.filter = "grayscale(100%)";
            }
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
        let htmlStringCorrect = "";
        questionElements.forEach((el) => {
          if (el.id) {
            data?.correctAnswer.forEach((ans: any) => {
              if (ans?.id === Number(el.id)) {
                if (el.tagName === "DIV") {
                  if (JSON.parse(ans.answer)) {
                    // @ts-ignore
                    el.style.opacity = "100%";
                    // @ts-ignore
                    el.style.backgroundColor = "#9ef01a";
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
                if (el.tagName === "IMG") {
                  if (JSON.parse(ans.answer)) {
                    // @ts-ignore
                    el.style.scale = "110%";
                    // @ts-ignore
                    el.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
                    // @ts-ignore
                    el.style.filter = "grayscale(0%)";
                    // @ts-ignore
                    el.style.opacity = "100%";
                  } else {
                    // @ts-ignore
                    el.style.scale = "100%";
                    // @ts-ignore
                    el.style.boxShadow = "none";
                    // @ts-ignore
                    el.style.filter = "grayscale(100%)";
                    // @ts-ignore
                    el.style.opacity = "60%";
                  }
                }
              }
            });
            // parentDivCorrect.appendChild(el);
            htmlStringCorrect += el.outerHTML;
          }
        });
        // parentDivCorrect.style.display = "flex";
        setHtmlDataCorrect(htmlStringCorrect);
        // For Correct Html Data End

        // For Wrong Html Data Start
        let htmlStringWrong = "";

        questionElements.forEach((el) => {
          if (el.id) {
            if (el.tagName === "DIV") {
              // @ts-ignore
              if (el.id === targetId) {
                // @ts-ignore
                el.style.opacity = "100%";
                // @ts-ignore
                el.style.backgroundColor = "#ff758f";
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
            }
            if (el.tagName === "IMG") {
              // @ts-ignore
              if (el.id === targetId) {
                // @ts-ignore
                el.style.scale = "110%";
                // @ts-ignore
                el.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
                // @ts-ignore
                el.style.filter = "grayscale(0%)";
                // @ts-ignore
                el.style.opacity = "100%";
              } else {
                // @ts-ignore
                el.style.scale = "100%";
                // @ts-ignore
                el.style.boxShadow = "none";
                // @ts-ignore
                el.style.filter = "grayscale(100%)";
                // @ts-ignore
                el.style.opacity = "60%";
              }
            }

            const newDiv = document.createElement("div");
            newDiv.style.position = "relative";
            newDiv.style.width = `${Number(
              // @ts-ignore
              el.style.width.replace("px", "")
            )}px`;
            newDiv.appendChild(el);
            htmlStringWrong += newDiv.outerHTML;
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
        <div className="flex flex-col gap-8 mt-5 w-full">
          {/* Correct Answer */}
          <div className="relative flex flex-col gap-3  min-h-[380px]">
            <h1 className="text-4xl font-semibold text-blue">
              Sorry, incorrect...
            </h1>
            <p className="text-darkGreen text-base">The correct answer is:</p>
            <div
              style={{ height: `${data?.questionHeight}px` }}
              className="flex items-center relative"
            >
              <div
                className=""
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
                  style={{
                    bottom: `${data?.questionHeight}px`,
                  }}
                  className={`flex items-center absolute bottom-2`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        windowWidth > 1000
                          ? htmlDataWrong
                          : smallScreen.wrongData,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Reminder */}
          {data?.reminder && (
            <div
              style={{
                height:
                  windowWidth > 1000
                    ? `${data?.reminderHeight}px`
                    : `${data?.reminderHeight + increaseHeight.reminder}px`,
              }}
              className={`relative border border-gray-400 rounded-md py-5 ${
                windowWidth > 800 ? "px-8" : "px-6"
              }`}
            >
              <img
                src={icons.reminder}
                alt="Review"
                className="absolute -left-3 top-5 w-6 object-contain"
              />
              <div
                className="relative"
                dangerouslySetInnerHTML={{
                  __html:
                    windowWidth > 1000 ? data?.reminder : smallScreen.reminder,
                }}
              />
            </div>
          )}
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
                  windowWidth > 1000
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
              __html:
                windowWidth > 1000 ? data?.question : smallScreen.question,
            }}
          />
        </form>
      )}
    </>
  );
}

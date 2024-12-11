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
  setScreenHeight: any;
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
  setScreenHeight,
}: Props) {
  const [targetId, setTargetId] = useState<number[] | null>(null);
  const [htmlDataCorrect, setHtmlDataCorrect] = useState<string>("");
  const [htmlDataWrong, setHtmlDataWrong] = useState<string>("");
  const [isPageLoaded, setisPageLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [smallScreen, setSmallScreen] = useState({
    question: "",
    review: "",
    explanation: "",
    correctData: "",
    wrongData: "",
    reminder: "",
  });
  const [increaseHeight, setIncreaseHeight] = useState({
    question: 0,
    review: 0,
    explanation: 0,
    reminder: 0,
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
          if (widthValue > 350) {
            // @ts-ignore
            el.style.width = "300px";
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
    setSmallScreen((prev) => ({ ...prev, question: htmlString }));
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
    setSmallScreen((prev) => ({ ...prev, review: htmlString }));
    setIncreaseHeight((prev) => ({ ...prev, review: increaseHeight }));
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
    setSmallScreen((prev) => ({ ...prev, explanation: htmlString }));
    setIncreaseHeight((prev) => ({ ...prev, explanation: increaseHeight }));
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
      setSmallScreen((prev) => ({ ...prev, reminder: htmlString }));
      setIncreaseHeight((prev) => ({ ...prev, reminder: increaseHeight }));
    }
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
        if (widthValue > 300) {
          // @ts-ignore
          el.style.width = "270px";
          const insideText = el.querySelector("p");
          if (insideText) {
            insideText.style.fontSize = "14px";
          }
        }
      }
      parentDiv.appendChild(el);
      parentDiv.style.width = "1000px";
    });
    setSmallScreen((prev) => ({ ...prev, correctData: parentDiv.outerHTML }));
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
    setSmallScreen((prev) => ({ ...prev, wrongData: parentDiv.outerHTML }));
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
    setTargetId([]);
  }, [isCorrectAns]);

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
    } else {
      setisPageLoaded(false);
      isImageLoad = true;
    }
  }, []);

  const handleChangeOpacityOver = (e: any) => {
    if (e.target.tagName === "DIV" || e.target.tagName === "IMG") {
      const divElements = divRef.current.querySelectorAll("*");
      const divArray = Array.from(divElements) as any[];
      divArray.forEach((div) => {
        if (!targetId?.includes(div.id)) {
          if (div.tagName === "DIV" && div.id) {
            if (e.target.id === div.id) {
              if (div.id === e.target.id) {
                div.style.opacity = "70%";
              } else {
                div.style.opacity = "100%";
              }
            }
          }
          if (div.tagName === "IMG" && div.id) {
            if (!targetId?.includes(div.id) || e.target.id === div.id) {
              if (div.id === e.target.id) {
                div.style.scale = "106%";
                div.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
                div.style.opacity = "100%";
              } else {
                div.style.scale = "100%";
                div.style.boxShadow = "none";
                div.style.opacity = "80%";
              }
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
    const imgElements = divRef.current.querySelectorAll("*");
    const div = Array.from(imgElements) as any[];
    div.forEach((el) => {
      if (!targetId?.includes(el.id)) {
        if (el.tagName === "IMG" && el.id) {
          el.style.scale = "100%";
          el.style.boxShadow = "none";
          el.style.opacity = "100%";
        }
        if (el.tagName === "DIV" && el.id) {
          el.style.opacity = "100%";
        }
      }
    });
  };

  const handleClick = (e: any) => {
    if (
      (e.target.tagName === "IMG" || e.target.tagName === "DIV") &&
      e.target.id
    ) {
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
      if (e.target.tagName === "IMG") {
        e.target.style.scale = isActive ? "100%" : "110%";
        e.target.style.boxShadow = isActive
          ? "none"
          : "0 0 10px rgba(0,0,0,0.7)";
      }
      if (e.target.tagName === "DIV") {
        e.target.style.opacity = isActive ? "80%" : "100%";
        e.target.style.scale = isActive ? "100%" : "108%";
        e.target.style.backgroundColor = isActive ? "transparent" : "#ade8f4";
      }

      const el = divRef.current.querySelectorAll("*");

      const elArray = Array.from(el) as any[];
      elArray.forEach((item) => {
        if (item.id) {
          htmlString += item.outerHTML;
        }
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
        const divElement = document.createElement("div");
        divElement.innerHTML = data?.example;
        const questionElements = divElement.querySelectorAll("*");

        let htmlStringCorrect = "";

        questionElements.forEach((el) => {
          if (el.id) {
            data?.correctAnswer.forEach((ans: any) => {
              // STYLING FOR DIV
              if (el.tagName === "DIV") {
                if (ans?.id === Number(el.id)) {
                  if (JSON.parse(ans.answer)) {
                    // @ts-ignore
                    el.style.opacity = "100%";
                    // @ts-ignore
                    el.style.backgroundColor = "#9ef01a";
                    // @ts-ignore
                    el.style.scale = "107%";
                  } else {
                    // @ts-ignore
                    el.style.opacity = "100%";
                    // @ts-ignore
                    el.style.backgroundColor = "#fff";
                    // @ts-ignore
                    el.style.scale = "100%";
                  }
                }
              }
              // STYLING FOR IMAGES
              if (el.tagName === "IMG") {
                if (ans?.id === Number(el.id)) {
                  if (JSON.parse(ans.answer)) {
                    // @ts-ignore
                    el.style.filter = "grayscale(0%)";
                    // @ts-ignore
                    el.style.scale = "107%";
                    // @ts-ignore
                    el.style.opacity = "100%";
                  } else {
                    // @ts-ignore
                    el.style.filter = "grayscale(100%)";
                    // @ts-ignore
                    el.style.scale = "100%";
                    // @ts-ignore
                    el.style.opacity = "70%";
                  }
                }
              }
            });
            htmlStringCorrect += el.outerHTML;
          }
        });
        setHtmlDataCorrect(htmlStringCorrect);
        // For Correct Html Data End
        // For Wrong Html Data Start

        let htmlWrongString = "";

        questionElements.forEach((el) => {
          if (el.id) {
            if (el.tagName === "DIV") {
              // @ts-ignore
              if (targetId.includes(el.id)) {
                // @ts-ignore
                el.style.opacity = "100%";
                // @ts-ignore
                el.style.backgroundColor = "#ff758f";
                // @ts-ignore
                el.style.scale = "107%";
              } else {
                // @ts-ignore
                el.style.opacity = "100%";
                // @ts-ignore
                el.style.backgroundColor = "white";
                // @ts-ignore
                el.style.scale = "100%";
              }
            }
            if (el.tagName === "IMG") {
              // @ts-ignore
              if (targetId.includes(el.id)) {
                // @ts-ignore
                el.style.filter = "grayscale(0%)";
                // @ts-ignore
                el.style.scale = "107%";
                // @ts-ignore
                el.style.opacity = "100%";
              } else {
                // @ts-ignore
                el.style.filter = "grayscale(100%)";
                // @ts-ignore
                el.style.scale = "100%";
                // @ts-ignore
                el.style.opacity = "70%";
              }
            }
            const newDiv = document.createElement("div");
            newDiv.style.position = "relative";
            newDiv.style.width = `${Number(
              // @ts-ignore
              el.style.width.replace("px", "")
            )}px`;
            newDiv.appendChild(el);
            htmlWrongString += newDiv.outerHTML;
          }
        });

        setHtmlDataWrong(htmlWrongString);
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

  console.log(data?._id);

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
              <div className="absolute bottom-3 flex flex-col gap-3 h-full">
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
                windowWidth > 1000 ? "px-8" : "px-6"
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
                    windowWidth > 800 ? data?.reminder : smallScreen.reminder,
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
              windowWidth > 1000 ? "px-8" : "px-6"
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
            windowWidth > 1000 ? "left-8" : "left-4"
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

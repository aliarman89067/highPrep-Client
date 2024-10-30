import icons from "@/constant/icons";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "./ui/button";

type Props = {
  data: any;
  isWrongAns: boolean;
  setIsWrongAns: Dispatch<SetStateAction<boolean>>;
  userAns: string[];
  setUserAns: Dispatch<SetStateAction<string[]>>;
  setIsIncomplete: Dispatch<SetStateAction<boolean>>;
  setIsCorrectAns: Dispatch<SetStateAction<boolean>>;
  setQuestionAnswered: Dispatch<SetStateAction<number>>;
  setScore: Dispatch<SetStateAction<number>>;
};

export default function InputUnit({
  data,
  isWrongAns,
  userAns,
  setIsWrongAns,
  setUserAns,
  setIsIncomplete,
  setQuestionAnswered,
  setIsCorrectAns,
  setScore,
}: Props) {
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
  });

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
        if (offsetValue > 30) {
          div.style.height = offsetValue + "px";
        }
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
        if (offsetValue > 30) {
          increaseHeight += offsetValue;
          div.style.height = offsetValue + "px";
        }
        div.appendChild(el);
      }

      htmlString += div.outerHTML;
    });
    setsmallScreen((prev) => ({ ...prev, explanation: htmlString }));
    setIncreaseHeight((prev) => ({ ...prev, explanation: increaseHeight }));
  };

  useEffect(() => {
    changeQuestionPos();
    changeReviewPos();
    changeExplanationPos();
  }, [windowWidth, , isWrongAns, data]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      setWindowWidth(width);
    });
  }, [window.innerWidth]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserAns([]);
    let finalAnswer = true; // Start assuming true
    let isEmptyField = false;
    const formElements = Array.from(e.currentTarget.elements) as any;

    for (const element of formElements) {
      if (element.tagName === "INPUT") {
        if (!element.value) {
          isEmptyField = true;
          break;
        } else {
          setUserAns((prevAns) => [...prevAns, element.value]);

          isEmptyField = false;
        }
      }
    }
    if (isEmptyField) {
      setIsIncomplete(true);
      return;
    }
    for (const element of formElements) {
      for (const ans of data.correctAnswer) {
        if (Number(ans.id) === Number(element.id)) {
          if (ans.answer !== element.value.trim()) {
            console.log(element.value.trim());

            finalAnswer = false;
            break;
          }
        }
      }
      if (finalAnswer === false) {
        break;
      }
    }
    if (!finalAnswer) {
      setIsWrongAns(true);
    } else {
      setIsCorrectAns(true);
      setScore((prev) => prev + 10);
    }
    setQuestionAnswered((prev) => prev + 1);
  };

  return (
    <>
      {isWrongAns ? (
        <div className="flex flex-col gap-8 mt-5 w-full">
          {/* Correct Answer */}
          <div className="flex flex-col gap-3 min-h-[360px]">
            <h1 className="text-4xl font-semibold text-blue">
              Sorry, incorrect...
            </h1>
            <p className="text-darkGreen text-base">The correct answer is:</p>
            <div style={{ height: data?.questionHeight }} className="relative">
              <div dangerouslySetInnerHTML={{ __html: data?.example }} />
            </div>
            <Button
              onClick={() => setIsWrongAns(false)}
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
              <div
                className={`${
                  windowWidth > 800 ? "left-8" : "left-6"
                } absolute bottom-6 flex flex-col gap-3`}
              >
                <h3 className="text-xl font-medium text-darkGreen">
                  You answered:
                </h3>
                <div className="flex items-center">
                  {userAns.map((ans: string, index) => (
                    <div
                      key={index}
                      className="px-5 py-3 border border-gray-500 bg-gray-100 flex items-center justify-center rounded-sm text-base"
                    >
                      {ans}
                    </div>
                  ))}
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
            onClick={() => setIsWrongAns(false)}
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
            dangerouslySetInnerHTML={{
              __html: windowWidth > 800 ? data?.question : smallScreen.question,
            }}
          />
        </form>
      )}
    </>
  );
}

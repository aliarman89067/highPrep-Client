import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import icons from "@/constant/icons";
import images from "@/constant/images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function NewsRoom() {
  const [sliderIndex, setSliderIndex] = useState<number>(0);

  const increaseIndex = () => {
    setSliderIndex((prev) => {
      if (prev > 2) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };
  const decreaseIndex = () => {
    setSliderIndex((prev) => {
      if (prev <= 0) {
        return 3;
      } else {
        return prev - 1;
      }
    });
  };

  return (
    <>
      <Navbar />
      {/* MAIN CONTAINER */}
      <div className="flex flex-col">
        {/* FIRST PART */}
        <div className="min-h-screen w-full relative px-5 flex justify-center">
          <img
            src={images.newsRoomBg1}
            alt="Bg Image"
            className="absolute top-0 left-0 w-full h-full opacity-100 object-cover"
          />
          <div className="flex flex-col gap-2 items-center relative text-center max-w-3xl mx-auto mt-8">
            <img
              src={icons.logo}
              alt="Logo"
              className="w-32 h-32 object-cover mb-4"
            />
            <h1 className="text-3xl sm:text-4xl font-bold text-darkGreen text-center">
              Welcome to the <br />{" "}
              <span className="text-4xl sm:text-5xl text-primary">
                {" "}
                HIGH SCHOOL PREP{" "}
              </span>{" "}
              <br /> newsroom
            </h1>
            <p className="text-base text-gray-800 tracking-wide mt-4">
              High School Prep has transformed educational technology since its
              inception in 1998. Today, the organization stands at the forefront
              of education through innovation, providing a wide range of
              resources that support student success in math, literacy,
              language, and beyond.
            </p>
          </div>
        </div>
        {/* SECOND PART */}
        <div className="min-h-screen w-full relative px-5 flex justify-center items-center mb-10">
          <img
            src={images.newsRoomBg2}
            alt="Bg Image 2"
            className="absolute -top-0 md:-top-20 left-0 w-full min-h-[calc(100vh+80px)] object-cover z-0"
          />
          <div className="relative flex flex-col gap-2 items-center justify-center w-full">
            <h1 className="text-3xl font-semibold text-center mb-4 text-gray-800">
              Featured stories
            </h1>
            {/* Slider Container */}
            <div className="relative w-[350px] sm:w-[400px] md:w-[640px] lg:w-[780px] h-[370px] bg-white rounded-lg z-10 flex gap-2 p-3">
              {/* CONTROLLERS */}
              <div
                onClick={decreaseIndex}
                className="absolute top-[340px] md:top-1/2 -translate-y-1/2 left-2 md:-left-14 w-12 h-12 rounded-full bg-gray-800 hover:shadow-xl flex items-center justify-center hover:text-gray-800 text-white hover:bg-gray-200 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </div>
              <div
                onClick={increaseIndex}
                className="absolute top-[340px] md:top-1/2 -translate-y-1/2 right-2 md:-right-14 w-12 h-12 rounded-full bg-gray-800 hover:shadow-xl flex items-center justify-center hover:text-gray-800 text-white hover:bg-gray-200 transition-all cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </div>
              {/* Images Container */}
              <div className="h-full hidden md:flex flex-1 rounded-lg overflow-hidden">
                <div
                  style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
                  className={`w-full h-full flex rounded-lg transition-all duration-500`}
                >
                  <img
                    src={images.sliderAwards}
                    alt=""
                    className="min-w-full h-full object-cover rounded-lg pointer-events-none select-none"
                  />
                  <img
                    src={images.sliderPerformance}
                    alt=""
                    className="min-w-full h-full object-cover rounded-lg pointer-events-none select-none"
                  />
                  <img
                    src={images.sliderStudents}
                    alt=""
                    className="min-w-full h-full object-cover rounded-lg pointer-events-none select-none"
                  />
                  <img
                    src={images.sliderTeam}
                    alt=""
                    className="min-w-full h-full object-cover rounded-lg pointer-events-none select-none"
                  />
                </div>
              </div>
              {/* Context Container */}
              <div className="flex-1 gap-4 w-full">
                <div className="w-full h-[50px] overflow-hidden items-center">
                  <div
                    style={{
                      transform: `translateY(-${
                        sliderIndex === 0
                          ? 300
                          : sliderIndex === 1
                          ? 200
                          : sliderIndex === 2
                          ? 100
                          : 0
                      }%)`,
                    }}
                    className="flex flex-col h-full transition-all duration-500 ease-linear"
                  >
                    <div className="w-full min-h-[50px] flex items-center text-xl font-bold text-primary">
                      <h1>Our Team</h1>
                    </div>
                    <div className="w-full min-h-[50px] flex items-center text-xl font-bold text-primary">
                      <h1>Our Students</h1>
                    </div>
                    <div className="w-full min-h-[50px] flex items-center text-xl font-bold text-primary">
                      <h1>Our Performance</h1>
                    </div>
                    <div className="w-full min-h-[50px] flex items-center text-xl font-bold text-primary">
                      <h1>Our Rewards and Achievements</h1>
                    </div>
                  </div>
                </div>
                <div className="w-full  relative bg-red-500">
                  {/* Awards */}
                  <p
                    className={`absolute top-0 left-0 transition-all duration-700 text-[15px] sm:text-base text-gray-500 ease-linear ${
                      sliderIndex === 0 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    At HIGH SCHOOL PREP, we take immense pride in our numerous
                    awards and accolades, a testament to our unwavering
                    commitment to excellence in education. Our hard work has not
                    only been recognized by industry leaders but has also
                    translated into real-world impact for our students. We are
                    driven by a passion for learning and a desire to inspire,
                    and these achievements motivate us to continue striving for
                    greatness.
                  </p>
                  {/* Performance */}
                  <p
                    className={`absolute top-0 left-0 transition-all duration-700 text-[15px] sm:text-base text-gray-500 ease-linear ${
                      sliderIndex === 1 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Our performance speaks volumes about our dedication to
                    providing an outstanding educational experience. With
                    cutting-edge technology and a user-friendly interface, our
                    website consistently delivers exceptional results. Our
                    students enjoy an engaging and efficient learning
                    environment that fosters both personal and academic growth,
                    showcasing our commitment to excellence.
                  </p>
                  {/* Students */}
                  <p
                    className={`absolute top-0 left-0 transition-all duration-700 text-[15px] sm:text-base text-gray-500 ease-linear ${
                      sliderIndex === 2 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Our students are at the heart of everything we do. They are
                    consistently thrilled with the knowledge and skills they
                    acquire, tackling challenging questions and exploring new
                    concepts on a daily basis. The enthusiasm and success of our
                    learners reflect the effectiveness of our educational
                    resources and our supportive community, making their
                    learning journey both enjoyable and rewarding.
                  </p>
                  {/* Our Team */}
                  <p
                    className={`absolute top-0 left-0 transition-all duration-700 text-[15px] sm:text-base text-gray-500 ease-linear ${
                      sliderIndex === 3 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Behind our success is a dedicated team of educators and
                    innovators who work tirelessly to enhance our platform.
                    Their commitment to continuous improvement and passion for
                    education ensure that we provide the best possible resources
                    and support for our students. Together, we are always
                    striving to create an even better learning experience,
                    fueled by our shared goal of empowering every learner.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

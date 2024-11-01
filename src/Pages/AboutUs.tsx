import Navbar from "@/components/Navbar";
import images from "@/constant/images";

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `URL(${images.aboutusBg})`,
          backgroundSize: "cover",
          backgroundPosition: "0% 40%",
        }}
        className="w-full h-full opacity-80 pt-5 pb-10 px-16"
      >
        <div className="px-6 py-4 rounded-lg bg-white/80 backdrop-blur-lg max-w-2xl mx-auto">
          <h1 className="text-gray-800 text-4xl font-bold text-center">
            Making knowledge accessible and engaging for all.
          </h1>
        </div>
        <div className="relative hidden sm:block sm:w-[400px] md:w-[500px] mx-auto mt-5 md:mt-10">
          <img src={images.cloud} alt="Cloud" className="w-full object-cover" />
          <p className="absolute text-sm md:text-base top-[120px] md:top-[150px] left-1/2 -translate-x-1/2  text-center w-[300px] md:w-[350px] font-semibold tracking-wide">
            High School Prep is an amazing website! I can learn anything from
            anywhere, and it&apos;s so much fun. Tackling tricky questions and
            exploring new subjects feels like an adventure. Studying is
            exciting, and it&apos;s easy to find what I need!
          </p>
          <div className="w-20 h-20 rounded-full bg-red-400 absolute -bottom-2 -left-4 overflow-hidden border-[6px] border-white scale-x-[-1]">
            <img
              src={images.boyImage}
              alt="Boy Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-14 mb-10 ">
          <div className="px-6 py-4 rounded-lg bg-white/80 backdrop-blur-lg max-w-2xl mx-auto">
            <h1 className="text-gray-800 text-4xl font-bold text-center">
              Our mission
            </h1>
          </div>
          <div className="px-6 py-4 rounded-lg bg-white/50 backdrop-blur-lg max-w-2xl mx-auto">
            <p className="text-gray-800 text-lg font-semibold text-center">
              At High School Prep, we are dedicated to enhancing learning for
              everyone. We leverage technology in creative and meaningful ways
              to ignite curiosity, foster creativity, and inspire a love of
              knowledge.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

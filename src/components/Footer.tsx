import MaxWidthWrapper from "./MaxWidthWrapper";
import icons from "@/constant/icons";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useLoginModal } from "../context/index";
import IsUserLogin from "./IsUserLogin";

export default function Footer() {
  // Hooks
  const { openModal } = useLoginModal();
  const { isUser } = IsUserLogin();

  const data = [
    {
      heading: "What we offer",
      links: [
        { name: "Seventh Grade", href: "/grade-by-name/Seventh Grade" },
        { name: "Eighth Grade", href: "/grade-by-name/Eighth Grade" },
        { name: "Ninth Grade", href: "/grade-by-name/Ninth Grade" },
        { name: "Tenth Grade", href: "/grade-by-name/Tenth Grade" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { name: "Math", href: "/grade-by-subject/Math" },
        { name: "Language arts", href: "/grade-by-subject/Language arts" },
        { name: "Science", href: "/grade-by-subject/Science" },
        { name: "Social studies", href: "/grade-by-subject/Social studies" },
        { name: "Algebra 1", href: "/grade-by-subject/Algebra 1" },
        { name: "Biology", href: "/grade-by-subject/Biology" },
        { name: "Geometry", href: "/grade-by-subject/Geometry" },
      ],
    },
    {
      heading: "About",
      links: [
        { name: "About Us", href: "/aboutus" },
        { name: "Contact Us", href: "/contactus" },
        { name: "Careers", href: "/career" },
        { name: "Newsroom", href: "/newsroom" },
      ],
    },
    {
      heading: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Profile", href: "/profile" },
      ],
    },
  ];
  return (
    <>
      <MaxWidthWrapper classNames="border-t border-gray-300 py-4 mt-10 px-5">
        <div className="flex justify-between flex-col md:flex-row gap-10">
          {/* LOGO PART */}
          <div className="w-full md:w-[400px] lg:w-[550px] flex items-center md:items-start flex-col gap-4">
            <Link to={"/"} className="w-fit">
              <img
                src={icons.logo}
                alt="Logo"
                className="w-[100px] object-cover"
              />
            </Link>
            <p className="text-sm text-gray-600 max-md:text-center">
              HIGH SCHOOL PREP provides personalized learning just for you! With
              a full K-12 curriculum, one-on-one support, and real-time progress
              tracking, HIGH SCHOOL PREP meets your unique learning needs to
              help you succeed!
            </p>
            {!isUser && (
              <Button onClick={openModal} className="w-fit">
                Join now
              </Button>
            )}
          </div>
          {/* LINKS PART */}
          <div className="w-full flex flex-wrap justify-between">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col gap-3 mx-4">
                <h3 className="text-darkGreen text-lg font-semibold">
                  {item.heading}
                </h3>
                <div className="flex flex-col gap-1">
                  {item.links.map((link, index) => (
                    <Link
                      key={index}
                      to={link.href}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-400 font-semibold text-center mb-5 mt-8">
          © 2024 HIGH SCHOOL PREP. All rights reserved.
        </p>
      </MaxWidthWrapper>
    </>
  );
}

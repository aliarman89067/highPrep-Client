import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import images from "@/constant/images";
import { Facebook, Mail, Phone, Twitter } from "lucide-react";

export default function ContactUs() {
  const contactData = [
    {
      icon: <Phone className="w-7 h-7" />,
      heading: "Phone Number",
      link: "(123) 456-7890",
    },
    {
      icon: <Mail className="w-7 h-7" />,
      heading: "Email Address",
      link: "info@highschoolprep.com",
    },
    {
      icon: <Facebook className="w-7 h-7" />,
      heading: "Facebook Page",
      link: "https://facebook.com",
    },
    {
      icon: <Twitter className="w-7 h-7" />,
      heading: "Twitter Page",
      link: "https://twitter.com",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="flex flex-col relative mb-10">
        <div
          style={{
            backgroundImage: `URL(${images.contactUs})`,
            backgroundSize: "cover",
          }}
          className="w-full h-[250px] sm:h-[350px] flex justify-center opacity-80"
        >
          <div className="px-6 py-4 rounded-lg bg-white/50 backdrop-blur-lg h-fit mt-10">
            <h3 className="text-4xl font-semibold text-primary">Contact us</h3>
          </div>
        </div>
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center">
          <div className="max-w-3xl grid grid-cols-1 md:grid-cols-2 mx-auto gap-6 my-5">
            {contactData.map((item) => (
              <div className="flex gap-3">
                <div className="w-14 h-14 rounded-full bg-green-300 text-white flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold text-darkGreen">
                    {item.heading}
                  </h3>
                  <a
                    href={item.link}
                    target="_blank"
                    className="underline text-blue"
                  >
                    {item.link}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

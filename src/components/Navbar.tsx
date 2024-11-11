import icons from "@/constant/icons";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "@/constant/links";
import MobileNavbar from "./MobileNavbar";
import { useLoginModal, useUser } from "@/context";
import NavbarDropdown from "./NavbarDropdown";

export default function Navbar() {
  const { pathname } = useLocation();
  const {
    _id: userId,
    name: userName,
    email: userEmail,
    image: userImage,
    isPremium,
  } = useUser();

  const { openModal } = useLoginModal();

  const navigate = useNavigate();

  return (
    <div className="flex border-b border-gray-300 mx-5">
      <MaxWidthWrapper>
        <nav className="flex items-center justify-between w-full py-2">
          <div className="md:w-[260px]">
            <div className="w-[70px]">
              <Link to={"/"} className="w-10">
                <img
                  src={icons.logo}
                  alt="Logo"
                  className="w-[60px] h-[60px] object-contain"
                />
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link key={link.id} to={link.href} className="relative">
                <p className="text-gray-800 font-poppins text-sm lg:text-base">
                  {link.name}
                </p>
                {link.href === pathname && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-darkGreen"></span>
                )}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-end space-x-3 lg:space-x-5 md:w-[260px]">
            {!isPremium && (
              <Button
                onClick={() => navigate("/membership")}
                variant="outline"
                className="hover:bg-darkGreen hover:text-white text-gray-800"
              >
                Membership
              </Button>
            )}
            <div className="flex gap-1 items-center">
              {userId && userEmail ? (
                <NavbarDropdown userImage={userImage} userName={userName} />
              ) : (
                <Button onClick={openModal} className="font-poppins">
                  Login
                </Button>
              )}
              <MobileNavbar pathname={pathname} />
            </div>
          </div>
        </nav>
      </MaxWidthWrapper>
    </div>
  );
}

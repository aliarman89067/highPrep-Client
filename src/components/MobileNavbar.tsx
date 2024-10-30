import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { navLinks } from "@/constant/links";
import { Link } from "react-router-dom";

export default function MobileNavbar({ pathname }: { pathname: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex lg:hidden text-gray-800" variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-3 mt-6">
          {navLinks.map((link) => {
            const isActive = link.href === pathname;
            return (
              <Link
                key={link.id}
                to={link.href}
                className="flex items-center gap-2"
              >
                {isActive && (
                  <span className="w-3 h-3 rounded-full bg-darkGreen"></span>
                )}
                <p
                  className={`text-gray-800 font-poppins text-base ${
                    isActive ? "font-semibold" : "font-normal"
                  } hover:ml-2 transition-all`}
                >
                  {link.name}
                </p>
              </Link>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context";

interface Props {
  userImage: string;
  userName: string;
}

export default function NavbarDropdown({ userImage, userName }: Props) {
  // hooks
  const { setUser } = useUser();

  // Other functions
  const logoutUser = () => {
    setUser({ _id: "", name: "", email: "", image: "" });
    window.location.reload();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer">
          <img
            src={userImage}
            alt={`${userName} Image`}
            className="w-9 h-9 rounded-full flex-grow pointer-events-none object-cover"
          />
          <p className="whitespace-nowrap text-sm text-gray-700 pointer-events-none">
            {userName.substring(0, 4)}...
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutUser}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
import { useUser } from "@/context";

export default function IsUserLogin() {
  const { _id, email, name } = useUser();

  let isUser;
  if (_id && email && name) {
    isUser = true;
  } else {
    isUser = false;
  }

  return { isUser };
}

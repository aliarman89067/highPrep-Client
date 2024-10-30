import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { useLoginModal, useSignupModal, useUser } from "@/context";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Props = {
  setCustomError: Dispatch<SetStateAction<string>>;
  setUser: (values: {
    _id: string;
    name: string;
    email: string;
    image: string;
  }) => void;
  closeLoginModal: () => void;
  closeSignupModal: () => void;
};

export const handleGoogleAuth = async ({
  setCustomError,
  setUser,
  closeLoginModal,
  closeSignupModal,
}: Props) => {
  const auth = getAuth();
  setCustomError("");
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const { displayName, email, photoURL, uid } = result.user;

    const { data } = await axios.post("/create-user-google", {
      name: displayName,
      email,
      image: photoURL,
      uid,
    });
    if (data.success === false) {
      setCustomError("Something went wrong try again");
    } else {
      const { _id, name, email, image } = data.data;
      setUser({ _id, name, email, image });
      closeLoginModal();
      closeSignupModal();
    }
  } catch (error) {
    setCustomError("Something went wrong try again");
    console.log(error);
  }
};

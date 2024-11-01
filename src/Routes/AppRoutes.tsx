import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../Pages/Home";
import Subject from "@/Pages/Subject";
import Unit from "@/Pages/Unit";
// import SubjectTemp from "@/Pages/SubjectTemp";
import { useLoginModal, useSignupModal, useUser } from "@/context";
import { useEffect } from "react";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import MemberShip from "@/Pages/MemberShip";
import axios from "axios";
import PaymentCompleted from "@/Pages/PaymentCompleted";
import PaymentCancelled from "@/Pages/PaymentCancelled";
import Profile from "@/Pages/Profile";

export default function AppRoutes() {
  const { pathname } = useLocation();

  const { isOpen: isLoginOpen } = useLoginModal();
  const { isOpen: isSignupOpen } = useSignupModal();
  const { _id, setUser } = useUser();

  useEffect(() => {
    if (isLoginOpen || isSignupOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isLoginOpen, isSignupOpen]);

  useEffect(() => {
    if (!_id) return;
    axios
      .post("/check-user", { userId: _id })
      .then(({ data }) => {
        if (data.success === false) {
          setUser({ _id: "", email: "", image: "", name: "" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pathname]);

  return (
    <div className="w-full h-full relative">
      {/* Modal Container */}
      <div
        className={`absolute top-0 left-0 w-full min-h-screen h-full bg-black/70 z-50 flex justify-center transition-all duration-300 ${
          isLoginOpen || isSignupOpen
            ? "opacity-100 pointer-events-auto backdrop-blur-sm"
            : "opacity-0 pointer-events-none backdrop-blur-none"
        }`}
      >
        {/* Login Modal */}
        <div
          className={`absolute h-[550px] w-[400px] sm:w-[500px] md:w-[600px] transition-all duration-500 ${
            isLoginOpen ? "delay-300" : "delay-0"
          } bg-gray-200/70 rounded-2xl shadow-lg p-3 ${
            isLoginOpen
              ? "mt-[2%] opacity-100 pointer-events-auto"
              : "mt-[-2%] opacity-0 pointer-events-none"
          }`}
        >
          <div className="border border-gray-400 bg-white rounded-2xl w-full h-full p-2">
            <LoginForm />
          </div>
        </div>

        {/* Register Modal */}
        <div
          className={`absolute h-[550px] w-[400px] sm:w-[500px] md:w-[600px] transition-all duration-500 ${
            isSignupOpen ? "delay-300" : "delay-0"
          } bg-gray-200/70 rounded-2xl shadow-lg p-3 ${
            isSignupOpen
              ? "mt-[2%] opacity-100 pointer-events-auto"
              : "mt-[-2%] opacity-0 pointer-events-none"
          }`}
        >
          <div className="border border-gray-400 bg-white rounded-2xl w-full h-full p-2">
            <SignupForm />
          </div>
        </div>
      </div>
      {/* Register Modal End */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/:gradeName/:subjectName/:subjectId"
          element={<Subject />}
        />
        {/* <Route
          path="/:gradeName/:subjectName/:gradeId"
          element={<SubjectTemp />}
        /> */}
        <Route
          path="/:gradeName/:subjectName/:subjectId/:unitId"
          element={<Unit />}
        />
        <Route path="/membership" element={<MemberShip />} />
        <Route path="/payment-completed" element={<PaymentCompleted />} />
        <Route path="/payment-cancelled" element={<PaymentCancelled />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

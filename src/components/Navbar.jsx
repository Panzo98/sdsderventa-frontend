import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const isLoggedIn = useSelector((state) => state.adminReducer.isLoggedIn);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "ADMIN_LOGOUT" });
  };
  return (
    <div className=" w-full bg-[#06398b] flex items-center justify-between px-4 py-5 lg:px-96 lg:py-4 fixed z-50 top-0">
      <Link
        className=" text-xs lg:text-base text-white font-semibold px-0"
        to="/"
      >
        ЧЛАНОВИ
      </Link>
      <Link
        className=" text-xs lg:text-base text-white font-semibold px-0"
        to="/committe"
      >
        ОДБОРИ
      </Link>
      <img src="logo.png" alt="logo" className="h-6" />
      <Link
        className=" text-xs lg:text-base text-white font-semibold px-0"
        to="/position"
      >
        ПОЗИЦИЈЕ
      </Link>
      {isLoggedIn ? (
        <span
          className=" text-xs lg:text-base text-white font-semibold px-0 cursor-pointer"
          onClick={handleLogout}
        >
          ОДЈАВИ СЕ
        </span>
      ) : // <svg
      //   onClick={handleLogout}
      //   width="64px"
      //   height="64px"
      //   viewBox="-24 -24 72.00 72.00"
      //   fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
      //   stroke="#ffffff"
      //   transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
      //   className="cursor-pointer"
      // >
      //   <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      //   <g
      //     id="SVGRepo_tracerCarrier"
      //     strokeLinecap="round"
      //     strokeLinejoin="round"
      //     stroke="#CCCCCC"
      //     strokeWidth="0.288"
      //   ></g>
      //   <g id="SVGRepo_iconCarrier">
      //     <path
      //       d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
      //       stroke="#ffffff"
      //       strokeWidth="2.4"
      //       strokeLinecap="round"
      //       strokeLinejoin="round"
      //     ></path>
      //   </g>
      // </svg>
      null}
    </div>
  );
}

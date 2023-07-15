import { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowBarUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { FiAlignJustify } from "react-icons/fi";

const NavbarComponent = (props: {
  onOpenSidenav: () => void;
  brandText?: string;
  secondary?: boolean | string;
}) => {
  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <h2>Welcome to Health Check</h2>
      </div>
    </nav>
  );
};

export default NavbarComponent;

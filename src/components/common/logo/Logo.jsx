import React from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

const Logo = ({ width = 40, height = 40, text = "Hint", link = "/" }) => {
  return (
    <Link to={link} className="flex items-center gap-2">
      <img
        src={logo}
        alt="Hint Logo"
        width={width}
        height={height}
        className="object-contain"
        loading="lazy"
      />

      <span className="text-xl font-medium text-hintPrimary">{text}</span>
    </Link>
  );
};

export default Logo;

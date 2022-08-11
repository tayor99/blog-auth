import "../styles/Header.css";
import { BsPerson } from "react-icons/bs";

import { useState } from "react";
import DropDown from "./DropDown";

function Header() {
  const [open, setIsOpen] = useState(false);

  return (
    <div className="header">
      <div className="header__logo">
        <h1>TY's Blog</h1>
      </div>
      <div className="header__nav">
        <BsPerson
          className="header__profile"
          onClick={() => setIsOpen(!open)}
        />
        {open && <DropDown />}
      </div>
    </div>
  );
}

export default Header;

import React, { useContext } from "react";
import { FaMobileAlt, FaTabletAlt, FaLaptop } from "react-icons/fa";

const Header = ({ title, width }) => {
  return (
    <>
      <header className="Header">
        <h1>{title}</h1>
        {width < 768 ? (
          <FaMobileAlt />
        ) : width < 992 ? (
          <FaTabletAlt />
        ) : (
          <FaLaptop />
        )}
      </header>
    </>
  );
};

export default Header;

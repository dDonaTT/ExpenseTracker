import React, { useRef, useState } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import img from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
const Navbar = ({ user: propUser, onLogout }) => {
  const navigate = useNavigate();
  const menuRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const user = propUser || {
    name: "",
    email: "",
  };
  const toggleMenu = () => setOpenMenu((prev) => !prev);
  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}>
        <div
          onClick={() => navigate("/")}
          className={navbarStyles.logoContainer}
        >
          <div className={navbarStyles.logoImage}>
            <img src={img} alt="logo" />
          </div>

          <span className={navbarStyles.logoText}>Expense Tracker</span>
        </div>
        {user && (
          <div className={navbarStyles.userContainer} ref={menuRef}>
            <button onClick={toggleMenu} className={navbarStyles.userButton}>
              <div className="relative">
                <div className={navbarStyles.userAvatar}>
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className={navbarStyles.statusIndicator}></div>
              </div>
              <div className={navbarStyles.userTextContainer}>
                <p className={navbarStyles.userName}>{user?.name || "User"}</p>
                <p className={navbarStyles.userEmail}>
                  {user?.email || "user@expensetracket.com"}
                </p>
              </div>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

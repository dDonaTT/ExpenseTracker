import React, { useEffect, useRef } from 'react'
import { sidebarStyles } from '../assets/dummyStyles'
import {motion} from "framer-motion"
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowDown, ArrowUp, Home, User } from 'lucide-react';
const MENU_ITEMS = [
  { text: "Dashboard", path: "/", icon: <Home size={20} /> },
  { text: "Income", path: "/income", icon: <ArrowUp size={20} /> },
  { text: "Expenses", path: "/expense", icon: <ArrowDown size={20} /> },
  { text: "Profile", path: "/profile", icon: <User size={20} /> },
];
const Sidebar = ({user, isCollapsed, setIsCollapsed}) => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHover,setActiveHover] = useState(null);
  const {name: username = "user", email="username@expensetracker.com"} = user || {};
  const initial = username[0].charAt(0).toUpperCase();
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto" };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);
  return (
    <>
    <motion.div></motion.div>
    </>
  )
}

export default Sidebar
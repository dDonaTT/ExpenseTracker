import React, { useRef } from 'react'
import { sidebarStyles } from '../assets/dummyStyles'
import {motion} from "framer-motion"
import { useLocation, useNavigate } from 'react-router-dom'
const Sidebar = ({user, isCollapsed, setIsCollapsed}) => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHover,setActiveHover] = useState(null);
  const {name: username = "user", email="username@expensetracker.com"} = user || {};
  const initial = username[0].charAt(0).toUpperCase();
  return (
    
  )
}

export default Sidebar
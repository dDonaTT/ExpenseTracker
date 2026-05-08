import React, { useState } from 'react'
import {styles} from "../assets/dummyStyles";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
const Layout = ({onLogout, user}) => {
  const [sidebarColapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className={styles.layout.root}>
        <Navbar onLogout={onLogout} user={user} />
        <Sidebar user={user} isCollapsed={sidebarColapsed} setIsCollapsed={setSidebarCollapsed} />
    </div>
  )
}

export default Layout
import React from 'react'
import {styles} from "../assets/dummyStyles";
import Navbar from './Navbar';
const Layout = ({onLogout, user}) => {
  return (
    <div className={styles.layout.root}>
        <Navbar onLogout={onLogout} user={user} />
    </div>
  )
}

export default Layout
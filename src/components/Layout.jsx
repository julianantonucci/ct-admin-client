import React from "react";
import { Outlet } from 'react-router-dom'
import classes from './Layout.module.scss'
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className={classes.container}>
        <Outlet />
      </div>
    </>
  )
}

export default Layout

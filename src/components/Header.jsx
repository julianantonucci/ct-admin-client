import React, { useEffect, useState } from 'react'

import { BiMenuAltRight } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'

import classes from './Header.module.scss'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  })
  const { token, onLogout } = useAuth()

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    size.width > 768 && menuOpen && setMenuOpen(false)
  }, [size.width, menuOpen])

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p)
  }

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <h1>
          <Link to="/" className={classes.header__content__logo}>
            Camp Tree Admin
          </Link>
        </h1>
        <nav
          className={`${classes.header__content__nav} ${
            menuOpen && size.width < 768 ? classes.isMenu : ''
          }`}
        >
          <ul>
            {token && (
              <>
                <li>
                  <Link to="/" onClick={menuToggleHandler}>
                    home
                  </Link>
                </li>
                <li>
                  <Link to="/camps" onClick={menuToggleHandler}>
                    camps
                  </Link>
                </li>
                <li>
                  <Link to="/users" onClick={menuToggleHandler}>
                    users
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={onLogout}>
                    logout
                  </Link>
                </li>
              </>
            )}
            {!token && (
              <li>
                <Link to="/login" onClick={onLogout}>
                  login
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className={classes.header__content__toggle}>
          {menuOpen ? (
            <AiOutlineClose onClick={menuToggleHandler} />
          ) : (
            <BiMenuAltRight onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

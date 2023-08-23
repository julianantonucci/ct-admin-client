import React from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import classes from './Login.module.scss'
const {REACT_APP_ADMIN_API_PATH, REACT_APP_ADMIN_API_HOST} = process.env

export default function Login() {
  const { setUser, onLogin } = useAuth()
  const [ email, setEmail ] = React.useState('')
  const [ password, setPassword ] = React.useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const url = `${REACT_APP_ADMIN_API_HOST}${REACT_APP_ADMIN_API_PATH}/users/sign-in`
    axios.post(url, {email, password})
      .then(res=>{
        setUser(res.data.user)
        onLogin(res.data.token)
      })
  }

  const handleEmailInput = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordInput = (event) => {
    setPassword(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailInput}
          className={classes.input}
        />
        <p className={classes.hint}>Enter a login.</p>
      </fieldset>
      <fieldset>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordInput}
          value={password}
        />
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  )
}

import { Outlet } from 'react-router-dom'
import classes from './Camps.module.scss'

export default function Camps() {
  return (
      <div className={classes.container}>
        <Outlet />
      </div>
  )
}

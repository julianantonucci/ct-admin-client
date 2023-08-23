import { useLocation, NavLink } from "react-router-dom"
// import classes from './QueryNavLink.module.scss'

function QueryNavLink({to, ...props}){
  let location = useLocation()
  return <NavLink to={to + location.search} {...props} />
}

export { QueryNavLink }

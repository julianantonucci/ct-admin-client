import classes from './Users.module.scss'
import { ENDPOINTS } from '../constants'
import useAdminAPI from '../hooks/useAdminAPI'
import { QueryNavLink } from '../components/QueryNavLink'
import Editable from '../components/Editable'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import {useState} from 'react'

const Users = () => {
  const [
    { data: { roles }, isLoading },
  ] = useAdminAPI(ENDPOINTS.USERS, {
    roles: [],
  })

  // We need the list of camps for the drop down
  const [ { data: { camps } } ] = useAdminAPI(ENDPOINTS.CAMPS, { camps: [] })


  return (
    <main style={{ padding: '1rem 0' }}>
      {isLoading && <div className={classes.loader}>Loading...</div>}

      {!isLoading && <div className={classes.usersTitle}>Camp Tree Users</div>}
      {roles.map((role) => (
        <div className={classes.user} key={role.id}>
          <span className={classes.userName}>
            {role.firstName} {role.lastName}
          </span>
          <span className={classes.userEmail}>
            <a href={`mailto:${role.email}`}>{role.email}</a>
          </span>
          <UserCamps role={role} camps={camps}/>
        </div>
      ))}
    </main>
  )
}

// Users list of camps. Can add or remove roles.
const UserCamps = ({ role: user, camps }) => {
  const { token } = useAuth()
  const [userCamps, setUserCamps] = useState(user.Camps)

  const addCamp = async (e, user) => {
    const url = `${ENDPOINTS.USERS}${user.id}/camp/${e.target.value}`
    const options = { headers: { Authorization: `Bearer ${token}` } }

    await axios.post(url, {}, options)
    setUserCamps([...camps])
  }

  // Removes camp access from user by deleting camp_roles entry
  const removeCamp = async (user, campId) => {
    console.log(user)
    const url = `${ENDPOINTS.USERS}${user.id}/camp/${campId}`
    const options = { headers: { Authorization: `Bearer ${token}` } }

    const response = await axios.delete(url, options)
    if (response?.data?.result === 1) {
      console.log(`succeeded! ${user.id} can no longer access ${campId} `)
      setUserCamps(userCamps.filter((c) => {
        return (c.id !== campId) ? c : false;
      }))
    } else {
      alert('delete failed: ' + response.error)
      console.log(response)
    }
  }

  const availableCamps = (role) => {
    const currentCamps = role.Camps.map((c) => ({ id: c.id, name: c.name }))
    return camps
      .filter((c) => {
        return !currentCamps.find((el) => el.id === c.id)
      })
      .map((el) => ({ id: el.id, name: el.name }))
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
  }

  return (
    <div className={classes.camps}>
      <span className={classes.campsTitle}>Camps:</span>
      {userCamps.map((c) => (
        <div className={classes.camp} key={c.id}>
          <QueryNavLink to={`/camps/${c.id}`}>{c.name}</QueryNavLink>
          <span className={classes.camps__remove} 
                onClick={ () => { removeCamp(user, c.id) }}>remove</span>
        </div>
      ))}
      <div className={classes.camps__add}>
        <Editable text="add camp" className={classes.camps_add}>
          <select
            value="--"
            onChange={(e) => {
              addCamp(e, user)
            }}
          >
            <option value="--" key="--">
              --
            </option>
            {availableCamps(user).map((c) => (
              <option value={c.id} key={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Editable>
      </div>
    </div>
  )
}

export default Users

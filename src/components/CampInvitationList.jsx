import React, { useEffect, useState } from 'react'
import CampInvitationDetail from '../components/CampInvitationDetail'
import axios from 'axios'
import classes from './CampInvitationList.module.scss'
import { useAuth } from '../contexts/AuthContext'
import useAdminAPI from '../hooks/useAdminAPI'
import { CAMP_INVITATION_STATUS, ENDPOINTS } from '../constants'

/**
 * Render data from: "admin/camps/invitations". 
 * [{
* 		"id": "WZQDN1U3",
* 		"email": "juliet@camptonawandah.com",
* 		"firstName": "Juliet",
* 		"lastName": "Taft",
* 		"phone": "(800) 322-0178",
* 		"campCount": 3,
* 		"status": "INVITED",
* 		"campName": "Camp Ton-A-Wondah",
* 		"expires": "2023-02-27T18:55:22.966Z",
* 		"created_at": "2023-02-20T18:55:22.966Z",
* 		"updated_at": "2023-02-20T18:55:22.966Z"
* }, ... ]
 */
const CampInvitationList = () => {
  const [invitations, setInvitations] = useState(null)
  const [{ data }] = useAdminAPI(ENDPOINTS.CAMP_INVITATIONS, {
    invitations: [],
  })
  const { token } = useAuth()

  useEffect(() => {
    setInvitations(data.invitations)
  }, [data]) // eslint-disable-line

  const expired = (invite) => {
    return Date.now() > new Date(invite.expires).getTime()
  }

  const deleteExpiredInvitations = async (e) => {
    e.preventDefault()
    const options = { headers: { Authorization: `Bearer ${token}` } }
    const url = `${ENDPOINTS.CAMPS}invitations/expired`
    const response = await axios.delete(url, options)
    setInvitations(response.data.invitations)
  }

  const deleteInvitation = async (e, invite) => {
    e.preventDefault()
    const url = `${ENDPOINTS.CAMPS}invitations/${invite.id}`
    const options = { headers: { Authorization: `Bearer ${token}` } }
    const response = await axios.delete(url, options)
    setInvitations(response.data.invitations)
  }

  return (
    <>
      <p className={classes.invitations__delete}>
        <span onClick={deleteExpiredInvitations}>
          Delete All Expired Invitations!
        </span>
      </p>
      {invitations &&
        invitations
          .filter(
            (invitation) =>
              invitation.status !== CAMP_INVITATION_STATUS.COMPLETE
          )
          .map((invite) => (
              <CampInvitationDetail
              invite={invite}
              token={token} 
              key={invite.id}
              setInvitations={setInvitations}/>
          ))}
    </>
  )
}

export default CampInvitationList

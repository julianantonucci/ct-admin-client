import React from 'react'
import axios from 'axios'
import { ENDPOINTS } from '../constants'
import classes from './CampInvitationDetail.module.scss'

const CampInvitationDetail = ({ invite, token, setInvitations }) => {

  const expired = (invite) => {
    return Date.now() > new Date(invite.expires).getTime()
  }

  const deleteInvitation = async (e, invite) => {
    e.preventDefault()
    const url = `${ENDPOINTS.CAMPS}invitations/${invite.id}`
    const options = { headers: { Authorization: `Bearer ${token}` } }
    const response = await axios.delete(url, options)
    setInvitations(response.data.invitations)
  }

  return (
    <p className={[classes.invite]}>
      <span className={classes.invite__title}>
        {invite.campName}
        {expired(invite) && (
          <span className={[expired(invite) && classes.invite_expired]}>
            {' '}
            - Expired
          </span>
        )}
      </span>
      <span className={classes.invite_detail}>
        {invite.firstName} {invite.lastName}
      </span>
      <span className={classes.invite_detail}>
          { 
            window.location.hostname === 'localhost' ?
              <a href={`http://localhost:3000/sign-up/${invite.id}`}>invite link</a>
              : <a href={`https://${window.location.hostname}/sign-up/${invite.id}`}>invite link</a>
          } 
      </span>
      <span className={classes.invite_detail}>
        <a href={`mailto:${invite.email}?subject=Camp Tree Invitation Status`}>{invite.email}</a>&nbsp; 
        <a href={`tel:+${invite.phone}`}>{invite.phone}</a>
      </span>
      <span className={classes.invite_detail}>
        Sent: {new Date(invite.created_at).toLocaleDateString()} {' - '}
        {new Date(invite.created_at).toLocaleTimeString()}
      </span>
      <span className={classes.invite_detail}>
        Expires: {new Date(invite.expires).toLocaleDateString()} {' - '}
        {new Date(invite.expires).toLocaleTimeString()}
      </span>
      <span className={classes.invite__delete}>
        <span
          onClick={(e) => {
            deleteInvitation(e, invite)
          }}
        >
          delete
        </span>
      </span>
    </p>
  )
}


export default CampInvitationDetail

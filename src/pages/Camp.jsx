import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import ConstantSelect from '../components/ConstantSelect'
import Editable from '../components/Editable'
import CampPerformance from '../components/CampPerformance'
import { CAMP_STATUS, ENDPOINTS } from '../constants'
import {useAuth} from '../contexts/AuthContext'
import useAdminAPI from '../hooks/useAdminAPI'
import classes from './Camp.module.scss'

export default function Camp() {
  const { token } = useAuth()
  const params = useParams()
  const [dirty, setDirty] = useState(false)
  const [camp, setCamp] = useState(null)
  const [ { data }, doFetch] = useAdminAPI(`${ENDPOINTS.CAMPS}${params.campId}`, {})

  // refs for editable components to handle focus
  const emailRef = useRef()
  const phoneRef = useRef()

  useEffect(() => {
    setCamp(data.camp)
    setDirty(false)
  }, [data]) // eslint-disable-line

  useEffect(() => {
    params.campId && doFetch(`${ENDPOINTS.CAMPS}${params.campId}`)
    setCamp(data.camp)
  }, [params.campId]) // eslint-disable-line

  const handleSubmit = async (e) => {
    e.preventDefault()
    const obj = {
      status: camp.status,
      email: camp.email,
      phone: camp.phone
    }
    const url = `${ENDPOINTS.CAMPS}${camp.id}`
    const response = await axios.put(url, obj, {headers: {Authorization: `Bearer ${token}`}})
    setCamp(response.data.camp)
    setDirty(false)
  }

  const setCampStatus = (e) => {
    if (camp.status !== e.target.value) {
      console.log(`new camp status '${e.target.value}'`)
      setCamp({...camp, status: e.target.value})
      setDirty(true)
    }
  }

  const setCampEmail = (e) => {
    if (camp.status !== e.target.value) {
      console.log(`new camp email '${e.target.value}'`)
      setCamp({...camp, email: e.target.value})
      setDirty(true)
    }
  }

  const setCampPhone = (e) => {
    if (camp.status !== e.target.value) {
      console.log(`new camp phone '${e.target.value}'`)
      setCamp({...camp, phone: e.target.value})
      setDirty(true)
    }
  }
  return (
    <main style={{ padding: '1rem' }}>
      {camp && (
        <>
          <h2 className={classes.heading}>{camp.name}</h2>
          <form onSubmit={handleSubmit}>
            <p>{camp.mission}</p>
            <div className={classes.details}>
                <p>
                  {camp.userCount} users, &nbsp;
                  {camp.peopleCount} people, &nbsp;
                  {camp.campaignCount} campaigns,&nbsp;
                  {camp.referralCount} inquiries and referrals &nbsp;
                </p>

                <Editable text={camp.status} type="input" className={classes.camp_status}>
                  <ConstantSelect value={camp.status} options={CAMP_STATUS} onChange={setCampStatus} />
                </Editable>
                <Editable text={camp.email} childRef={emailRef} className={classes.camp_status}>
                  <input type="email" value={camp.email} ref={emailRef} onChange={setCampEmail}/>
                </Editable>
                <Editable text={camp.phone} childRef={phoneRef} className={classes.camp_status}>
                  <input type="tel" value={camp.phone} ref={phoneRef} onChange={setCampPhone}/>
                </Editable>
            </div>
            {dirty && (
              <button className={classes.save_button}>Save Changes</button>
            )}
          </form>
          <CampPerformance campId={camp.id} />
          <div>
            <h3 className={classes.subheading}>Campaigns</h3>
            {camp.Campaigns.map((campaign) => (
              <p key={campaign.id}>
                <NavLink to={`campaigns/${campaign.id}`}>
                  <span className={classes.important}>{campaign.name}</span>
                </NavLink>
                <span className={classes.detail}>{campaign.status}</span>
                <span className={classes.detail}>
                  {campaign.startDate} &rarr; {campaign.endDate}
                </span>
              </p>
            ))}
          </div>
        </>
      )}
    </main>
  )
}

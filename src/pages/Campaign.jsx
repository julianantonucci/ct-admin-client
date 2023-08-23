import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Editable from '../components/Editable'
import ConstantSelect from '../components/ConstantSelect'
import TemplateList from '../components/TemplateList'
import SendgridPerformance from '../components/SendgridPerformance'
import { CAMPAIGN_STATUS, CAMPAIGN_TYPES, ENDPOINTS } from '../constants'
import { useAuth } from '../contexts/AuthContext'
import useAdminAPI from '../hooks/useAdminAPI'
import classes from './Campaign.module.scss'

export default function Campaign() {
  const { token } = useAuth()
  const params = useParams()
  const [endPoint] = useState(
    `${ENDPOINTS.CAMPS}${params.campId}/campaigns/${params.campaignId}`
  )
  const [campaign, setCampaign] = useState(null)
  const [dirty, setDirty] = useState(false)
  const [{ data }] = useAdminAPI(`${endPoint}`, {})

  // refs for Editable components to handle focus
  const publicLinkViewsRef = useRef()

  const changeCampaignStatus = (e) => {
    if (campaign.status !== e.target.value) {
      setDirty(true)
      setCampaign({ ...campaign, status: e.target.value })
    }
  }

  const setTestMode = (e) => {
    if (campaign.testMode !== e.target.checked) {
      setDirty(true)
      setCampaign({ ...campaign, testMode: e.target.checked})
    } 
  }

  const changeCampaignType = (e) => {
    if (campaign.type !== e.target.value) {
      setDirty(true)
      setCampaign({ ...campaign, type: e.target.value })
    }
  }

  const setPublicLinkViews = (e) => {
    if (campaign.publicLinkViews !== e.target.value) {
      setDirty(true)
      setCampaign({ ...campaign, publicLinkViews: e.target.value })
    }
  }

  const setEndDate = (e) => {
    if (campaign.endDate !== e.target.value) {
      setDirty(true)
      setCampaign({ ...campaign, endDate: e.target.value })
    }
  }

  const setStartDate = (e) => {
    if (campaign.startDate !== e.target.value) {
      setDirty(true)
      setCampaign({ ...campaign, startDate: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const obj = {
      status: campaign.status,
      type: campaign.type,
      publicLinkViews: campaign.publicLinkViews,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      testMode: campaign.testMode,
    }
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    }
    const url = `${ENDPOINTS.CAMPS}${campaign.campId}/campaigns/${campaign.id}`
    const response = await axios.put(url, obj, options)
    setCampaign(response.data.campaign)
    setDirty(false)
  }

  useEffect(() => {
    setCampaign(data.campaign)
  }, [data]) // eslint-disable-line

  return (
    <main>
      {campaign && (
        <form onSubmit={handleSubmit}>
          <h2 className={classes.heading}>{campaign.name}</h2>

          <div className={classes.details}>
            <span className={classes.detail_label}>Type:</span>
            <Editable text={campaign.type} dirty={dirty ? 1 : 0} className={classes.detail_value} >
              <ConstantSelect value={campaign.type} options={CAMPAIGN_TYPES} onChange={changeCampaignType} />
            </Editable>
          </div>

          <div className={classes.details}>
            <span className={classes.detail_label}>Goal:</span>
            {campaign.goal}
          </div>

          <div className={classes.details}>
            <span className={classes.detail_label}>Start Date:</span>
            <Editable dirty={dirty ? 1 : 0} text={campaign.startDate} className={classes.detail_value}>
              <input type="date" value={campaign.startDate} onChange={setStartDate} />
            </Editable>

            <span className={classes.detail_label}> End Date:</span>
            <Editable dirty={dirty ? 1 : 0} text={campaign.endDate} className={classes.detail_value}> 
              <input type="date" value={campaign.endDate} onChange={setEndDate} /> 
            </Editable>
          </div>
          <div className={classes.details}>
            <span className={classes.detail_label}>Status:</span>
            <Editable
              text={campaign.status}
              dirty={dirty ? 1 : 0}
              className={classes.detail_value}
            >
              <ConstantSelect value={campaign.status} options={CAMPAIGN_STATUS} onChange={changeCampaignStatus} />
            </Editable>
          </div>
          <div className={classes.details}>
            <span className={classes.detail_label}>Test Mode:</span>
            <Editable
              text={campaign.testMode ? 'true' : 'false'}
              dirty={dirty ? 1 : 0}
              className={classes.detail_value} >
              <input 
                type="checkbox" 
                checked={campaign.testMode} 
                onChange={setTestMode} />
            </Editable>
          </div>
          <div className={classes.details}>
            <span className={classes.detail_label}>Public Link Views:</span>
            <Editable
              dirty={dirty ? 1 : 0}
              text={campaign.publicLinkViews}
              type="input"
              className={classes.detail_value}
              childRef={publicLinkViewsRef}
            >
              <input
                ref={publicLinkViewsRef}
                type="number"
                value={campaign.publicLinkViews}
                onChange={setPublicLinkViews}
              />
            </Editable>
          </div>
          {dirty && (
            <button className={classes.save_button}>Save Changes</button>
          )}
        </form>
      )}
      {campaign && (
        <SendgridPerformance 
          className={classes.email_table}
          data={campaign.sendgridPerformance} 
          caption="Campaign Email Performance" />
      )}
      <TemplateList />
    </main>
  )
}

import useAdminAPI from '../hooks/useAdminAPI'
import { ENDPOINTS } from '../constants'
import { QueryNavLink } from '../components/QueryNavLink'
import classes from './CampsWithCampaignDetails.module.scss'
import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'

/**
 * Render the following data from: "admin/camps/with_details": [
 *      {
 *         "name": "Camp Tree Master Camp",
 *         "campaigns": [
 *            {
 *               "id": "f936dabc-8f62-44e1-a493-75cf9fbd435d",
 *               "name": "Counselor Campaign",
 *               "ambassador_count": "0",
 *               "referral_count": "0"
 *            }, ...
 *       }, ...
 *   ]
 */
function CampsWithCampaignDetails() {
  const [{ data }] = useAdminAPI(ENDPOINTS.CAMPS_AND_CAMPAIGNS, {camps: []})

  const [visibleCampaigns, setVisibleCampaigns] = useState({})

  useEffect(() => {
    let myVisibleCampaigns = data.camps.reduce((acc, curr) => ({ ...acc, [curr.id]: true }), {})
    setVisibleCampaigns(myVisibleCampaigns)
  }, [data.camps])

  const toggleCamapignVisibility = (campId) => {
    setVisibleCampaigns({
      ...visibleCampaigns,
      [campId]: !visibleCampaigns[campId],
    })
  }

  return (
    <table className={classes.table}>
      <thead className={classes.table__head}>
        <tr>
          <th>Camp</th>
          <th>Campaign</th>
          <th>Ambassadors</th>
          <th>Referrals</th>
        </tr>
      </thead>
      <tbody>
        {data.camps.map((camp) => (
          <React.Fragment key={camp.id}>
            <tr className={classes.camp_row}>
              <td colSpan="4">
                <QueryNavLink to={`/camps/${camp.id}`}>
                  {camp.name}
                </QueryNavLink>
                <span 
                  className={classes.camp_row__toggle}
                  onClick={() => toggleCamapignVisibility(camp.id)}>
                    {visibleCampaigns[camp.id] ? '-' : '+'}
                </span>
              </td>
            </tr>
          { visibleCampaigns[camp.id] && camp.campaigns.map((campaign) => (
              <tr key={`${campaign.id}-campaigns`}>
                <td></td>
                <td>
                  <QueryNavLink to={`/camps/${camp.id}/campaigns/${campaign.id}`}>
                    <span className={classes.important}>{campaign.name}</span>
                  </QueryNavLink>
                  </td>
                <td className={classes.td_number}>{campaign.ambassadorCount}</td>
                <td className={classes.td_number}>{campaign.referralCount}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default CampsWithCampaignDetails

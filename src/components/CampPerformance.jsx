/// Pulls data from  ENPOINTS.CAMPS/:id/performance and renders two tables
import React, { useEffect, useState } from 'react'
import useAdminAPI from '../hooks/useAdminAPI'
import { ENDPOINTS } from '../constants'
import SendgridPerformance from '../components/SendgridPerformance'
import AmbassadorPerformance from '../components/AmbassadorPerformance'

/** 
 * Render from admin/camps/:id/performance
 *     {
       "peopleCount": 55,
       "usersCount": 5,
       "camaignsCount": 4,
       "referralCount": "20",
        "sendgridPerformance": [
            {
              "message_type": "ambassador-invitation",
              "sent": "76",
              "delivered": "72",
              "opened": "463",
              "clicked": "40"
            },
            {
              "message_type": "ambassador-email-confirmation",
              "sent": "9",
              "delivered": "9",
              "opened": "12",
              "clicked": "0"
            },
          ]
        },
       "ambassadorPerformance": [
          {
             "amb_invited": "0",
             "amb_joined": "5",
             "amb_enrolled": "0",
             "inquiry_ref": "0",
             "registration_ref": "0"
          },
          {
             "amb_invited": "5",
             "amb_joined": "2",
             "amb_enrolled": "2",
             "inquiry_ref": "5",
             "registration_ref": "10"
          }
       ]
    }
*/

const CampPerformance = ({ campId }) => {
  const [performance, setPerformance] = useState({
    sendgridPerformance: [],
    ambassadorPerformance: [],
  })
  const [{ data }] = useAdminAPI(`${ENDPOINTS.CAMPS}${campId}/performance`, performance)

  useEffect(() => {
    setPerformance(data)
  }, [data])

  return (
    <>
      <SendgridPerformance
        data={performance.sendgridPerformance}
        caption="Camp Email Performance"
      />
      <br />
      <AmbassadorPerformance
        data={performance.ambassadorPerformance}
        caption="Camp Ambassador Performance"
      />
    </>
  )
}

export default CampPerformance

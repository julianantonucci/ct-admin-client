import classes from './Home.module.scss'
import CampInvitation from '../components/CampInvitationForm'
import CampInvitationList from '../components/CampInvitationList'
import CampsWithCampaignDetails from '../components/CampsWithCampaignDetails'
import ShowHide from '../components/ShowHide'

export default function Home() {
  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <ShowHide title="Invite a Camp" visible={true} className={classes.section}>
          <CampInvitation />
        </ShowHide>
        <ShowHide title="Camps and Campaigns" visible={false} className={classes.section}>
          <CampsWithCampaignDetails />
        </ShowHide>
        <ShowHide title="Camp Invitations" visible={false} className={classes.section}>
          <CampInvitationList />
        </ShowHide>
      </div>
    </div>
  )
}

import App from './App'
import { ProtectedRoute } from './contexts/AuthContext'
import Camp from './pages/Camp'
import Campaign from './pages/Campaign'
import Camps from './pages/Camps'
import Home from './pages/Home'
import Login from './pages/Login'
import Users from './pages/Users'
import NotFound from './pages/NotFound'
import CampsWithCampaignDetails from './components/CampsWithCampaignDetails'

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: 'login', element: <Login /> },
      {
        path: 'users',
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: 'camps',
        element: (
          <ProtectedRoute>
            <Camps />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <CampsWithCampaignDetails/>
            ),
          },
          {
            path: ':campId/campaigns/:campaignId',
            element: <Campaign />,
          },
          {
            path: ':campId',
            element: <Camp />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

export default routes

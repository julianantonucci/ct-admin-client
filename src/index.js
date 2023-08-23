import React from 'react'
import ReactDOM from 'react-dom'
import './styles/global.scss'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import routes from './routes.jsx'
const { REACT_APP_BASENAME } = process.env

function MyRoutes() {
  return useRoutes(routes)
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={REACT_APP_BASENAME || '/admin'}>
      <AuthProvider>
        <MyRoutes />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

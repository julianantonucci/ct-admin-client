import React from 'react'
import { useLocation } from 'react-router-dom'

export default function NotFound() {
  let location = useLocation()

  return (
      <main style={{ padding: '1rem' }}>
        <p>There is nothing at this location: {location.pathname}</p>
      </main>
  )
}

import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { QueryNavLink } from '../components/QueryNavLink'
import useAdminAPI from '../hooks/useAdminAPI'
import { ENDPOINTS } from '../constants'

const CampList = () => {
  // only updae camp list on load
  const [{ data }] = useAdminAPI(ENDPOINTS.CAMPS, { camps: [] })
  let [searchParams, setSearchParams] = useSearchParams()

  return (
    <nav>
      <h2>Camps</h2>
      <input
        value={searchParams.get('filter') || ''}
        placeholder="type to filter camps"
        onChange={(event) => {
          let filter = event.target.value
          if (filter) {
            setSearchParams({ filter })
          } else {
            setSearchParams({})
          }
        }}
      />
      {data.camps
        .filter((camp) => {
          let filter = searchParams.get('filter')
          if (!filter) return true
          let name = camp.name.toLowerCase()
          return name.startsWith(filter.toLowerCase())
        })
        .map((camp) => (
          <QueryNavLink
            style={({ isActive }) => {
              return {
                display: 'block',
                margin: '1rem 0',
                color: isActive ? 'red' : '',
              }
            }}
            to={`/camps/${camp.id}`}
            key={camp.id}
          >
            {camp.name}
          </QueryNavLink>
        ))}
    </nav>
  )
}

export default CampList

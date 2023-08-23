import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const useAdminAPI = (apiUrl, initialData) => {
  const { token, onLogout } = useAuth()
  const [data, setData] = useState(initialData)
  const [url, setUrl] = useState(apiUrl)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return
      setIsError(false)
      setIsLoading(true)
      let result = null
      try {
        result = await axios(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setData(result.data)
      } catch (error) {
        console.error(error)
        if (error.response && error.response.status === 401) {
          onLogout()
        }
        setIsError(error)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [url, token]) // eslint-disable-line
  return [{ data, setData, isLoading, isError }, setUrl]
}

export default useAdminAPI

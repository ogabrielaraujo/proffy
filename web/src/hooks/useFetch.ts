import useSWR from 'swr'
import api from 'services/api'

export default function useFetch(url: string, params?: any) {
  const { data, error } = useSWR(
    url,
    async (url: string) => {
      const response = await api.get(url, params)

      return response.data
    },
    {
      revalidateOnReconnect: true,
      refreshWhenOffline: true,
      errorRetryCount: 2,
      revalidateOnFocus: true,
    }
  )

  return { data, error, isLoading: !error && !data }
}

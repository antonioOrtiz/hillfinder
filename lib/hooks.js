import useSWR from 'swr';

import axios from 'axios'

export const fetcher = (url) => axios.get(url).then(response => response.data.user).catch(err => {
  if (err.response) {
    const error = new Error('An error occurred while fetching the data.')
    // error.info = await res.json()
    error.status = err.response.status;
    error.data = err.response;
    console.log(`err.response!`, err.response)
    throw error
  }
  return res.json()
})

export function useUser() {
  const { data: user, error, mutate } = useSWR('/api/user', fetcher)
  // if data is not defined, the query has not completed
  const loading = !user
  return {
    user,
    isLoading: loading === undefined ? 'Loading...' : null,
    error,
    mutate
  }
}

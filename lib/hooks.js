import useSWR from 'swr';

import { useCallback, useState, } from 'react';
import axios from 'axios'



async function getUser(url) {
  try {
    const res = await axios.get(url);
    return res;
  } catch (err) {
    if (err.response) {
      const error = await new Error('An error occurred while fetching the data.')
      // error.info = await res.json()
      error.statusText = err.response.statusText;
      error.data = err.response.data.user;
      throw error
    }
  }
}

export const fetcher = (url) => getUser(url)

export function useUser(shouldFetch) {
  const { data: user, error, mutate } = useSWR(() => shouldFetch ? '/api/user' : null, fetcher, {
    revalidateOnMount: false,
  })
  return {
    user: user?.data?.user,
    isLoading: shouldFetch && !error && !user,
    mutate,
    isError: error?.statusText
  }
}

export function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState((previousState) => !previousState), [])

  return [state, toggle]
}




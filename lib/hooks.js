import useSWR from 'swr';

import axios from 'axios'

async function getUser(url) {
  try {
    const res = await axios.get(url);
    return res;
  } catch (err) {
    console.log("err ", err);
    if (err.response) {
      const error = await new Error('An error occurred while fetching the data.')
      // error.info = await res.json()
      error.statusText = err.response.statusText;
      error.data = err.response.data.user;
      throw error
    }

    console.log("res.json() ", res.json());
    return await res.json()
  }
}



export const fetcher = (url) => getUser(url)

export function useUser() {
  const { data: user, error, mutate } = useSWR('/api/user', fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    // revalidateOnReconnect: false, // personally, I didn't need this one
  })

  console.log("error?.statusText ", error?.statusText);
  console.log("user ", user?.data?.user);
  return {
    user: user?.data?.user,
    isLoading: !error && !user,
    mutate,
    isError: error?.statusText
  }
}




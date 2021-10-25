import useSWR from 'swr'

export const fetcher = (url) => fetch(url).then((r) => r.json())

export function useUser() {
  const { data, mutate } = useSWR('/api/user', fetcher)
  // if data is not defined, the query has not completed

  console.log("data in useUser hooks!", data);

  console.log("data?.user ", data?.user);
  const loading = !data
  const user = data?.user
  return [user, { mutate, loading }]
}

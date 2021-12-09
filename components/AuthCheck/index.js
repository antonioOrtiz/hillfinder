import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from '../../lib/hooks'
import { PageLoader } from '../../components/Loader'


export const AuthCheck = ({ children }) => {
  const router = useRouter()
  const { user, isLoading, isError } = useUser()

  useEffect(() => {
    if (typeof window !== 'undefined' && isError === 'Unauthorized') router.push('/');
  }, [isError])

  if (isLoading) return <PageLoader />

  if (user) {
    return children
  }
  return null

}


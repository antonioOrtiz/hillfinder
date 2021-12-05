import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from '../../lib/hooks'
import { PageLoader } from '../../components/Loader'


export const AuthCheck = ({ children }) => {
  const router = useRouter()
  const { user, mutate, isError } = useUser()

  useEffect(() => {
    if (typeof window !== 'undefined' && isError === 'Unauthorized') router.push('/');
  }, [isError])

  if (!user) return <PageLoader />// a loading component that prevents the page from rendering

  if (user) {
    return children
  }
}


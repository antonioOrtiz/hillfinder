import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from '../../lib/hooks'
import { PageLoader } from '../../components/Loader'


export const AuthCheck = ({ children }) => {
  const [Component, setComponent] = useState(null);
  const router = useRouter();
  const { isLoading, isError } = useUser()

  useEffect(() => {
    if (typeof window !== 'undefined' && isError === 'Unauthorized') router.push('/');
    else setComponent(children)
  }, [isError])

  if (isLoading) return <PageLoader />

  return Component

}


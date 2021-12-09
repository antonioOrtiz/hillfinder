import { useRouter } from "next/router";
import { useUser } from '../../lib/hooks'
import { PageLoader } from '../../components/Loader'


export const AuthCheck = ({ children }) => {
  const router = useRouter()
  const { user, isLoading } = useUser();

  console.log("user 12 ", user);


  if (isLoading) return <PageLoader />// a loading component that prevents the page from rendering

  if (user === undefined) {
    router.push('/');
    return <PageLoader />
  } else if (user.isVerified) {
    return children
  }
}


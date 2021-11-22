import Router, { useRouter } from 'next/router'

import { useUser } from '../../lib/hooks'
import dynamic from "next/dynamic";

const Layout = dynamic(() => import('../Layout'));


export const AuthCheck = ({ children }) => {
  const { route, router } = useRouter();

  function Loading() {
    return (
      <Layout>
        <div className="w-full h-full fixed block top-0 left-0 z-50">
          <span
            className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0"
          >
            <i className="fas fa-circle-notch fa-spin fa-5x" />
          </span>
        </div>
      </Layout>)
  }
  const { user } = useUser();

  if (user === undefined) {
    router && Router.push('/')
  }


  if (!user) return <Loading />

  return children
}

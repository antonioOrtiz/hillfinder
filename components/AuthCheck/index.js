import Router from 'next/router'

import { useUser } from '../../lib/hooks'
import dynamic from "next/dynamic";

const Layout = dynamic(() => import('../Layout'));

export const AuthCheck = ({ children }) => {
  function Loading() {
    return (
      <Layout>
        <span>
          <i className="fas fa-circle-notch fa-spin fa-5x" />
        </span >
      </Layout>)
  }
  const { user } = useUser();

  console.log("Router ", Router);

  if (typeof window !== 'undefined' && user === undefined) {
    Router.push('/')
  }

  if (!user) return <Loading />

  return children
}

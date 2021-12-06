import dynamic from "next/dynamic";

import { useRouter } from 'next/router'
import Link from 'next/link';

const Layout = dynamic(() => import('../components/Layout'), { ssr: false });

export default function FourOhFour() {
  const router = useRouter()
  return (
    <Layout>
      <h1>
        404 - Page Not Found;
      </h1>
      <h2 className="primary-content" style={{ fontWeight: 'strong' }}>Sorry but the page{' '}
        {router.pathname.substring(1)} could not be found</h2>{' '}
      <Link href="/">
        <a>Home</a>
      </Link>
    </Layout>
  )

}

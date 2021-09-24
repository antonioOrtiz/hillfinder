import { useRouter } from 'next/router'
import Link from 'next/link';

export default function FourOhFour() {
  const router = useRouter()
  return (
    <>
      <h1>
        404 - Page Not Found;
      </h1>
      <h2 style={{ fontWeight: 'strong' }}>Sorry but the page{' '}
        {router.pathname.substring(1)} could not be found</h2>{' '}
      <Link href="/">
        <a>Home</a>
      </Link>
    </>
  )

}

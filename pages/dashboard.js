import dynamic from "next/dynamic";

import { PageLoader } from 'components/Loader/index'

const Map = dynamic(() => import('components/Map/index'), { loading: () => <PageLoader />, ssr: false });

export default function Dashboard() {
  return (
    <>
      <Map />
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      auth: true
    },
  }
}

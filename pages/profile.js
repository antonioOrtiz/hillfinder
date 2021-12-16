import ProfilePage from '../components/Profile/index'

export default function Profile() {
  return (
    <>
      <ProfilePage />
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







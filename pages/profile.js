export default function Profile() {
  return (
    <>
      <h1>Profile</h1>
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







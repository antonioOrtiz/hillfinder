export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
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

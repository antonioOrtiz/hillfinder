import dynamic from "next/dynamic";

const Form = dynamic(() => import('../components/Forms'));

export default function Profile() {
  return (
    <>
      <Form formType="Profile" />
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      auth: true
    },
  }
}







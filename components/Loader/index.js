import dynamic from "next/dynamic";

const Layout = dynamic(() => import('../Layout'), { ssr: false });


export const Loader = () => (
  <div className=" flex justify-center items-center">
    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32" />
  </div>
)

export const PageLoader = () => (
  <Layout>
    <div className=" loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32" />
  </Layout>

)

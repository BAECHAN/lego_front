import Layout from "../components/Layout";

export default function About(){
  return (
    <div>
      <h2>About</h2>
    </div>
  )
}

About.getLayout = function getLayout(page: React.ReactElement){
  return(
    <Layout>{page}</Layout>
  )
}
import Layout from "../components/Layout";

export default function Shop(){
  return (
    <div>
      <h2>Shop</h2>
    </div>
  )
}

Shop.getLayout = function getLayout(page: React.ReactElement){
  return(
    <Layout>{page}</Layout>
  )
}
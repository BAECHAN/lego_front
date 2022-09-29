import Layout from '../components/Layout'
export default function Home() {
  return (
    <div>
      <h2>Lego</h2>
    </div>
  )
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

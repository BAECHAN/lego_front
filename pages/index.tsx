import Layout from '../components/Layout'
export default function Home() {
  return (
    <div className="min-h-[602px]">
      <h2>Lego</h2>
    </div>
  )
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

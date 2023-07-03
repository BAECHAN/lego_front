import Layout from '@components/Layout'
import ContentsDelivery from '@components/mypage/ContentsDelivery'

export default function Delivery() {
  return <ContentsDelivery />
}
Delivery.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

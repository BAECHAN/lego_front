import Layout from '@components/Layout'
import ContentsOrderHistory from '@components/mypage/ContentsOrderHistory'

export default function OrderHistory() {
  return <ContentsOrderHistory />
}
OrderHistory.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

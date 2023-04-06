import Layout from '@components/Layout'
import ContentsViewedProducts from '@components/mypage/ContentsViewedProducts'

export default function ViewedProducts() {
  return <ContentsViewedProducts />
}
ViewedProducts.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

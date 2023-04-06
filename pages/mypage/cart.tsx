import Layout from '@components/Layout'
import ContentsCart from '@components/mypage/ContentsCart'

export default function Cart() {
  return <ContentsCart />
}
Cart.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

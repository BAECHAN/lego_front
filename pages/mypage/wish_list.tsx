import Layout from '@components/Layout'
import ContentsWishList from '@components/mypage/ContentsWishList'

export default function WishList() {
  return <ContentsWishList />
}
WishList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

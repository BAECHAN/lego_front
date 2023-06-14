import LayoutMobile from '@components/LayoutMobile'
import ContentsWishList from '@components/mypage/ContentsWishList'

export default function WishList() {
  return <ContentsWishList />
}
WishList.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutMobile>{page}</LayoutMobile>
}

import LayoutMobile from '@components/LayoutMobile'
import ContentsViewedProducts from '@components/mypage/ContentsViewedProducts'

export default function ViewedProducts() {
  return <ContentsViewedProducts />
}
ViewedProducts.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutMobile>{page}</LayoutMobile>
}

import LayoutMobile from '@components/LayoutMobile'
import ContentsCart from '@components/mypage/ContentsCart'

export default function Cart() {
  return <ContentsCart />
}
Cart.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutMobile>{page}</LayoutMobile>
}

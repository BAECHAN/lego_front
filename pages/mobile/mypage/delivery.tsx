import LayoutMobile from '@components/LayoutMobile'
import ContentsDelivery from '@components/mypage/ContentsDelivery'

export default function Delivery() {
  return <ContentsDelivery />
}
Delivery.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutMobile>{page}</LayoutMobile>
}

import LayoutMobile from '@components/LayoutMobile'

export default function Cart() {
  return (
    <div className="flex justify-center h-10">
      <strong>작성 중인 페이지입니다.</strong>
    </div>
  )
}
Cart.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutMobile>{page}</LayoutMobile>
}

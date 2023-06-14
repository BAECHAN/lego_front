import LayoutMobile from '@components/LayoutMobile'

export default function UserInfo() {
  return (
    <div className="flex justify-center h-10">
      <strong>작성 중인 페이지입니다.</strong>
    </div>
  )
}
UserInfo.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutMobile>{page}</LayoutMobile>
}

import LayoutMobile from '@components/LayoutMobile'
import ContentsUserInfo from '@components/mypage/ContentsUserInfo'

export default function UserInfo() {
  return <ContentsUserInfo />
}
UserInfo.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutMobile>{page}</LayoutMobile>
}

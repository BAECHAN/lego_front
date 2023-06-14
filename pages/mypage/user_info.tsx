import Layout from '@components/Layout'
import ContentsUserInfo from '@components/mypage/ContentsUserInfo'

export default function UserInfo() {
  return <ContentsUserInfo />
}
UserInfo.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

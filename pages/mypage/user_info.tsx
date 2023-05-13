import Layout from '@components/Layout'
import UserInfoContentsLine from '@components/mypage/UserInfoContentsLine'
import { NextApiRequest } from 'next'
import { signOut } from 'next-auth/react'
import axiosRequest from 'pages/api/axios'
import useUser from 'pages/api/query/useUser'
import React from 'react'

export default function UserInfo(req: NextApiRequest) {
  const { data: userInfo, isFetched, status } = useUser()

  const handleClickWithdraw = () => {
    if (isFetched && status == 'success') {
      const param = {
        email: userInfo.data.email,
      }

      axiosRequest(
        'patch',
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/withdraw-account`,
        param
      )
        .then((response) => {
          if (response?.status === 204) {
            alert(
              '회원탈퇴가 완료되었습니다.\r보다 나은 서비스로 다시 만나뵐 수 있기를 바랍니다.'
            )
            signOut()
          } else {
            alert(
              '의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.'
            )
            console.error(`HTTP status : ${response?.status}`)
          }
        })
        .catch((error) => {
          console.log(error)
          alert(
            '회원탈퇴 신청이 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.'
          )
          return false
        })
    }
  }

  return (
    <div className="min-h-[600px]">
      <div className="user-info-contents w-full my-8">
        {isFetched && userInfo ? (
          <>
            <UserInfoContentsLine
              infoKey={'email'}
              infoName={'이메일(아이디)'}
              infoValue={userInfo.data.email}
              infoUpdate={false}
              email={userInfo.data.email}
            />
            <UserInfoContentsLine
              infoKey={'password'}
              infoName={'비밀번호'}
              infoValue="***********"
              infoUpdate={true}
              email={userInfo.data.email}
            />
            <UserInfoContentsLine
              infoKey={'name'}
              infoName={'닉네임'}
              infoValue={userInfo.data.name}
              infoUpdate={true}
              email={userInfo.data.email}
            />
            <UserInfoContentsLine
              infoKey={'grade'}
              infoName={'등급'}
              infoValue={userInfo.data.grade}
              infoUpdate={false}
              email={userInfo.data.email}
            />

            <div className="my-20 order-info">
              <h1 className="text-2xl font-bold mb-3">배송 정보</h1>
              <hr className="border-black border-2" />

              <UserInfoContentsLine
                infoKey={'address'}
                infoName={'배송지'}
                infoUpdate={true}
                email={userInfo.data.email}
              />
            </div>

            <div className="my-20 order-info">
              <h1 className="text-2xl font-bold mb-3">로그인 연동 정보</h1>
              <hr className="border-black border-2" />

              <UserInfoContentsLine
                infoKey={'onKakao'}
                infoName={'카카오 로그인 연동 상태'}
                onConnect={userInfo.data.oauth_connect == 'kakao'}
                infoUpdate={false}
                email={userInfo.data.email}
              />
              <UserInfoContentsLine
                infoKey={'onGoogle'}
                infoName={'구글 로그인 연동 상태'}
                onConnect={userInfo.data.oauth_connect == 'google'}
                infoUpdate={false}
                email={userInfo.data.email}
              />

              <div></div>
            </div>

            <div className="flex justify-center">
              <div className="flex-grow w-1/4" />
              <button
                type="button"
                title="회원탈퇴 신청 버튼"
                className="btn-common min-w-[500px] flex flex-col justify-center items-center"
                onClick={handleClickWithdraw}
              >
                회원탈퇴
              </button>
              <div className="flex-grow w-1/2" />
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
UserInfo.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

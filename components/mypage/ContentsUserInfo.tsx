import ButtonUserWithdraw from '@components/mypage/ButtonUserWithdraw'
import UserInfoContentsLine from '@components/mypage/UserInfoContentsLine'
import useUser from 'pages/api/query/useUser'
import React from 'react'

export default function ContentsUserInfo() {
  const { data: userInfo, isFetched, status } = useUser()

  return (
    <div className="desktop:min-h-[600px]">
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
              <h1 className="text-2xl font-bold mb-3 mobile:text-center">
                배송 정보
              </h1>
              <hr className="border-black border-2" />

              <UserInfoContentsLine
                infoKey={'address'}
                infoName={'배송지'}
                infoUpdate={true}
                email={userInfo.data.email}
              />
            </div>

            <div className="my-20 order-info">
              <h1 className="text-2xl font-bold mb-3 mobile:text-center">
                로그인 연동 정보
              </h1>
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
            </div>

            <div className="flex justify-center">
              <div className="flex-grow desktop:w-1/4" />
              <ButtonUserWithdraw />
              <div className="flex-grow desktop:w-1/2" />
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

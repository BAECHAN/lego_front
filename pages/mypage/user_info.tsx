import Layout from '@components/Layout'
import UserInfoContentsLine from '@components/mypage/UserInfoContentsLine'
import axios from 'axios'
import { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'
import { signIn, useSession } from 'next-auth/react'
import useUser from 'pages/api/query/useUser'
import React, { useEffect } from 'react'

export default function UserInfo(req: NextApiRequest) {
  // 회원정보 가져와서 화면에 보여주기
  // 수정할 수 있도록 하는 버튼 추가
  // 로그인 연동 ()
  //  배송정보 등록 필요
  // 배송정보 관련 화면에 보여주기

  const { data: userInfo, isFetched, isFetching } = useUser()

  return (
    <div className="min-h-[600px]">
      <div className="user-info-contents w-full my-8">
        {isFetched && userInfo ? (
          <>
            <UserInfoContentsLine
              infoKey={'image'}
              infoName={'프로필 사진'}
              infoValue={userInfo.image}
              infoUpdate={true}
              email={userInfo.email}
            />
            <UserInfoContentsLine
              infoKey={'email'}
              infoName={'이메일(아이디)'}
              infoValue={userInfo.email}
              infoUpdate={false}
              email={userInfo.email}
            />
            <UserInfoContentsLine
              infoKey={'password'}
              infoName={'비밀번호'}
              infoValue="***********"
              infoUpdate={true}
              email={userInfo.email}
            />
            <UserInfoContentsLine
              infoKey={'name'}
              infoName={'닉네임'}
              infoValue={userInfo.name}
              infoUpdate={true}
              email={userInfo.email}
            />
            <UserInfoContentsLine
              infoKey={'grade'}
              infoName={'등급'}
              infoValue={userInfo.grade}
              infoUpdate={false}
              email={userInfo.email}
            />
          </>
        ) : null}
      </div>
      <style jsx>{``}</style>
    </div>
  )
}
UserInfo.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

import Layout from '@components/Layout'
import UserInfoContentsLine from '@components/mypage/UserInfoContentsLine'
import { NextApiRequest } from 'next'
import { signOut } from 'next-auth/react'
import axiosRequest from 'pages/api/axios'
import useUser from 'pages/api/query/useUser'
import React from 'react'

export default function UserInfo(req: NextApiRequest) {
  // 회원정보 가져와서 화면에 보여주기
  // 수정할 수 있도록 하는 버튼 추가
  // 로그인 연동 ()
  //  배송정보 등록 필요
  // 배송정보 관련 화면에 보여주기

  const { data: userInfo, isFetched, isFetching, status } = useUser()

  const handleClickWithdraw = () => {
    if (isFetched && status == 'success') {
      const param = {
        email: userInfo.email,
      }

      axiosRequest(
        'patch',
        `https://port-0-lego-back-nx562olfs8ljco.sel3.cloudtype.app/api/withdraw-account`,
        param
      )
        .then((response) => {
          if (response?.status === 200) {
            if (response.data.result > 0) {
              alert(
                '회원탈퇴가 완료되었습니다.\r보다 나은 서비스로 다시 만나뵐 수 있기를 바랍니다.'
              )
              signOut()
            } else {
              alert(
                '회원탈퇴 신청이 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.'
              )
              return false
            }
          } else {
            alert(
              '회원탈퇴 신청이 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.'
            )
            return false
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

            <div className="my-20 order-info">
              <h1 className="text-2xl font-bold mb-3">배송 정보</h1>
              <hr className="border-black border-2" />

              <UserInfoContentsLine
                infoKey={'address'}
                infoName={'배송지'}
                infoUpdate={true}
                email={userInfo.email}
              />
            </div>

            <div className="my-20 order-info">
              <h1 className="text-2xl font-bold mb-3">로그인 연동 정보</h1>
              <hr className="border-black border-2" />

              <UserInfoContentsLine
                infoKey={'onKakao'}
                infoName={'카카오 로그인 연동 상태'}
                infoUpdate={false}
                email={userInfo.email}
              />
              <UserInfoContentsLine
                infoKey={'onGoogle'}
                infoName={'구글 로그인 연동 상태'}
                infoUpdate={false}
                email={userInfo.email}
              />

              <div></div>
            </div>

            <div className="flex justify-center">
              <div className="flex-grow w-1/4" />
              <button
                type="button"
                className="btn-withdraw flex flex-col justify-center items-center"
                onClick={handleClickWithdraw}
              >
                회원탈퇴
              </button>
              <div className="flex-grow w-1/2" />
            </div>
          </>
        ) : null}
      </div>
      <style jsx>{`
        button.btn-withdraw {
          height: 50px;
          margin-top: 17px;
          box-sizing: border-box;
          outline: 0;
          border: 0;
          cursor: pointer;
          user-select: none;
          vertical-align: middle;
          -webkit-appearance: none;
          font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
          font-weight: 500;
          font-size: 20px;
          letter-spacing: 0.02857em;
          text-transform: uppercase;
          min-width: 500px;
          padding: 6px 16px;
          border-radius: 4px;
          transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          color: black;
          text-decoration: none;
          background-color: rgb(255, 207, 0);

          :hover {
            background-color: black;
            color: white;
          }
        }
      `}</style>
    </div>
  )
}
UserInfo.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

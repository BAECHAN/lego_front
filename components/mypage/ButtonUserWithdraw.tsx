import { signOut } from 'next-auth/react'
import axiosRequest from 'pages/api/axios'
import useUser from 'pages/api/query/useUser'
import React from 'react'

export default function ButtonUserWithdraw() {
  const { data: userInfo, isFetched, status } = useUser()

  const handleClickWithdraw = () => {
    if (confirm('탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가하오니 신중하게 선택하시기 바랍니다.\r\r정말로 탈퇴하시겠습니까?')) {
      if (isFetched && status === 'success') {
        const param = {
          email: userInfo.data.email,
        }

        axiosRequest('patch', `${process.env.NEXT_PUBLIC_SERVER_URL}/api/withdraw-account`, param)
          .then((response) => {
            if (response?.status === 204) {
              alert('회원탈퇴가 완료되었습니다.\r보다 나은 서비스로 다시 만나뵐 수 있기를 바랍니다.')
              signOut()
            } else {
              alert('의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.')
              console.error(`HTTP status : ${response?.status}`)
            }
          })
          .catch((error) => {
            console.log(error)
            alert('회원탈퇴 신청이 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.')
            return false
          })
      }
    } else {
      return false
    }
  }

  return (
    <button type="button" title="회원탈퇴 신청 버튼" className="btn-common desktop:min-w-[500px] mobile:min-w-[200px] flex flex-col justify-center items-center" onClick={handleClickWithdraw}>
      회원탈퇴
    </button>
  )
}

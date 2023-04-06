import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'

declare const window: typeof globalThis & {
  IMP: any
}
export default function Payment(props: {
  price: number
  submits: {}
  enabled: boolean
  setIsShippingBlinking: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const onClickPayment = () => {
    if (!props.enabled) {
      alert(
        '배송지를 선택해주시기 바랍니다.\r만약 배송지가 없을 경우 배송지등록을 먼저 진행해주시기 바랍니다.'
      )
      window.scrollTo(0, 0)
      props.setIsShippingBlinking(true)
      return false
    }

    alert(
      '결제 테스트 모달화면이 보여지게 됩니다.\rPG테스트모드이므로 환불이 어려울 수 있으며, 해당 사이트는 테스트 사이트이기 때문에 결제 취소하셔도 주문되도록 처리하였습니다.'
    )

    /* 1. 가맹점 식별하기 */
    const { IMP } = window
    IMP.init(process.env.NEXT_PUBLIC_IMP_CODE) // 'imp00000000' 대신 발급받은 가맹점 식별코드를 사용합니다.
    // 가맹점 식별코드는 아임포트 관리자 페이지 로그인 후, 시스템 설정 > 내정보에서 확인하실 수 있습니다.

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'html5_inicis', // PG사
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 100, // 결제금액
      name: '아임포트 결제 데이터 분석', // 주문명
      buyer_name: '홍길동', // 구매자 이름
      buyer_tel: '01012341234', // 구매자 전화번호
      buyer_email: 'example@example', // 구매자 이메일
      buyer_addr: '신사동 661-16', // 구매자 주소
      buyer_postcode: '06018', // 구매자 우편번호
    }

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback)
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response: any) {
    const { success, merchant_uid, error_msg } = response

    if (success) {
      alert('결제 성공')
      insertOrderAPI.mutate(props.submits)
    } else {
      alert(
        `결제 실패: ${error_msg}\r테스트 사이트이기 때문에 결제취소하여도 주문되도록 처리하였습니다.`
      )
      insertOrderAPI.mutate(props.submits)
    }
  }

  const insertOrderAPI = useMutation(
    async (param: any) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/add-order`,
        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
      return res.data
    },
    {
      onSuccess: async (response) => {
        if (response.result == 1) {
          alert('주문이 완료되었습니다.\r주문 내역 페이지로 이동합니다.')
          queryClient.invalidateQueries(['user-order'])
          router.push('/mypage/order_history')
        } else {
          alert(
            '결제정보를 저장하는데 문제가 발생하였습니다.\r고객센터에 문의해주시기 바랍니다.'
          )
          queryClient.invalidateQueries(['user-order'])
          router.push('/mypage/order_history')
          return false
        }
      },
      onError: (error) => console.log(error),
    }
  )

  return (
    <button onClick={onClickPayment} title="결제창 열기 버튼">
      {props.price.toLocaleString('ko-kr')} 원 결제하기
      <style jsx>{`
        button {
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
    </button>
  )
}

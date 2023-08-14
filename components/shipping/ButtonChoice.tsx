import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { selectedShippingSelector } from 'state/atoms'
import { ShippingT } from 'types'

import { queryKeys } from 'pages/api/query/queryKeys'

export default function ButtonChoice(props: { shipping: ShippingT }) {
  const router = useRouter()
  const session = useSession()

  const queryClient = useQueryClient()

  const setSelectedShipping = useSetRecoilState(selectedShippingSelector)

  const handleClickButton = () => {
    if (session.data?.user?.email) {
      let param = {
        email: session.data?.user?.email,
        shippingId: props.shipping.shipping_id,
      }

      choiceShippingAPI.mutate(param)
    } else {
      console.log('세션이 없습니다.')
      return false
    }
  }

  const choiceShippingAPI = useMutation(
    async (param: any) => {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/upd-shipping-priority`, JSON.stringify(param), {
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
      return res
    },
    {
      onSuccess: (response) => {
        if (response?.status === 204) {
          router.push('/order')
          queryClient.invalidateQueries([queryKeys.shippingList])
          setSelectedShipping(props.shipping.shipping_id)
          return true
        } else {
          alert('의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.')
          console.error(`HTTP status : ${response?.status}`)
        }
      },
      onError: (error) => {
        console.log(error)
        alert('배송지 선택이 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.')
        return false
      },
    }
  )

  return (
    <button type="button" title="배송지 선택" className="btn-choice-shipping" onClick={handleClickButton}>
      <FontAwesomeIcon icon={faCircleCheck} width="36px" height="36px" style={{ marginLeft: '3px' }} />

      <style jsx>{`
        button.btn-choice-shipping {
          display: flex;
          align-items: center;
          line-height: 20px;
          margin: 8px;
          color: gray;
          padding: 5px 10px;

          :hover {
            color: #98dfd6;
          }
        }
      `}</style>
    </button>
  )
}

import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React from 'react'
import { ShippingT } from 'types'

import { queryKeys } from 'pages/api/query/queryKeys'

export default function ButtonDelete(props: {
  shipping: ShippingT
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setStartPage: React.Dispatch<React.SetStateAction<number>>
  totalPage: number
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
  isLastPage: boolean
  listLength: number
  shippingListCount: number
}) {
  const session = useSession()
  const queryClient = useQueryClient()

  const handleClickButton = () => {
    if (props.shipping.shipping_default == 1) {
      alert('기본 배송지는 삭제할 수 없습니다.\r기본 배송지를 변경 후 삭제해주시기 바랍니다.')
      return false
    }

    if (confirm('배송지를 삭제하시겠습니까?') && session.data?.user?.email) {
      let param = {
        email: session.data?.user?.email,
        shippingId: props.shipping.shipping_id,
      }

      deleteShippingAPI.mutate(param)
    } else {
      return false
    }
  }

  const deleteShippingAPI = useMutation(
    async (param: any) => {
      return await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/del-shipping`, JSON.stringify(param), {
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
    },
    {
      onSuccess: (response) => {
        if (response?.status === 204) {
          alert('배송지를 삭제하였습니다.')

          if (props.isLastPage) {
            // 마지막 페이지에서 삭제하였는 가

            if (props.listLength == 1) {
              // 아이템이 하나라서 삭제하면 페이지가 삭제되어 이전페이지로 이동하는가?

              if (props.page % 10 == 1) {
                // 만약 startPage도 바뀌는 경우면 바꿔줘야함
                props.setStartPage(props.page - 10)
              }

              props.setPage(props.page - 1)
              props.setTotalPage(props.page - 1)
            }
          } else {
            // 마지막 페이지에서 삭제하지 않았는가

            if (props.shippingListCount % 5 == 1) {
              // 마지막 페이지에 아이템이 하나라서 삭제하면 페이지가 삭제되어 totalPage를 수정
              props.setTotalPage(props.totalPage - 1)
            }
          }

          queryClient.invalidateQueries([queryKeys.shippingList])
        } else {
          alert('의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.')
          console.error(`HTTP status : ${response?.status}`)
        }
      },
      onError: (error) => {
        console.log(error)
        alert('배송지 삭제가 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.')
      },
    }
  )

  return (
    <button type="button" title="배송지 삭제" className="btn-delete-shipping" onClick={handleClickButton}>
      삭제
      <FontAwesomeIcon icon={faTrashCan} width="23px" height="23px" style={{ marginLeft: '3px' }} />
      <style jsx>{`
        button.btn-delete-shipping {
          display: flex;
          align-items: center;
          height: 32px;
          line-height: 20px;
          margin: 8px;

          min-width: 74px;

          background-color: gray;
          color: #fff;
          padding: 5px 10px;
          border-radius: 4px;
          :hover {
            background-color: #000;
          }
        }
      `}</style>
    </button>
  )
}

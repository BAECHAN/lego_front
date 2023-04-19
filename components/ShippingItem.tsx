import React from 'react'
import { ShippingT } from 'types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function ShippingItem(props: {
  shipping: ShippingT
  onOpen: any
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  startPage: number
  setStartPage: React.Dispatch<React.SetStateAction<number>>
  totalPage: number
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
  isLastPage: boolean
  listLength: number
  shippingListCount: number
}) {
  const router = useRouter()
  const session = useSession()

  const queryClient = useQueryClient()

  const handleClickButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    if (type == 'update') {
      props.onOpen(event, props.shipping)
    } else if (type == 'delete') {
      if (props.shipping.shipping_default == 1) {
        alert(
          '기본 배송지는 삭제할 수 없습니다.\r기본 배송지를 변경 후 삭제해주시기 바랍니다.'
        )
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
  }

  const deleteShippingAPI = useMutation(
    async (param: any) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/del-shipping`,
        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
      return res
    },
    {
      onSuccess: (response) => {
        if (response?.status === 200) {
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

          queryClient.invalidateQueries(['shipping-list'])
          return true
        }
      },
      onError: (error) => {
        console.log(error)
        alert(
          '배송지 삭제가 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.'
        )
        return false
      },
    }
  )

  return (
    <div className="flex items-center text-center h-20">
      {/** 배송지 */}
      <div className="flex flex-col w-[15%]">
        <div className="truncate">{props.shipping.recipient}</div>
        <div className="text-sm opacity-75 truncate">
          {props.shipping.shipping_name == props.shipping.recipient
            ? `${props.shipping.recipient}님의 배송지`
            : props.shipping.shipping_name}
        </div>
      </div>

      <div className="w-[10%]">
        {props.shipping.shipping_default == '1' ? (
          <span className="text-blue-600">기본배송지</span>
        ) : null}
      </div>

      {/** 주소 */}
      <div className="w-1/2 text-left">
        <span>{props.shipping.shipping_address1}</span>
        <span>&nbsp;{props.shipping.shipping_address2}</span>
      </div>

      {/** 연락처 */}
      <div className="w-[15%]">
        <span>
          {props.shipping.tel_number.substring(0, 3)}-
          {props.shipping.tel_number.substring(3, 7)}-
          {props.shipping.tel_number.substring(7, 11)}
        </span>
      </div>

      {/** 버튼 */}
      <div className="w-[20%] flex items-center text-sm">
        <button
          type="button"
          title="배송지 수정"
          className="btn-update-shipping flex h-8 leading-5 m-2 items-center"
          onClick={(event) => handleClickButton(event, 'update')}
        >
          수정
          <FontAwesomeIcon
            icon={faPenSquare}
            width="23px"
            height="23px"
            style={{ marginLeft: '3px' }}
          />
        </button>
        <button
          type="button"
          title="배송지 삭제"
          className="btn-delete-shipping flex h-8 leading-5 m-2 items-center"
          onClick={(event) => handleClickButton(event, 'delete')}
        >
          삭제
          <FontAwesomeIcon
            icon={faTrashCan}
            width="23px"
            height="23px"
            style={{ marginLeft: '3px' }}
          />
        </button>
      </div>

      <style jsx>{`
        button.btn-update-shipping,
        button.btn-delete-shipping {
          background-color: gray;
          color: #fff;
          padding: 5px 10px;
          border-radius: 4px;

          :hover {
            background-color: #000;
          }
        }
      `}</style>
    </div>
  )
}

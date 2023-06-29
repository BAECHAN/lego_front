import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import React from 'react'
import { ProductCartT, ProductDeleteCartSubmitT } from 'types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { selectedOrderSelector } from 'state/atoms'
import { queryKeys } from 'pages/api/query/queryKeys'

export default function ProductDeleteButton(props: { product: ProductCartT }) {
  const { data: session, status } = useSession()
  const queryClient = useQueryClient()

  let [selectedOrder, setSelectedOrder] = useRecoilState(selectedOrderSelector)

  const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (session?.user?.email) {
      let param: ProductDeleteCartSubmitT = {
        email: session.user.email,
        cart_id: Number(e.currentTarget.name.substring(15)),
        product_id: props.product.product_id,
        order_quantity: props.product.order_quantity,
      }
      delCartAPI.mutate(param)
    }
  }

  const delCartAPI = useMutation(
    async (param: ProductDeleteCartSubmitT) => {
      return await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/del-cart`,
        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
    },
    {
      onSuccess: (response, variables) => {
        if (response.status === 204) {
          setSelectedOrder(
            selectedOrder.filter((item) => item !== variables.cart_id)
          )
          queryClient.invalidateQueries([queryKeys.productCartList])
        } else {
          alert('의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.')
          console.error(`HTTP status : ${response?.status}`)
        }
      },
      onError: (error) => console.log(error),
    }
  )

  return (
    <button
      type="button"
      title="상품을 장바구니에서 빼기"
      name={`product_delete_${props.product.cart_id}`}
      className="desktop:w-32 desktop:ml-28 mobile:w-16 mobile:flex mobile:justify-center"
      onClick={(event) => handleClickDelete(event)}
    >
      <FontAwesomeIcon
        icon={faTrashCan}
        width="15px"
        className="text-gray-500 hover:cursor-pointer hover:text-black"
      />
    </button>
  )
}

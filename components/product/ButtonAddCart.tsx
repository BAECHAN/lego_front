import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { ProductT, ProductAddCartSubmitT } from 'types'
import { queryKeys } from 'pages/api/query/queryKeys'

export default function ButtonAddCart(props: {
  product_info: ProductT
  order_quantity: number
}) {
  const router = useRouter()
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const handleClickAddCart = () => {
    if (session?.user?.email) {
      let param: ProductAddCartSubmitT = {
        email: session.user.email,
        product_id: props.product_info.product_id,
        order_quantity: props.order_quantity,
      }

      addCartAPI.mutate(param)
    } else {
      signIn()
    }
  }

  const addCartAPI = useMutation(
    async (param: ProductAddCartSubmitT) => {
      return await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/add-cart`,
        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
    },
    {
      onSuccess: (response) => {
        if (response.status === 201) {
          if (
            confirm('장바구니에 추가하였습니다.\r장바구니로 이동하시겠습니까?')
          ) {
            router.push('/mypage/cart')
          }

          queryClient.invalidateQueries([queryKeys.productInfo])
          queryClient.invalidateQueries([queryKeys.productList])
          queryClient.invalidateQueries([queryKeys.productViewedList])
          queryClient.invalidateQueries([queryKeys.productWishList])
        } else {
          alert('의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.')
          console.error(`HTTP status : ${response?.status}`)
        }
      },
      onError: (error) => {
        console.log(error)
        alert(
          '장바구니 추가에 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.'
        )
      },
    }
  )

  return (
    <button
      type="button"
      title="장바구니에 담기"
      className="add-to-cart"
      onClick={handleClickAddCart}
    >
      장바구니 담기
      <style jsx>{`
        .add-to-cart {
          width: 100%;
          background-color: rgb(253, 128, 36);
          border-color: rgb(253, 128, 36);
          color: rgb(0, 0, 0);
          border-width: 2px;
          padding: 0.9375rem;
          border-style: solid;
          border-radius: 4px;
          border-collapse: collapse;
          text-align: center;
          font-weight: 700;
        }
        .add-to-cart:hover {
          color: white;
          opacity: 0.7;
        }
      `}</style>
    </button>
  )
}

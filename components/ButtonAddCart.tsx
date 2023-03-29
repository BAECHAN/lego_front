import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import axiosRequest from 'pages/api/axios'
import React from 'react'
import { ProductT, ProductAddCartSubmitT } from 'types'

export default function ButtonAddCart(props: {
  product_info: ProductT
  order_quantity: number
}) {
  const router = useRouter()
  const { data: session } = useSession()

  const handleClickAddCart = () => {
    if (session?.user?.email) {
      let param: ProductAddCartSubmitT = {
        email: session.user.email,
        product_id: props.product_info.product_id,
        order_quantity: props.order_quantity,
      }

      axiosRequest(
        'post',
        `https://port-0-lego-back-nx562olfs8ljco.sel3.cloudtype.app/api/add-cart`,
        param
      )
        .then((response) => {
          if (response?.status === 200 && response.data.result == 1) {
            if (
              confirm(
                '장바구니에 추가하였습니다.\r장바구니로 이동하시겠습니까?'
              )
            ) {
              router.push('/mypage/cart')
            } else {
              return false
            }
          }
        })
        .catch((error) => {
          console.log(error)
          alert(
            '장바구니 추가에 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.'
          )
          return false
        })
    } else {
      signIn()
    }
  }

  return (
    <button type="button" className="add-to-cart" onClick={handleClickAddCart}>
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

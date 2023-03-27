import React, { useEffect, useMemo, useRef, useState } from 'react'
import { OrderT, ProductCartT, ProductUpdateCartSubmitT } from 'types'
import Image from 'next/image'
import Link from 'next/link'
import * as common from '@components/common/event/CommonFunction'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import axios from 'axios'

export default function ProductInOrderHistory(props: { order: OrderT }) {
  const { data: session, status } = useSession()

  const queryClient = useQueryClient()

  const date = new Date(props.order.date_registed)

  const orderTime = common.timeFormat(date)

  const handleClickRefund = () => {
    if (
      status == 'authenticated' &&
      session &&
      session.user &&
      session.user.email
    ) {
      let param = {
        email: session.user.email,
        order_group_id: props.order.order_group_id,
      }

      updOrderRefundAPI.mutate(param)
    } else {
      alert(
        '회원정보를 불러오는 중입니다.\r잠시후에 다시 시도해주시기 바랍니다.'
      )
      return false
    }
  }

  const updOrderRefundAPI = useMutation(
    async (param: { email: string; order_group_id: number }) => {
      const res = await axios.patch(
        `http://localhost:5000/api/upd-order-refund`,
        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
      return res.data
    },
    {
      onSuccess: async (response) => {
        if (response?.status === 200) {
          alert('환불처리 되었습니다.')
          queryClient.invalidateQueries(['order-list'])
        } else {
          alert(
            '환불처리 하는데 문제가 발생하였습니다.\r관리자에게 문의해주시기 바랍니다.'
          )
          return false
        }
      },
      onError: (error) => console.log(error),
    }
  )

  return (
    <div className="product-in-order w-full flex justify-start items-center">
      <div className="w-4/12 flex-col flex justify-center m-3">
        <div className="product-in-order-image w-32 scale-75 hover:scale-90 transition-all ease-in-out mb-1">
          <Link href={`/products/${props.order.product_number}`}>
            <a>
              <Image
                src={props.order.image}
                width="40vw"
                height="20vw"
                alt={props.order.title}
                style={{ cursor: 'pointer' }}
                priority
                placeholder="blur"
                blurDataURL={`iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFc
                SJAAAADUlEQVR42mN8sFeoHgAGZAIwFY0DHwAAAABJRU5ErkJggg==`}
                quality={100}
                layout="responsive"
              />
            </a>
          </Link>
        </div>
        <div className="product-in-order-content">
          <Link href={`/products/${props.order.product_number}`}>
            <a className="prod-title">{props.order.title}</a>
          </Link>
        </div>
      </div>
      <div className="w-2/12 flex items-center">{orderTime}</div>
      <div className="flex-grow" />
      <div className="w-1/12 text-center">{props.order.order_group_id}</div>

      <div className="flex-col flex items-center w-2/12">
        <div>{props.order.pay_price.toLocaleString('ko-kr')} 원</div>
        <div className="text-gray-500">
          <div>{props.order.order_quantity} 개</div>
        </div>
      </div>

      <div className="flex text-center w-2/12 items-center justify-center">
        <b className="mr-2">
          {props.order.state == 2
            ? '결제완료'
            : props.order.state == 7
            ? '환불완료'
            : '환불대기'}
        </b>
        <button
          type="button"
          className="btn-refund flex h-8 leading-5"
          onClick={handleClickRefund}
        >
          환불요청
        </button>
      </div>

      <style jsx>{`
        button.btn-refund {
          background-color: gray;
          color: #fff;
          padding: 5px 10px;
          border-radius: 4px;

          :hover {
            background-color: #000;
          }
        }

        .product-in-order-content {
          flex-flow: wrap;
        }

        a.prod-title {
          width: 100%;
          height: 40px;
          :hover {
            text-decoration: underline;
          }
        }
      `}</style>
    </div>
  )
}
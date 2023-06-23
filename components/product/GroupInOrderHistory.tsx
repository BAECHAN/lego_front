import React, { useEffect, useState } from 'react'
import { OrderGroupT, OrderT } from 'types'
import Image from 'next/image'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import axios from 'axios'

import * as common from '@components/common/event/CommonFunction'
import * as swal from '@components/common/custom/SweetAlert'
import { queryKeys } from 'pages/api/query/queryKeys'
import ProductInOrderHistory from './ProductInOrderHistory'

export default function GroupInOrderHistory(props: {
  orderGroup: OrderGroupT
  order: OrderT[]
}) {
  const { data: session, status } = useSession()

  const queryClient = useQueryClient()

  const date = new Date(props.orderGroup.date_registed)

  const orderTime = common.TimeFormat(date)

  const [isRefund, setIsRefund] = useState(false)

  const [isOpenDelivery, setIsOpenDelivery] = useState(false)
  const [isOpenDetail, setIsOpenDetail] = useState(false)

  useEffect(() => {
    if (props.orderGroup.state == 7) {
      setIsRefund(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickRefund = () => {
    if (status == 'authenticated' && session?.user && session.user.email) {
      let param = {
        email: session.user.email,
        order_group_id: props.orderGroup.order_group_id,
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
      return await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/upd-order-refund`,
        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
    },
    {
      onSuccess: async (response) => {
        if (response.status === 204) {
          swal.SweetAlertSuccess('환불처리 되었습니다.')
          queryClient.invalidateQueries([queryKeys.orderList])
          setIsRefund(true)
          setIsOpenDelivery(false)
          setIsOpenDetail(false)
        } else {
          alert('의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.')
          console.error(`HTTP status : ${response?.status}`)
        }
      },
      onError: (error) => console.log(error),
    }
  )

  return (
    <div className="w-full desktop:min-w-[788px]">
      <div className="product-in-order w-full flex justify-start items-center">
        <div className="w-2/12 flex-col flex justify-center m-3">
          <div className="product-in-order-image w-32 scale-75 hover:scale-90 transition-all ease-in-out mb-1">
            <Link href={`/products/${props.order[0].product_number}`}>
              <a>
                <Image
                  src={props.order[0].image}
                  width="40vw"
                  height="20vw"
                  alt={props.order[0].title}
                  style={{ cursor: 'pointer' }}
                  priority
                  placeholder="blur"
                  blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPgvCAACGQES86Y9kwAAAABJRU5ErkJggg==`}
                  quality={100}
                  layout="responsive"
                />
              </a>
            </Link>
          </div>
          <div className="product-in-order-content">
            <Link href={`/products/${props.order[0].product_number}`}>
              <a className="prod-title">{props.order[0].title}</a>
            </Link>
            <p className="text-xs text-gray-500 text-right">
              포함 총 {props.orderGroup.product_count} 건
            </p>
          </div>
        </div>
        <div
          title="주문한 시간"
          className="w-1/12 flex items-center text-center"
        >
          {orderTime}
        </div>
        <div className="w-1/12 text-center">
          {props.orderGroup.order_group_id}
        </div>

        <div className="flex-col flex items-center w-2/12">
          <div title="상품별 주문한 금액">
            {props.orderGroup.total_price.toLocaleString('ko-kr')} 원
          </div>
          <div className="text-gray-500">
            <div title="주문한 상품 항목 수">
              {props.orderGroup.product_count} 건
            </div>
          </div>
        </div>

        <div className="flex text-center w-2/12 items-center justify-center">
          <b className="mr-2" title="주문 상태">
            {props.orderGroup.state == 2
              ? '결제완료'
              : props.orderGroup.state == 7 || isRefund
              ? '환불완료'
              : '환불대기'}
          </b>
          {props.orderGroup.state == 2 && !isRefund ? (
            <button
              type="button"
              title="환불 요청 버튼"
              className="btn-refund flex h-8 leading-5 min-w-[84px]"
              onClick={handleClickRefund}
            >
              환불요청
            </button>
          ) : null}
        </div>
        <div className="flex text-center w-2/12 items-center justify-center">
          {props.orderGroup.state == 2 && !isRefund ? (
            <button
              type="button"
              title={`배송지 정보 ${isOpenDelivery ? '닫기' : '보기'} 버튼`}
              className="btn-delivery min-w-[106px]"
              onClick={() => setIsOpenDelivery(!isOpenDelivery)}
            >
              {`배송지 ${isOpenDelivery ? '닫기' : '보기'}`}
            </button>
          ) : null}
        </div>
        <div className="flex text-center w-2/12 items-center justify-center">
          <button
            type="button"
            title={`상품상세 ${isOpenDetail ? '닫기' : '보기'} 버튼`}
            className="btn-delivery min-w-[106px]"
            onClick={() => setIsOpenDetail(!isOpenDetail)}
          >
            {`상품상세 ${isOpenDetail ? '닫기' : '보기'}`}
          </button>
        </div>
      </div>
      {isOpenDelivery && (
        <div className="flex justify-center my-3">
          <div className="text-center border border-black border-solid w-1/2 mt-3 p-3">
            <p>수령인 : {props.orderGroup.recipient}</p>
            <p>
              주소 : {props.orderGroup.shipping_address1}&nbsp;
              {props.orderGroup.shipping_address2}
            </p>
            <p>
              요청사항 :&nbsp;
              {props.orderGroup.delivery_request == '1'
                ? '없음'
                : props.orderGroup.delivery_request == '2'
                ? '부재 시 경비실에 맡겨주세요'
                : props.orderGroup.delivery_request == '3'
                ? '부재 시 택배함에 넣어주세요'
                : props.orderGroup.delivery_request == '4'
                ? '부재 시 집 앞에 놔주세요'
                : props.orderGroup.delivery_request == '5'
                ? '배송 전 연락 바랍니다'
                : props.orderGroup.delivery_request == '6'
                ? '파손의 위험이 있는 상품이니 배송 시 주의해 주세요'
                : props.orderGroup.delivery_request == '7'
                ? props.orderGroup.delivery_request_direct
                : null}
            </p>
          </div>
        </div>
      )}
      {isOpenDetail && (
        <div className="border-2 border-black border-solid">
          <ul className="flex flex-wrap">
            {props.order.length > 0
              ? props.order?.map((orderProduct: OrderT, index: number) => {
                  return (
                    <ProductInOrderHistory order={orderProduct} key={index} />
                  )
                })
              : null}
          </ul>
          <div className="flex text-center items-center justify-center my-4">
            <button
              type="button"
              title="상품상세 닫기 버튼"
              className="btn-delivery min-w-[106px]"
              onClick={() => setIsOpenDetail(!isOpenDetail)}
            >
              상품상세 닫기
            </button>
          </div>
        </div>
      )}
      <style jsx>{`
        button.btn-refund,
        button.btn-delivery {
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
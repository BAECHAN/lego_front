import React from 'react'
import { ShippingT } from 'types'

import * as common from '@components/common/event/CommonFunction'

import ButtonDelete from './ButtonDelete'
import ButtonEdit from './ButtonEdit'

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
  return (
    <div className="flex items-center text-center h-20">
      {/** 배송지 */}
      <div className="flex flex-col w-[15%]">
        <div className="truncate">{props.shipping.recipient}</div>
        <div className="text-sm opacity-75 truncate">{props.shipping.shipping_name === props.shipping.recipient ? `${props.shipping.recipient}님의 배송지` : props.shipping.shipping_name}</div>
      </div>

      <div className="w-[10%]">{props.shipping.shipping_default === 1 ? <span className="text-blue-600">기본배송지</span> : null}</div>

      {/** 주소 */}
      <div className="w-1/2 text-left">
        <span>{props.shipping.shipping_address1}</span>
        <span>&nbsp;{props.shipping.shipping_address2}</span>
      </div>

      {/** 연락처 */}
      <div className="w-[15%]">
        <span>{common.formattedTelNumber(props.shipping.tel_number)}</span>
      </div>

      {/** 버튼 */}
      <div className="w-[20%] flex items-center text-sm">
        <ButtonEdit shipping={props.shipping} onOpen={props.onOpen} />
        <ButtonDelete
          shipping={props.shipping}
          page={props.page}
          setPage={props.setPage}
          setStartPage={props.setStartPage}
          totalPage={props.totalPage}
          setTotalPage={props.setTotalPage}
          isLastPage={props.isLastPage}
          listLength={props.listLength}
          shippingListCount={props.shippingListCount}
        />
      </div>
    </div>
  )
}

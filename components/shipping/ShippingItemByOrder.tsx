import React from 'react'
import { ShippingT } from 'types'
import ButtonEdit from './ButtonEdit'
import ButtonDelete from './ButtonDelete'
import ButtonChoice from './ButtonChoice'

export default function ShippingItemByOrder(props: {
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
    <div className="flex justify-center">
      <div className="flex flex-col shipping-box">
        <div className="flex">
          <div className="flex flex-col text-[12px] items-start w-3/4">
            <div className="font-bold">
              <span>
                {props.shipping.shipping_name == props.shipping.recipient
                  ? `${props.shipping.recipient}님의 배송지`
                  : props.shipping.shipping_name}
              </span>
              <span className="mx-1">/</span>
              <span>{props.shipping.recipient}</span>
              {props.shipping.shipping_default == '1' ? (
                <span className="text-blue-600 ml-1">기본배송지</span>
              ) : null}
            </div>
            <div>
              <span>[{props.shipping.shipping_zipcode}]</span>
              <span className="ml-1">{props.shipping.shipping_address1}</span>
              <span>&nbsp;{props.shipping.shipping_address2}</span>
            </div>
            <div>
              <span className="text-gray-500">
                {props.shipping.tel_number.substring(0, 3)}-
                {props.shipping.tel_number.substring(3, 7)}-
                {props.shipping.tel_number.substring(7, 11)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">
                {props.shipping.delivery_request == '1'
                  ? '배송 시 요청사항을 선택해주세요'
                  : props.shipping.delivery_request == '2'
                  ? '부재 시 경비실에 맡겨주세요'
                  : props.shipping.delivery_request == '3'
                  ? '부재 시 택배함에 넣어주세요'
                  : props.shipping.delivery_request == '4'
                  ? '부재 시 집 앞에 놔주세요'
                  : props.shipping.delivery_request == '5'
                  ? '배송 전 연락 바랍니다'
                  : props.shipping.delivery_request == '6'
                  ? '파손의 위험이 있는 상품이니 배송 시 주의해 주세요'
                  : props.shipping.delivery_request == '7'
                  ? props.shipping.delivery_request_direct
                  : null}
              </span>
            </div>
          </div>
          <div className="flex-grow"></div>
          <div>
            <div className="flex items-center text-sm">
              <ButtonChoice shipping={props.shipping} />
            </div>
          </div>
        </div>

        <div className="flex text-sm self-end">
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
      <style jsx>{`
        .shipping-box {
          width: 60%;
          margin: 10px;
          padding: 10px;
          border: 0.5px solid rgb(99, 97, 97, 0.5);
          border-radius: 5px;
        }
      `}</style>
    </div>
  )
}

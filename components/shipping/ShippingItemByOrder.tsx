import React from 'react'
import { ShippingT } from 'types'

import { deliveryRequestOptions } from 'pages/api/common/deliveryRequestOptions'

import useIsMobile from '@components/common/custom/isMobile'
import * as common from '@components/common/event/CommonFunction'

import ButtonChoice from './ButtonChoice'
import ButtonDelete from './ButtonDelete'
import ButtonEdit from './ButtonEdit'

const ShippingItemByOrder = (props: {
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
}) => {
  const isMobile = useIsMobile()

  const { shipping_name, recipient, shipping_default, shipping_zipcode, shipping_address1, shipping_address2, tel_number, delivery_request, delivery_request_direct } = props.shipping

  const getDeliveryRequestLabel = () => {
    const index = parseInt(delivery_request, 10) - 1
    const value = deliveryRequestOptions[index]
    return index === 6 ? delivery_request_direct : value
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col shipping-box">
        <div className="flex">
          <div className="flex flex-col text-[12px] items-start w-3/4">
            <div className="font-bold">
              <span>{shipping_name === recipient ? `${recipient}님의 배송지` : shipping_name}</span>
              <span className="mx-1">/</span>
              <span>{recipient}</span>
              {shipping_default === 1 && <span className="text-blue-600 ml-1">기본배송지</span>}
            </div>
            <div>
              <span>[{shipping_zipcode}]</span>
              <span className="ml-1">{shipping_address1}</span>
              <span>&nbsp;{shipping_address2}</span>
            </div>
            <div>
              <span className="text-gray-500">{common.formattedTelNumber(tel_number)}</span>
            </div>
            <div>
              <span className="text-gray-500">{getDeliveryRequestLabel()}</span>
            </div>
          </div>
          <div className="flex-grow"></div>
          {!isMobile && (
            <div>
              <div className="flex items-center text-sm">
                <ButtonChoice shipping={props.shipping} />
              </div>
            </div>
          )}
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

          @media (max-width: 768px) {
            width: 85%;
          }
        }
      `}</style>
    </div>
  )
}

export default ShippingItemByOrder

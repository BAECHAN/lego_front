import React from 'react'
import { ShippingT } from 'types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function ShippingItem(props: { shipping: ShippingT }) {
  console.log(props.shipping)

  const handleClickButton = (type: string) => {}

  return (
    <div className="flex items-center text-center h-20">
      {/** 배송지 */}
      <div className="flex flex-col w-[15%]">
        <div>{props.shipping.recipient}</div>
        <div className="text-sm opacity-75">
          {props.shipping.shipping_name}님의 배송지
        </div>
      </div>

      <div className="w-[8%]">
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
      <div className="w-1/6 flex items-center text-sm">
        <button
          type="button"
          className="flex h-8 leading-5 m-2 items-center"
          onClick={() => handleClickButton('update')}
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
          className="flex h-8 leading-5 m-2 items-center"
          onClick={() => handleClickButton('delete')}
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
        button {
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

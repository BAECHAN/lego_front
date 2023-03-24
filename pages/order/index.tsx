import Layout from '@components/Layout'
import ProductInOrder from '@components/ProductInOrder'
import * as common from '@components/common/event/CommonFunction'
import useDeliveryShippingList from 'pages/api/query/useDeliveryShippingList'
import useProductCartList from 'pages/api/query/useProductCartList'
import React, { useEffect, useState, ChangeEvent, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { orderPriceSelector, selectedOrderSelector } from 'state/atoms'
import { ProductCartT, ProductT, ShippingT } from 'types'

export default function Order() {
  const { data: cartData } = useProductCartList()
  let selectedOrder = useRecoilValue(selectedOrderSelector)
  let orderPrice = useRecoilValue(orderPriceSelector)

  let [totalPrice, setTotalPrice] = useState(0)
  let [deliveryPrice, setDeliveryPrice] = useState(0)

  const { data: shippingData, status: shippingStatus } =
    useDeliveryShippingList()

  const [selectedShipping, setSelectedShipping] = useState<ShippingT>()
  const [directOpen, setDirectOpen] = useState(false)
  const [directText, setDirectText] = useState('')

  const [inputs, setInputs] = useState({
    deliveryRequest: '',
    deliveryRequestDirect: '',
  })
  const inputsRef = useRef<HTMLInputElement[]>([])
  const selectsRef = useRef<HTMLSelectElement[]>([])

  useEffect(() => {
    setTotalPrice(orderPrice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (shippingStatus == 'success') {
      shippingData.shippingList.map((item: ShippingT, index: number) => {
        if (item.shipping_default == 1) {
          setSelectedShipping(item)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingData])

  useEffect(() => {
    if (selectedShipping) {
      setInputs({
        ...inputs,
        deliveryRequest: selectedShipping?.delivery_request,
        deliveryRequestDirect: selectedShipping?.delivery_request_direct,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedShipping])

  useEffect(() => {
    if (directOpen) {
      inputsRef.current[0].focus()
    }
  }, [directOpen])

  const handleChangeShipping = (
    e: ChangeEvent<HTMLInputElement>,
    item: ShippingT
  ) => {
    setSelectedShipping(item)

    if (item.delivery_request == '7') {
      setDirectOpen(true)
      setInputs({
        ...inputs,
        deliveryRequestDirect: item.delivery_request_direct,
      })
    } else {
      setDirectOpen(false)
      setInputs({ ...inputs, deliveryRequestDirect: '' })
    }
  }

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget

    if (value == '7') {
      setDirectOpen(true)
      setInputs({ ...inputs, [name]: value })
    } else {
      setDirectOpen(false)
      setInputs({ ...inputs, [name]: value, deliveryRequestDirect: '' })
    }
  }

  return (
    <div className="min-h-[602px]">
      <div className="p-3">
        <h2 className="text-xl mb-3">배송 정보</h2>
        <div className="contents-box">
          <div className="delivery-info">
            <div>배송지</div>
            {shippingData && shippingData.shippingList ? (
              <div>
                {shippingData.shippingList &&
                  shippingData.shippingList.map(
                    (item: ShippingT, index: number) => {
                      return (
                        <label key={item.shipping_id}>
                          <input
                            type="radio"
                            name="ShippingName"
                            className={item.shipping_default == 1 ? '' : 'ml-5'}
                            value={item.shipping_name}
                            defaultChecked={
                              item.shipping_default == 1 ? true : false
                            }
                            onChange={(event) =>
                              handleChangeShipping(event, item)
                            }
                          />
                          {item.shipping_name}
                        </label>
                      )
                    }
                  )}
              </div>
            ) : null}
            <button type="button" className="btn-delivery-change ml-3">
              배송지 변경
            </button>
          </div>
          <div className="delivery-info">
            <div>이름 / 연락처</div>
            <div>
              {selectedShipping?.recipient}
              &nbsp;/&nbsp;
              {selectedShipping?.tel_number.substring(0, 3)}-
              {selectedShipping?.tel_number.substring(3, 7)}-
              {selectedShipping?.tel_number.substring(7, 11)}
            </div>
          </div>
          <div className="delivery-info">
            <div>주소</div>
            <div>
              ({selectedShipping?.shipping_zipcode})&nbsp;
              {selectedShipping?.shipping_address1}&nbsp;
              {selectedShipping?.shipping_address2}
            </div>
          </div>
          <div className="delivery-info">
            <div>배송 요청사항</div>
            <div>
              <select
                className="delivery-request-input large"
                name="deliveryRequest"
                onChange={handleChangeSelect}
                value={inputs?.deliveryRequest}
                title="배송 요청사항"
                ref={(el) => {
                  el && selectsRef.current ? (selectsRef.current[0] = el) : null
                }}
              >
                <option value="1">배송 시 요청사항을 선택해주세요.</option>
                <option value="2">부재 시 경비실에 맡겨주세요.</option>
                <option value="3">부재 시 택배함에 넣어주세요.</option>
                <option value="4">부재 시 집 앞에 놔주세요.</option>
                <option value="5">배송 전 연락 바랍니다.</option>
                <option value="6">
                  파손의 위험이 있는 상품입니다. 배송 시 주의해 주세요.
                </option>
                <option value="7">직접 입력</option>
              </select>
            </div>
            {directOpen ? (
              <div className="flex my-5">
                <div className="title"></div>
                <input
                  type="text"
                  name="deliveryRequestDirect"
                  className="delivery-request-input w-[500px] ml-2 p-1"
                  value={inputs.deliveryRequestDirect}
                  title="배송 요청사항 세부내용"
                  onChange={(e) =>
                    common.CommonHandleChangeValue(
                      'maxLength30',
                      e,
                      inputs,
                      setInputs
                    )
                  }
                  ref={(el) => {
                    el && inputsRef.current ? (inputsRef.current[0] = el) : null
                  }}
                ></input>
                <i className="leading-7 ml-1">
                  ({inputs.deliveryRequestDirect.length}/30)
                </i>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="p-3 mt-3">
        <h2 className="text-xl mb-3">상품 정보</h2>
        <div className="contents-box">
          {cartData && cartData.cartList ? (
            <ul>
              {cartData.cartList &&
                cartData.cartList.map((item: ProductCartT, index: number) => {
                  return selectedOrder.some(
                    (select) => select == item.cart_id
                  ) ? (
                    <li key={item.cart_id}>
                      <ProductInOrder product={item} />
                      {index < cartData.cartList.length - 1 ? <hr /> : null}
                    </li>
                  ) : null
                })}
            </ul>
          ) : null}
        </div>
      </div>
      <div className="p-3 mt-3">
        <h2 className="text-xl mb-3">결제 금액</h2>
        <div className="contents-box">
          <div className="flex my-1">
            <div>총 상품금액</div>
            <div className="flex-grow"></div>
            <b>{totalPrice > 0 ? totalPrice.toLocaleString('ko-kr') : 0} 원</b>
          </div>
          <div className="flex my-1">
            <div>총 배송비</div>
            <div className="flex-grow"></div>
            <b>{deliveryPrice} 원</b>
          </div>
          <hr className="my-3" />
          <div className="flex text-lg">
            <div>최종 결제금액</div>
            <div className="flex-grow"></div>
            <b className="text-red-600">
              {totalPrice > 0
                ? (totalPrice + deliveryPrice).toLocaleString('ko-kr')
                : 0}{' '}
              원
            </b>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              id="btnOrderRouter"
              className="btn-pay flex justify-center items-center"
            >
              {totalPrice > 0
                ? (totalPrice + deliveryPrice).toLocaleString('ko-kr')
                : 0}{' '}
              원 결제하기
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        div.contents-box {
          padding-left: 10px;
        }
        div.delivery-info {
          display: flex;
          align-items: center;
          margin: 10px 0px;
          height: 34px;

          > div:first-child {
            width: 150px;
          }
        }

        button.btn-delivery-change {
          background-color: gray;
          color: #fff;
          padding: 5px 10px;
          border-radius: 4px;

          :hover {
            background-color: #000;
          }
        }

        .delivery-request-input {
          border: 1px solid #e5e5e5;
          height: 30px;
        }

        button.btn-pay {
          height: 50px;
          margin-top: 17px;
          box-sizing: border-box;
          outline: 0;
          border: 0;
          cursor: pointer;
          user-select: none;
          vertical-align: middle;
          -webkit-appearance: none;
          font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
          font-weight: 500;
          font-size: 20px;
          letter-spacing: 0.02857em;
          text-transform: uppercase;
          min-width: 500px;
          padding: 6px 16px;
          border-radius: 4px;
          transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          color: black;
          text-decoration: none;
          background-color: rgb(255, 207, 0);

          :hover {
            background-color: black;
            color: white;
          }
        }
      `}</style>
    </div>
  )
}
Order.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

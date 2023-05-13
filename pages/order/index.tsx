import Layout from '@components/Layout'
import ProductInOrder from '@components/ProductInOrder'
import * as common from '@components/common/event/CommonFunction'
import { useRouter } from 'next/router'
import useDeliveryShippingList from 'pages/api/query/useDeliveryShippingList'
import useProductCartList from 'pages/api/query/useProductCartList'
import React, { useEffect, useState, ChangeEvent, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import {
  orderPriceSelector,
  selectedOrderSelector,
  selectedShippingSelector,
} from 'state/atoms'
import { ProductCartT, ShippingT } from 'types'
import Payment from '@components/common/pay/Payment'
import { useSession } from 'next-auth/react'

export default function Order() {
  const router = useRouter()

  const { data: session, status } = useSession()

  const { data: product, isFetched: cartFetched } = useProductCartList()
  const selectedOrder = useRecoilValue(selectedOrderSelector)
  const orderPrice = useRecoilValue(orderPriceSelector)
  const selectedShippingFromDelivery = useRecoilValue(selectedShippingSelector)

  const [totalPrice, setTotalPrice] = useState(0)
  const [deliveryPrice, setDeliveryPrice] = useState(0)
  const [productToPayCount, setProductToPayCount] = useState(0)

  const {
    data: shippingData,
    isFetched: shippingFetched,
    status: shippingStatus,
  } = useDeliveryShippingList()

  const [selectedShipping, setSelectedShipping] = useState<ShippingT>()
  const [directOpen, setDirectOpen] = useState(false)
  const [isShippingButtonBlinking, setIsShippingBlinking] = useState(false)

  const [inputs, setInputs] = useState({
    deliveryRequest: '',
    deliveryRequestDirect: '',
  })
  const inputsRef = useRef<HTMLInputElement[]>([])
  const selectsRef = useRef<HTMLSelectElement[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [submits, setSubmits] = useState({
    email: '',
    shipping_id: 0,
    delivery_request: '',
    delivery_request_direct: '',
    cart_info: {},
  })

  useEffect(() => {
    if (status == 'authenticated' && product && selectedShipping) {
      setSubmits({
        ...submits,
        email: session.user?.email ? session.user.email : '',
        shipping_id: selectedShipping.shipping_id,
        delivery_request: selectsRef.current[0].value,
        delivery_request_direct:
          selectsRef.current[0].value == '7' ? inputsRef.current[0].value : '',
        cart_info: product.data.cartList.filter((cartItem: ProductCartT) =>
          selectedOrder.includes(cartItem.cart_id)
        ),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedShipping, product, status, inputs])

  useEffect(() => {
    setTotalPrice(orderPrice)
    setProductToPayCount(selectedOrder.length)

    const storage = globalThis?.sessionStorage

    if (storage) {
      if (
        !(
          storage.getItem('currentPath') === '/mypage/cart' ||
          storage.getItem('prevPath') === '/mypage/cart' ||
          storage.getItem('currentPath') === '/order/delivery_by_order' ||
          storage.getItem('prevPath') === '/order/delivery_by_order'
        )
      ) {
        alert(
          '직접 URL로 접근 시 해당 주문하기 페이지를 이용하실 수 없습니다.\r홈화면으로 이동합니다.'
        )
        router.push('/')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (shippingStatus == 'success') {
      shippingData.shippingList.map((item: ShippingT, index: number) => {
        if (item.shipping_id == selectedShippingFromDelivery) {
          setSelectedShipping(item)

          if (item.delivery_request == '7') {
            setDirectOpen(true)
          } else {
            setDirectOpen(false)
          }
        } else {
          if (item.shipping_default == 1 && selectedShippingFromDelivery == 0) {
            setSelectedShipping(item)

            if (item.delivery_request == '7') {
              setDirectOpen(true)
            } else {
              setDirectOpen(false)
            }
          }
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingFetched])

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
    if (directOpen && inputsRef) {
      inputsRef.current[0].focus()
    }
  }, [directOpen])

  useEffect(() => {
    if (isShippingButtonBlinking) {
      buttonRef.current?.focus()

      setTimeout(() => {
        setIsShippingBlinking(false)
      }, 1500)
    }
  }, [isShippingButtonBlinking])

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

  const handleClickChangeShipping = () => {
    router.push(`/order/delivery_by_order`)
  }

  return (
    <div className="min-h-[602px]">
      {cartFetched && shippingFetched ? (
        <div>
          <div className="p-3">
            <h2 className="text-xl mb-3">배송 정보</h2>
            {shippingData && shippingData.shippingList.length > 0 ? (
              <div className="contents-box">
                <div className="delivery-info">
                  <div>배송지</div>
                  <div>
                    {shippingData.shippingList.map(
                      (item: ShippingT, index: number) => {
                        return (
                          <label
                            key={item.shipping_id}
                            className="cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="ShippingName"
                              className={
                                item.shipping_default == 1 ? '' : 'ml-5'
                              }
                              value={item.shipping_name}
                              defaultChecked={
                                selectedShippingFromDelivery == item.shipping_id
                                  ? true
                                  : item.shipping_default == 1 &&
                                    selectedShippingFromDelivery == 0
                                  ? true
                                  : false
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
                  <button
                    type="button"
                    title="배송지 변경 버튼"
                    className="btn-delivery-change ml-3"
                    onClick={handleClickChangeShipping}
                  >
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
                      title="배송 요청사항 선택"
                      ref={(el) => {
                        el && selectsRef.current
                          ? (selectsRef.current[0] = el)
                          : null
                      }}
                    >
                      <option value="1">배송 시 요청사항을 선택해주세요</option>
                      <option value="2">부재 시 경비실에 맡겨주세요</option>
                      <option value="3">부재 시 택배함에 넣어주세요</option>
                      <option value="4">부재 시 집 앞에 놔주세요</option>
                      <option value="5">배송 전 연락 바랍니다</option>
                      <option value="6">
                        파손의 위험이 있는 상품이니 배송 시 주의해 주세요
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
                        title="배송 요청사항 세부내용 입력란"
                        onChange={(e) =>
                          common.CommonHandleChangeValue(
                            'maxLength30',
                            e,
                            inputs,
                            setInputs
                          )
                        }
                        ref={(el) => {
                          el && inputsRef.current
                            ? (inputsRef.current[0] = el)
                            : null
                        }}
                      ></input>
                      <i className="leading-7 ml-1">
                        ({inputs.deliveryRequestDirect.length}/30)
                      </i>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <button
                type="button"
                title="배송지 등록 버튼"
                className={`btn-delivery-change ${
                  isShippingButtonBlinking ? 'blinking' : ''
                }`}
                ref={buttonRef}
                onClick={handleClickChangeShipping}
              >
                배송지 등록
              </button>
            )}
          </div>
          <div className="p-3 mt-3">
            <h2 className="text-xl mb-3">상품 정보</h2>
            <div className="contents-box">
              {product && product.data.cartList ? (
                <ul>
                  {product.data.cartList &&
                    product.data.cartList.map(
                      (item: ProductCartT, index: number) => {
                        return selectedOrder.some(
                          (select) => select == item.cart_id
                        ) ? (
                          <li key={item.cart_id}>
                            <ProductInOrder product={item} />
                            {index < product.data.cartList.length - 1 ? (
                              <hr />
                            ) : null}
                          </li>
                        ) : null
                      }
                    )}
                </ul>
              ) : null}
            </div>
            <h2 className="flex justify-end">총 {productToPayCount} 건</h2>
          </div>
          <div className="p-3 mt-3">
            <h2 className="text-xl mb-3">결제 금액</h2>
            <div className="contents-box">
              <div className="flex my-1">
                <div>총 상품금액</div>
                <div className="flex-grow"></div>
                <b>
                  {totalPrice > 0 ? totalPrice.toLocaleString('ko-kr') : 0} 원
                </b>
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
                <Payment
                  price={totalPrice > 0 ? totalPrice + deliveryPrice : 0}
                  submits={submits}
                  enabled={
                    selectedShipping &&
                    shippingData &&
                    shippingData.shippingList.length > 0
                      ? true
                      : false
                  }
                  setIsShippingBlinking={setIsShippingBlinking}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

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
      `}</style>
    </div>
  )
}
Order.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

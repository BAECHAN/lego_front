import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ChangeEvent, useRef, useState, useEffect } from 'react'
import Postcode from './Postcode'
import { DeliverySubmitT, ShippingT } from 'types'
import axiosRequest from 'pages/api/axios'
import { useSession } from 'next-auth/react'
import useDeliveryShippingList from 'pages/api/query/useDeliveryShippingList'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export default function ModalDelivery(props: {
  onClose: any
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  totalPage: number
  listLength: number
  shipping?: ShippingT
}) {
  const { data: session, status } = useSession()

  const queryClient = useQueryClient()

  const [isUpdate, setIsUpdate] = useState(props.shipping ? true : false)
  const [initShippingDefault, setInitShippingDefault] = useState(0)

  const [inputs, setInputs] = useState<DeliverySubmitT>({
    recipient: '',
    shippingName: '',
    telNumberFront: '',
    telNumberMiddle: '',
    telNumberBack: '',
    shippingZipCode: '',
    shippingAddress1: '',
    shippingAddress2: '',
    shippingDefault: false,
    deliveryRequest: '',
    deliveryRequestDirect: '',
  })

  let {
    recipient,
    shippingName,
    telNumberFront,
    telNumberMiddle,
    telNumberBack,
    shippingZipCode,
    shippingAddress1,
    shippingAddress2,
    shippingDefault,
    deliveryRequest,
    deliveryRequestDirect,
  } = inputs

  const inputsRef = useRef<HTMLInputElement[]>([])
  const selectsRef = useRef<HTMLSelectElement[]>([])

  const [disabledSubmit, setDisabledSubmit] = useState(false)

  const [directOpen, setDirectOpen] = useState(false)

  const postButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (inputsRef.current[9] && !deliveryRequestDirect) {
      inputsRef.current[9].focus()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directOpen])

  useEffect(() => {
    if (isUpdate && props.shipping) {
      setInputs({
        ...inputs,
        recipient: props.shipping.recipient,
        shippingName: props.shipping.shipping_name,
        telNumberFront: props.shipping.tel_number.substring(0, 3),
        telNumberMiddle: props.shipping.tel_number.substring(3, 7),
        telNumberBack: props.shipping.tel_number.substring(7, 11),
        shippingZipCode: props.shipping.shipping_zipcode,
        shippingAddress1: props.shipping.shipping_address1,
        shippingAddress2: props.shipping.shipping_address2,
        shippingDefault: props.shipping.shipping_default,
        deliveryRequest: props.shipping.delivery_request,
        deliveryRequestDirect: props.shipping.delivery_request_direct,
      })

      setInitShippingDefault(props.shipping.shipping_default)

      if (props.shipping.delivery_request == '7') {
        setDirectOpen(true)
      } else {
        setDirectOpen(false)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeValue = (
    option: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, checked } = e.currentTarget

    if (option == 'maxLength20') {
      value.length < 21 ? setInputs({ ...inputs, [name]: value }) : null
    } else if (option == 'maxLength30') {
      value.length < 31 ? setInputs({ ...inputs, [name]: value }) : null
    } else if (option == 'number3') {
      value.length < 4
        ? setInputs({ ...inputs, [name]: value.replace(/[^0-9]/g, '') })
        : null
    } else if (option == 'number4') {
      value.length < 5
        ? setInputs({ ...inputs, [name]: value.replace(/[^0-9]/g, '') })
        : null
    } else if (option == 'check') {
      setInputs({ ...inputs, [name]: checked ? true : false })
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setDisabledSubmit(true)
    event.preventDefault()

    if (
      inputsRef &&
      inputsRef.current &&
      status == 'authenticated' &&
      session.user &&
      session.user.email
    ) {
      let param = {
        shippingId:
          props.shipping && props.shipping.shipping_id
            ? props.shipping.shipping_id
            : 0,
        email: session.user.email,
        recipient,
        shippingName,
        telNumberFront,
        telNumberMiddle,
        telNumberBack,
        shippingZipCode,
        shippingAddress1,
        shippingAddress2,
        shippingDefault,
        deliveryRequest,
        deliveryRequestDirect,
      }

      for (let i = 0; i < inputsRef.current.length; i++) {
        if (
          !(
            i == 1 ||
            i == 2 ||
            i == 3 ||
            i == 4 ||
            i == 5 ||
            i == 6 ||
            i == 8 ||
            i == 9
          )
        ) {
          if (inputsRef.current[i].value.trim().length == 0) {
            alert(`${inputsRef.current[i].title}을(를) 입력해주시기 바랍니다.`)
            inputsRef.current[i].focus()
            setDisabledSubmit(false)
            return false
          }
        } else {
          if (i == 1) {
            if (inputsRef.current[i].value.trim().length == 0) {
              param.shippingName = recipient
            }
          } else if (i == 2) {
            if (inputsRef.current[i].value.trimEnd().length != 3) {
              alert(
                `${inputsRef.current[i].title}을(를) 정확히 입력해주시기 바랍니다.`
              )
              inputsRef.current[i].focus()
              setDisabledSubmit(false)
              return false
            }
          } else if (i == 3 || i == 4) {
            if (inputsRef.current[i].value.trimEnd().length != 4) {
              alert(
                `${inputsRef.current[i].title}을(를) 정확히 입력해주시기 바랍니다.`
              )
              inputsRef.current[i].focus()
              setDisabledSubmit(false)
              return false
            }
          } else if (i == 5) {
            if (
              shippingZipCode.trim().length == 0 ||
              shippingAddress1.trim().length == 0
            ) {
              alert('검색 버튼을 클릭하여 주소를 선택해주시기 바랍니다.')
              postButtonRef.current?.click()
              setDisabledSubmit(false)
              return false
            }
          } else if (i == 8) {
            if (props.listLength == 0 && !isUpdate) {
              param.shippingDefault = true
            }
          } else if (i == 9) {
            if (
              deliveryRequest == '7' &&
              deliveryRequestDirect.trim().length == 0
            ) {
              alert(`${inputsRef.current[i].title}을 입력해주시기 바랍니다.`)
              inputsRef.current[i].focus()
              setDisabledSubmit(false)
              return false
            }
          }
        }
      }

      console.log(props.listLength)
      console.log(props.totalPage)

      updateShippingAPI.mutate(param)
    }
  }

  const updateShippingAPI = useMutation(
    async (param: any) => {
      const res = await axios.post(
        `http://localhost:5000/api/manage-shipping`,
        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
      return res
    },
    {
      onSuccess: (response) => {
        if (response?.status === 200) {
          if (isUpdate) {
            alert('배송지를 수정하였습니다.')
          } else {
            alert('배송지를 등록하였습니다.')
            if (props.listLength == 5) {
              if (props.totalPage == props.page) {
                props.setPage(props.totalPage + 1)
              } else {
                props.setPage(props.totalPage)
              }
            }
          }
          setDisabledSubmit(false)
          props.onClose()
          queryClient.invalidateQueries(['shipping-list'])
          return true
        }
      },
      onError: (error) => {
        console.log(error)
        alert(
          `${
            isUpdate ? '배송지 수정' : '배송지 등록'
          } 이 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.`
        )
        setDisabledSubmit(false)
        return false
      },
    }
  )

  return (
    <div className="modal-wrap">
      <div className="modal">
        <div className="flex flex-row-reverse">
          <button
            id="bannerClose"
            className="btn-modal-close"
            onClick={props.onClose}
            title="창 닫기"
          >
            <FontAwesomeIcon icon={faSquareXmark} width="27px" height="27px" />
          </button>
        </div>
        <div className="modal-body">
          <h2 className="text-xl font-bold">
            {isUpdate ? '배송지 수정' : '신규 배송지'}
          </h2>

          <form name="delivery-form" onSubmit={handleSubmit}>
            <div className="text-sm">
              <div className="flex my-5">
                <div className="title">수령인</div>
                <input
                  type="text"
                  name="recipient"
                  className="modal-input medium"
                  onChange={(e) => handleChangeValue('maxLength20', e)}
                  value={inputs.recipient}
                  title="수령인"
                  ref={(el) => {
                    el && inputsRef.current ? (inputsRef.current[0] = el) : null
                  }}
                ></input>
                <i className="leading-7 ml-2">({inputs.recipient.length}/20)</i>
              </div>

              <div className="flex my-5">
                <div className="title">배송지명(선택)</div>
                <input
                  type="text"
                  name="shippingName"
                  className="modal-input medium"
                  onChange={(e) => handleChangeValue('maxLength20', e)}
                  value={inputs.shippingName}
                  title="배송지명(선택)"
                  ref={(el) => {
                    el && inputsRef.current ? (inputsRef.current[1] = el) : null
                  }}
                ></input>
                <i className="leading-7 ml-2">
                  ({inputs.shippingName.length}/20)
                </i>
              </div>

              <div className="flex my-5">
                <div className="title">휴대전화</div>
                <input
                  type="text"
                  name="telNumberFront"
                  className="modal-input x-small mr-2"
                  onChange={(e) => handleChangeValue('number3', e)}
                  value={inputs.telNumberFront}
                  title="휴대폰 번호 앞자리"
                  ref={(el) => {
                    el && inputsRef.current ? (inputsRef.current[2] = el) : null
                  }}
                ></input>
                -
                <input
                  type="text"
                  name="telNumberMiddle"
                  className="modal-input x-small mx-2"
                  onChange={(e) => handleChangeValue('number4', e)}
                  value={inputs.telNumberMiddle}
                  title="휴대폰 번호 가운데자리"
                  ref={(el) => {
                    el && inputsRef.current ? (inputsRef.current[3] = el) : null
                  }}
                ></input>
                -
                <input
                  type="text"
                  name="telNumberBack"
                  className="modal-input x-small ml-2"
                  onChange={(e) => handleChangeValue('number4', e)}
                  value={inputs.telNumberBack}
                  title="휴대폰 번호 뒷자리"
                  ref={(el) => {
                    el && inputsRef.current ? (inputsRef.current[4] = el) : null
                  }}
                ></input>
              </div>

              <div className="flex my-5">
                <div className="title">배송지 주소</div>
                <input
                  type="text"
                  name="shippingZipCode"
                  className="modal-input small bg-gray-200"
                  readOnly={true}
                  value={inputs.shippingZipCode}
                  title="배송지 우편번호"
                  ref={(el) => {
                    el && inputsRef.current ? (inputsRef.current[5] = el) : null
                  }}
                ></input>
                <Postcode
                  inputs={inputs}
                  setInputs={setInputs}
                  postButtonRef={postButtonRef}
                />
              </div>

              <div className="flex my-5">
                <div className="title"></div>
                <input
                  type="text"
                  name="shippingAddress1"
                  className="modal-input large bg-gray-200"
                  readOnly={true}
                  title="배송지 주소"
                  value={inputs.shippingAddress1}
                  ref={(el) => {
                    el && inputsRef.current ? (inputsRef.current[6] = el) : null
                  }}
                ></input>
              </div>

              <div className="flex my-5">
                <div className="title"></div>
                <input
                  type="text"
                  name="shippingAddress2"
                  className="modal-input large"
                  value={inputs.shippingAddress2}
                  title="배송지 상세주소"
                  onChange={(e) => handleChangeValue('maxLength30', e)}
                  ref={(el) => {
                    el && inputsRef.current ? (inputsRef.current[7] = el) : null
                  }}
                ></input>
                <i className="leading-7 ml-2">
                  ({inputs.shippingAddress2.length}/30)
                </i>
              </div>

              <div className="flex my-5">
                <div className="title"></div>
                <label className="text-sm font-medium select-none flex items-center">
                  <input
                    type="checkbox"
                    name="shippingDefault"
                    className="modal-input w-4 mr-2"
                    title="기본 배송지 설정 유무"
                    onChange={(e) => handleChangeValue('check', e)}
                    checked={inputs.shippingDefault ? true : false}
                    disabled={
                      isUpdate && initShippingDefault != 0 ? true : false
                    }
                    ref={(el) => {
                      el && inputsRef.current
                        ? (inputsRef.current[8] = el)
                        : null
                    }}
                  ></input>{' '}
                  기본 배송지 설정
                </label>
              </div>

              <div className="flex my-5">
                <div className="title">배송 요청사항(선택)</div>
                <select
                  className="modal-input large"
                  name="deliveryRequest"
                  onChange={handleChangeSelect}
                  value={inputs.deliveryRequest}
                  title="배송 요청사항"
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
                    파손의 위험이 있는 상품입니다. 배송 시 주의해 주세요
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
                    className="modal-input large"
                    value={inputs.deliveryRequestDirect}
                    title="배송 요청사항 세부내용"
                    onChange={(e) => handleChangeValue('maxLength30', e)}
                    ref={(el) => {
                      el && inputsRef.current
                        ? (inputsRef.current[9] = el)
                        : null
                    }}
                  ></input>
                  <i className="leading-7 ml-2">
                    ({inputs.deliveryRequestDirect.length}/30)
                  </i>
                </div>
              ) : null}
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                className="btn-cancle mx-1"
                onClick={props.onClose}
              >
                취소
              </button>
              <button
                type="submit"
                className="btn-submit mx-1"
                disabled={disabledSubmit}
              >
                {isUpdate ? '저장' : '등록'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .modal-input {
          border: 1px solid #e5e5e5;
          height: 30px;
          padding: 0px 5px;

          &.x-small {
            width: 13%;
          }

          &.small {
            width: 30%;
          }
          &.medium {
            width: 50%;
          }

          &.large {
            width: 63%;
          }
        }

        .title {
          display: flex;
          align-items: center;
          width: 29%;
          height: 30px;
        }

        .modal-body {
          padding: 0px 27px;

          button {
            &.btn-cancle {
              background-color: rgb(128, 128, 128, 0.7);
              width: 100px;
              height: 40px;
              color: black;

              :hover {
                background-color: rgb(128, 128, 128, 1);
              }
            }

            &.btn-submit {
              background-color: rgb(0, 0, 0, 0.7);
              width: 100px;
              height: 40px;
              color: white;

              :hover {
                background-color: rgb(0, 0, 0, 1);
              }
            }

            &.btn-search {
              background-color: rgb(0, 0, 0, 0.7);
              width: 50px;
              height: 30px;
              color: white;

              :hover {
                background-color: rgb(0, 0, 0, 1);
              }
            }
          }
        }

        .modal-wrap {
          background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
          position: fixed; /* Stay in place */
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
        }

        .modal {
          width: 675px;
          height: 640px;
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fff;
        }

        .btn-modal-close {
          color: #444;
          :hover {
            color: #000;
          }
        }
      `}</style>
    </div>
  )
}

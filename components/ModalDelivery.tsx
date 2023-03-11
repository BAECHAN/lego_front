import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ChangeEvent, useRef, useState, useEffect } from 'react'

export default function ModalDelivery({ onClose }: any) {
  const [inputs, setInputs] = useState({
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

  const [directOpen, setDirectOpen] = useState(false)

  const directInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (directInputRef && directInputRef.current) {
      directInputRef.current.focus()
    }
  }, [directOpen])

  const handleChangeValue = (
    option: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, checked } = e.currentTarget

    console.log(value)

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

    setInputs({ ...inputs, [name]: value })
    if (value == '7') {
      setDirectOpen(true)
    } else {
      setDirectOpen(false)
      setInputs({ ...inputs, deliveryRequestDirect: '' })
    }
  }

  const handleClickSubmit = () => {}

  return (
    <div className="modal-wrap">
      <div className="modal">
        <div className="flex flex-row-reverse">
          <button
            id="bannerClose"
            className="btn-modal-close"
            onClick={onClose}
            title="창 닫기"
          >
            <FontAwesomeIcon icon={faSquareXmark} width="27px" height="27px" />
          </button>
        </div>
        <div className="modal-body">
          <h2 className="text-xl font-bold">신규 배송지</h2>

          <form name="delivery-form">
            <div className="text-sm">
              <div className="flex my-5">
                <div className="title">수령인</div>
                <input
                  type="text"
                  name="recipient"
                  className="modal-input medium"
                  onChange={(e) => handleChangeValue('maxLength20', e)}
                  value={inputs.recipient}
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
                ></input>
                -
                <input
                  type="text"
                  name="telNumberMiddle"
                  className="modal-input x-small mx-2"
                  onChange={(e) => handleChangeValue('number4', e)}
                  value={inputs.telNumberMiddle}
                ></input>
                -
                <input
                  type="text"
                  name="telNumberBack"
                  className="modal-input x-small ml-2"
                  onChange={(e) => handleChangeValue('number4', e)}
                  value={inputs.telNumberBack}
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
                ></input>
                <button type="button" className="btn-search ml-2">
                  검색
                </button>
              </div>

              <div className="flex my-5">
                <div className="title"></div>
                <input
                  type="text"
                  name="shippingAddress1"
                  className="modal-input large bg-gray-200"
                  readOnly={true}
                  value={inputs.shippingAddress1}
                ></input>
              </div>

              <div className="flex my-5">
                <div className="title"></div>
                <input
                  type="text"
                  name="shippingAddress2"
                  className="modal-input large"
                  value={inputs.shippingAddress2}
                  onChange={(e) => handleChangeValue('maxLength30', e)}
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
                    onChange={(e) => handleChangeValue('check', e)}
                    defaultChecked={inputs.shippingDefault ? true : false}
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
                    onChange={(e) => handleChangeValue('maxLength30', e)}
                    ref={directInputRef}
                  ></input>
                  <i className="leading-7 ml-2">
                    ({inputs.deliveryRequestDirect.length}/30)
                  </i>
                </div>
              ) : null}
            </div>
          </form>

          <div className="flex justify-center">
            <button type="button" className="btn-cancle mx-1" onClick={onClose}>
              취소
            </button>
            <button
              type="button"
              className="btn-submit mx-1"
              onClick={handleClickSubmit}
            >
              등록
            </button>
          </div>
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

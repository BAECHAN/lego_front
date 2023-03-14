import React from 'react'
import { useDaumPostcodePopup } from 'react-daum-postcode'
import { DeliverySubmitT } from 'types'

export default function Postcode(props: {
  inputs: DeliverySubmitT
  setInputs: React.Dispatch<React.SetStateAction<DeliverySubmitT>>
  postButtonRef: React.RefObject<HTMLButtonElement>
}) {
  const open = useDaumPostcodePopup()

  const handleComplete = (data: any) => {
    let fullAddress = data.address
    let extraAddress = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }

    props.setInputs({
      ...props.inputs,
      shippingZipCode: data.zonecode,
      shippingAddress1: fullAddress,
    })

    //console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  }

  const handleClick = () => {
    open({ onComplete: handleComplete })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="btn-search ml-2"
      ref={props.postButtonRef}
    >
      검색
      <style jsx>{`
        .btn-search {
          background-color: rgb(0, 0, 0, 0.7);
          width: 50px;
          height: 30px;
          color: white;

          :hover {
            background-color: rgb(0, 0, 0, 1);
          }
        }
      `}</style>
    </button>
  )
}

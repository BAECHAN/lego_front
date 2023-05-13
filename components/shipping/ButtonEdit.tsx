import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { ShippingT } from 'types'

export default function ButtonEdit(props: {
  shipping: ShippingT
  onOpen: (
    event: React.MouseEvent<HTMLButtonElement>,
    shipping?: ShippingT
  ) => void
}) {
  const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.onOpen(event, props.shipping)
  }

  return (
    <button
      type="button"
      title="배송지 수정"
      className="btn-update-shipping"
      onClick={handleClickButton}
    >
      수정
      <FontAwesomeIcon
        icon={faPenSquare}
        width="23px"
        height="23px"
        style={{ marginLeft: '3px' }}
      />
      <style jsx>{`
        button.btn-update-shipping {
          display: flex;
          align-items: center;
          height: 32px;
          line-height: 20px;
          margin: 8px;

          background-color: gray;
          color: #fff;
          padding: 5px 10px;
          border-radius: 4px;
          :hover {
            background-color: #000;
          }
        }
      `}</style>
    </button>
  )
}

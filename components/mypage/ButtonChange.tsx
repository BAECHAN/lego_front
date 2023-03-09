import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'

export default function ButtonChange(props: {
  infoKey: string
  isChange: boolean
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const handleClickButton = () => {
    props.setIsChange(!props.isChange)
  }

  return (
    <button
      type="button"
      className="flex h-8 leading-5"
      onClick={handleClickButton}
    >
      {props.infoKey}&nbsp;변경하기
      <FontAwesomeIcon
        icon={faPenSquare}
        width="23px"
        height="23px"
        style={{ marginLeft: '3px' }}
      />
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
    </button>
  )
}

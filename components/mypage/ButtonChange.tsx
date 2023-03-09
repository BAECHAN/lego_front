import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

export default function ButtonChange(props: {
  infoKey: string
  infoName: string
  isChange: boolean
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter()

  const handleClickButton = () => {
    if (props.infoKey == 'password') {
      router.push('/account/check_password')
    } else {
      props.setIsChange(!props.isChange)
    }
  }

  return (
    <button
      type="button"
      className="flex h-8 leading-5"
      onClick={handleClickButton}
    >
      {props.infoName}&nbsp;변경하기
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

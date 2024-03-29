import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useRecoilState } from 'recoil'
import { passwordEyeSelector } from 'state/atoms'

export default function FontAwesomeEye() {
  const [passwordType, setPasswordType] = useRecoilState(passwordEyeSelector)

  return (
    <FontAwesomeIcon
      icon={passwordType === 'password' ? faEye : faEyeSlash}
      onClick={() => (passwordType === 'password' ? setPasswordType('text') : setPasswordType('password'))}
      cursor="pointer"
      className="w-5 absolute right-2 top-[42px] -translate-y-1/2"
    ></FontAwesomeIcon>
  )
}

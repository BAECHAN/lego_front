import React, { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRecoilState } from 'recoil'
import { passwordEyeSelector } from 'state/atoms'

export default function FontAwesomeEye() {
  const [passwordType, setPasswordType] = useRecoilState(passwordEyeSelector)

  return (
    <FontAwesomeIcon
      icon={passwordType === 'password' ? faEye : faEyeSlash}
      title={
        passwordType === 'password'
          ? '패스워드 보기 버튼'
          : '패스워드 숨김 버튼'
      }
      onClick={() =>
        passwordType === 'password'
          ? setPasswordType('text')
          : setPasswordType('password')
      }
      cursor="pointer"
      className="w-5 relative ml-[304px] -mt-[26px]"
    ></FontAwesomeIcon>
  )
}

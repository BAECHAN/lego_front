import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilState } from 'recoil'
import { findAccountSelector } from 'state/atoms'
import { FindAccountT } from 'types'

export default function ButtonFindAccount(props: { type: FindAccountT }) {
  const router = useRouter()

  const [findAccountType, setFindAccountType] =
    useRecoilState(findAccountSelector)

  const handleClickFindButton = (type: FindAccountT) => {
    setFindAccountType(type)
    router.push('/login/find')
  }

  return (
    <button
      type="button"
      onClick={() => handleClickFindButton(props.type)}
      className="hover:underline mr-3"
    >
      {props.type === 'email' ? '계정' : '비밀번호'} 찾기
    </button>
  )
}

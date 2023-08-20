import Link from 'next/link'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { findAccountSelector } from 'state/atoms'
import { FindAccountT } from 'types'

export default function ButtonFindAccount(props: { type: FindAccountT }) {
  const setFindAccountType = useSetRecoilState(findAccountSelector)

  const handleClickFindButton = (type: FindAccountT) => {
    setFindAccountType(type)
  }

  return (
    <Link href="/login/find" passHref>
      <a onClick={() => handleClickFindButton(props.type)} className="hover:underline mr-3">
        {props.type === 'email' ? '계정' : '비밀번호'} 찾기
      </a>
    </Link>
  )
}

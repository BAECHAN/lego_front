import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function ButtonFindAccountToggle() {
  const router = useRouter()
  const [isActiveId, setIsActiveId] = useState(
    router.pathname.substring(7) == 'find_account' ? true : false
  )

  const handleClickToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.className.indexOf('active') > -1) {
      return false
    }
    event.currentTarget.id == 'findIdBtn'
      ? router.push('/login/find_account')
      : router.push('/login/find_password')
  }

  return (
    <div className="flex w-full">
      <button
        type="button"
        id="findIdBtn"
        title="아이디 찾기 페이지로 전환"
        onClick={(event) => handleClickToggle(event)}
        className={`btn-find-toggle ${isActiveId ? 'active' : ''}`}
      >
        아이디 찾기
      </button>
      <button
        type="button"
        id="findPwBtn"
        title="비밀번호 찾기 페이지로 전환"
        onClick={(event) => handleClickToggle(event)}
        className={`btn-find-toggle ${!isActiveId ? 'active' : ''}`}
      >
        비밀번호 찾기
      </button>

      <style jsx>{`
        .btn-find-toggle {
          background-color: #d5f3fe;
          width: 50%;
          font-size: 25px;
          :hover:not(.open) {
            background-color: #000;
            color: #fff;
          }
        }

        .active {
          background-color: #66d3fa;
          color: #000;
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}

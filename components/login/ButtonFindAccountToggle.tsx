import React from 'react'
import { useRecoilState } from 'recoil'
import { findAccountSelector } from 'state/atoms'

export default function ButtonFindAccountToggle(props: { isLoading: boolean }) {
  const [findAccountType, setFindAccountType] = useRecoilState(findAccountSelector)

  const handleClickToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.className.includes('active') || props.isLoading) {
      return false
    }

    event.currentTarget.id === 'findIdBtn' ? setFindAccountType('email') : setFindAccountType('password')
  }

  return (
    <div className="btn-find-group">
      <button type="button" id="findIdBtn" title="아이디 찾기 페이지로 전환" onClick={(event) => handleClickToggle(event)} className={`btn-find-toggle ${findAccountType === 'email' ? 'active' : ''}`}>
        아이디 찾기
      </button>
      <button
        type="button"
        id="findPwBtn"
        title="비밀번호 찾기 페이지로 전환"
        onClick={(event) => handleClickToggle(event)}
        className={`btn-find-toggle ${findAccountType === 'password' ? 'active' : ''}`}
      >
        비밀번호 찾기
      </button>

      <style jsx>{`
        .btn-find-group {
          display: flex;
          width: 100%;
        }

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

import React, { MouseEvent } from 'react'

export default function PageNumber(props: {
  page: number
  handleClickPageButton: (event: MouseEvent<HTMLButtonElement>) => void
  isActive: boolean
}) {
  return (
    <button
      type="button"
      title={`${props.page} 페이지로 이동`}
      className={`${props.isActive ? 'active' : ''}`}
      onClick={props.handleClickPageButton}
    >
      {props.page}

      <style jsx>{`
        button {
          width: 40px;
          height: 40px;
          margin: 0px 10px;
          font-size: 15px;

          &.active {
            background-color: rgb(128, 128, 128, 0.5);
            border-radius: 100%;
          }

          &:not(.active):hover {
            background-color: rgb(128, 128, 128, 0.3);
            border-radius: 100%;
          }
        }
      `}</style>
    </button>
  )
}

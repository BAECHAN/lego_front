import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

type BtnCloseType = {
  purpose?: string
  title?: string
}

export default function ButtonClose(prop: BtnCloseType) {
  function parentElmtClose(e: React.SyntheticEvent) {
    if (e.currentTarget.parentElement?.innerHTML != undefined) {
      e.currentTarget.parentElement.className += ' none'
      if (prop.purpose === 'bannerClose') {
      }
    }
  }

  return (
    <>
      <span
        className="btn-close"
        onClick={(event) => {
          parentElmtClose(event)
        }}
        title={prop.title}
      >
        <FontAwesomeIcon icon={faSquareXmark} width="25px" height="25px" />
      </span>
      <style jsx>{`
        .btn-close {
          margin: 0 20px 0 -20px;
          color: grey;
        }
        .btn-close:hover {
          cursor: pointer;
          color: black;
        }
      `}</style>
    </>
  )
}

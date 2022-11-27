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
      <button
        className="mr-5 -ml-5 text-gray-500 hover:cursor-pointer hover:text-black"
        onClick={(event) => {
          parentElmtClose(event)
        }}
        title={prop.title}
      >
        <FontAwesomeIcon icon={faSquareXmark} width="25px" height="25px" />
      </button>
      <style jsx>{``}</style>
    </>
  )
}

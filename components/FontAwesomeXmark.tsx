import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function FontAwesomeXmark() {
  return (
    <FontAwesomeIcon
      icon={faXmark}
      width="10px"
      style={{
        display: 'inline',
        position: 'relative',
        top: '-2px',
        left: '6px',
      }}
    />
  )
}

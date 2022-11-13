import React from 'react'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FontAwesomeAsterisk() {
  return (
    <FontAwesomeIcon
      icon={faAsterisk}
      width="5px"
      style={{
        position: 'relative',
        top: '-8px',
        color: 'red',
        marginLeft: '3px',
        display: 'inline',
      }}
    />
  )
}

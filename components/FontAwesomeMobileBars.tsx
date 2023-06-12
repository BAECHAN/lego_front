import React from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FontAwesomeMobileBars(props: { isOpenBars: boolean }) {
  return (
    <FontAwesomeIcon
      icon={faBars}
      style={{
        color: props.isOpenBars ? 'gray' : 'black',
        width: '40px',
      }}
    />
  )
}

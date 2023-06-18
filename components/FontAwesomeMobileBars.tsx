import React from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRecoilValue } from 'recoil'
import { isOpenMobileSidebarSelector } from 'state/atoms'

export default function FontAwesomeMobileBars() {
  const isOpenBars = useRecoilValue(isOpenMobileSidebarSelector)

  return (
    <FontAwesomeIcon
      icon={faBars}
      style={{
        color: isOpenBars ? 'gray' : 'black',
        width: '40px',
      }}
    />
  )
}

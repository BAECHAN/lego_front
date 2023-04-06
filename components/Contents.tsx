import React from 'react'
import { ChildrenT } from 'types'

export default function Contents({ propChildren }: ChildrenT) {
  return <div className="relative">{propChildren}</div>
}

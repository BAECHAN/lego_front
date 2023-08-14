import { ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

type Portal = {
  children: ReactNode
  selector: string
}

export default function Portal({ children, selector }: Portal) {
  const [element, setElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setElement(document.querySelector(selector) as HTMLElement)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return element && children ? ReactDOM.createPortal(children, element) : null
}

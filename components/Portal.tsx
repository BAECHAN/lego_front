import ReactDOM from 'react-dom'
import { ReactNode } from 'react'

type Portal = {
  children: ReactNode
  selector: string
}

export default function Portal({ children, selector }: Portal) {
  const element =
    typeof window !== 'undefined' && document.querySelector(selector)

  return element && children ? ReactDOM.createPortal(children, element) : null
}

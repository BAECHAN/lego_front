import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export default function useIsMobile(): boolean {
  const isMobile_ = useMediaQuery({ query: '(max-width: 768px)' })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(isMobile_)
  }, [isMobile_])

  return isMobile
}

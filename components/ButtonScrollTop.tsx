import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

export default function ButtonScrollTop() {
  let [isShow, setIsShow] = useState(false)

  useEffect(() => {
    window.onscroll = () => {
      document.body.scrollTop > 400 || document.documentElement.scrollTop > 400 ? setIsShow(true) : setIsShow(false)
    }
  }, [])

  return (
    <div>
      {isShow && (
        <FontAwesomeIcon
          icon={faChevronCircleUp}
          onClick={() => {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
          }}
          className="fixed bottom-5 right-5 h-8 cursor-pointer"
          title="스크롤 최상단으로 이동"
        />
      )}
    </div>
  )
}

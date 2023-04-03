import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

export default function ButtonScrollTop() {
  let [display, setDisplay] = useState(false)

  useEffect(() => {
    window.onscroll = () => {
      document.body.scrollTop > 400 || document.documentElement.scrollTop > 400
        ? setDisplay(true)
        : setDisplay(false)
    }
  }, [])

  return (
    <>
      {display ? (
        <FontAwesomeIcon
          icon={faChevronCircleUp}
          onClick={() => {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
          }}
          className="fixed bottom-5 right-5 h-8 cursor-pointer"
          title="스크롤 최상단으로 이동"
        />
      ) : null}
      <style jsx>{`
        // TODO: scroll animation 추가
      `}</style>
    </>
  )
}

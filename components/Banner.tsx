import Link from 'next/link'
import FontAwesomeAngleRight from './FontAwesomeAngleRight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

export default function Banner() {
  const [cookies, setCookie] = useCookies(['lego-cookie'])
  const [isClose, setIsClose] = useState(false)

  useEffect(() => {
    cookies['lego-cookie'] ? setIsClose(true) : setIsClose(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickClose = () => {
    setIsClose(!isClose)

    let expiredDate = new Date()
    expiredDate.setDate(expiredDate.getDate() + 1)
    setCookie('lego-cookie', 'banner', {
      path: '/',
      expires: expiredDate,
      sameSite: 'strict' /** httpOnly: true */,
    })
  }

  const [thisMonth, setThisMonth] = useState<number>()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setThisMonth(new Date().getMonth())
    }
  }, [])

  return (
    <div>
      {!isClose ? (
        <div className="banner">
          <span style={{ flexGrow: 1 }}></span>
          <p title="배너 제목" className="mx-2 my-3">
            {thisMonth && thisMonth + 1}월 신제품 출시!
          </p>
          <Link href="/themes">
            <a title="상품 보러가기 링크" className="hover:text-blue-600">
              보러가기
              <FontAwesomeAngleRight />
            </a>
          </Link>
          <span style={{ flexGrow: 1 }}></span>
          <button
            id="bannerClose"
            className="mr-5 -ml-5 text-gray-500 hover:cursor-pointer hover:text-black"
            onClick={handleClickClose}
            title="오늘 하루 보지 않기"
          >
            <FontAwesomeIcon icon={faSquareXmark} width="25px" height="25px" />
          </button>
          <style jsx>{`
            .banner {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 70px;
              background-color: #fef7da;
              color: #444;
              font-size: 20px;
              font-weight: 700;
              text-decoration: line;
            }
          `}</style>
        </div>
      ) : null}
    </div>
  )
}

import Link from 'next/link'
import ButtonClose from './ButtonClose'
import FontAwesomeAngleRight from './FontAwesomeAngleRight'

export default function Banner() {
  return (
    <div className="banner">
      <span style={{ flexGrow: 1 }}></span>
      <p className="mx-2 my-3">11월 신제품 출시!</p>
      <Link href="/">
        <a className="hover:text-blue-600">
          보러가기
          <FontAwesomeAngleRight />
        </a>
      </Link>
      <span style={{ flexGrow: 1 }}></span>
      <ButtonClose purpose="bannerClose" title="오늘 하루 보지 않기" />

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
  )
}

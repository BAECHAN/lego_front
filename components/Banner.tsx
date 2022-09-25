import Link from "next/link";
import ButtonClose from "./ButtonClose";
import FontAwesomeAngleRight from "./FontAwesomeAngleRight";

export default function Banner() {

  return(
    <div className="banner">
      <span style={{flexGrow:1}}></span>
      <p>11월 신제품 출시!</p>
      <Link href="/">
        <a>
          보러가기
          <FontAwesomeAngleRight />        
        </a>
      </Link>
      <span style={{flexGrow:1}}></span>
      <ButtonClose />

      <style jsx>{`
        .banner{
          display:flex;
          justify-content: center;
          align-items: center;
          width:100%;
          height:70px;
          background-color:#fef7da;
          color:#444;
          font-size:20px;
          font-weight:700;
          text-decoration:line;
        }
        a:hover{
          color: #0084e0;
        }
        p{
          margin: 0px 10px;
        }
      `}</style>
    </div>
  )
}

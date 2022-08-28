import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return(
    <nav>
      <Link href="/">
        <a>
          <Image src="/main.svg" width="50px" height="50px" alt="메인으로" />
        </a>
      </Link>
      <Link href="/shop">
        <a>Shop</a>
      </Link>
      
      <style jsx>{`
        nav{
          display:flex;
          align-content: center;    

          align-items: center;
          padding: 10px;
          font-size:20px;
          background-color: rgb(255, 207, 0);
        }
        a{
          margin: 0px 10px;
          line-height:15px;
        }
        a:hover{
          font-weight:700;
        }
        
      `}</style>
    </nav>
    
  )
}
import Link from 'next/link'

export default function SidebarMyPage() {
  return (
    <aside className="filter mx-5 h-full w-60">
      <p className="font-semibold text-2xl mt-5">나의 쇼핑 활동</p>
      <ul>
        <li>
          <Link href="/mypage/orders">
            <a>주문 내역 조회</a>
          </Link>
        </li>
        <li>
          <Link href="/mypage/cart">
            <a>장바구니</a>
          </Link>
        </li>
        <li>
          <Link href="/mypage/user_info">
            <a>회원 정보</a>
          </Link>
        </li>
        <li>
          <Link href="/mypage/coupon">
            <a>쿠폰 조회</a>
          </Link>
        </li>
        <li>
          <Link href="/mypage/viewed_products">
            <a>최근 본 상품</a>
          </Link>
        </li>
        <li>
          <Link href="/mypage/wish_list">
            <a>좋아요</a>
          </Link>
        </li>
      </ul>

      <style jsx>{`
        aside > ul {
          margin: 20px 0px;

          > li {
            font-size: 20px;
            margin: 20px 0px;
            :hover {
              font-weight: 700;
            }
          }
        }
      `}</style>
    </aside>
  )
}

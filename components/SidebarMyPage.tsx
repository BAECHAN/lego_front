import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { mypageListSelector } from 'state/atoms'

export default function SidebarMyPage() {
  const router = useRouter()
  const mypageList = useRecoilValue(mypageListSelector)

  return (
    <aside className="filter mx-5 h-full w-60">
      <p className="font-semibold text-2xl mt-5">나의 쇼핑 활동</p>
      <ul>
        {Object.keys(mypageList).map((key) => {
          return (
            <li key={key}>
              <Link href={`/mypage/${key}`}>
                <a
                  className={`${
                    router.pathname.substring(8) == key ? 'font-semibold' : ''
                  }`}
                >
                  {mypageList[key]}
                </a>
              </Link>
            </li>
          )
        })}
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

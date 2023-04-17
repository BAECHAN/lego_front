import { useEffect } from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'

export default function Home() {
  // useEffect(() => {
  //   alert(
  //     '해당 페이지는 포트폴리오 제출용 사이트로 상업적 목적을 띄지 않습니다.'
  //   )
  // }, [])

  return (
    <div className="min-h-[602px] m-10">
      <div className="flex justify-center">
        <div className="home-image">
          <Image
            src="/lego_main.jpeg"
            alt="레고 홈 화면 이미지"
            layout="fill"
          />
        </div>
      </div>
      <div className="flex justify-center text-2xl mt-3">
        <h2>
          * 주의! 해당 사이트는 포트폴리오 제출용 사이트로 상업적 목적을 띄지
          않습니다.
        </h2>
      </div>
      <style jsx>{`
        .home-image {
          position: relative;
          overflow: hidden;
          width: 1600px;
          height: 500px;
        }

        @media (max-width: 1600px) {
          .home-image {
            width: 1400px;
          }
        }
      `}</style>
    </div>
  )
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

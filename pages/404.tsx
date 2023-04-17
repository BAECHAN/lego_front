import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import EmptyLayout from '../components/EmptyLayout'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="contents">
      <Image src="/404.png" width="500px" height="500px" alt="404-lego"></Image>
      <div className="guide">
        <strong>404 Not Found</strong>
        <p>Sorry, that page can`t be found</p>
        <button
          className="btn-common"
          title="홈페이지로 이동 버튼"
          onClick={() => router.push(`/`)}
        >
          <span>
            Go to Homepage
            <FontAwesomeIcon
              icon={faAngleRight}
              width="15px"
              height="15px"
              style={{
                position: 'relative',
                marginLeft: '5px',
                display: 'inline',
              }}
            ></FontAwesomeIcon>
          </span>
        </button>
      </div>

      <style jsx>{`
        .guide {
          margin-left: 50px;
          text-align: center;
        }
        .guide strong {
          font-size: 60px;
        }
        .guide p {
          font-size: 25px;
        }

        .contents {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

NotFound.getLayout = function getLayout(page: React.ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>
}

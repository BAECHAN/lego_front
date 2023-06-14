import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'

export default function ButtonBack() {
  const router = useRouter()

  return (
    <button
      type="button"
      title="돌아가기 버튼"
      className="m-3"
      onClick={() => router.back()}
    >
      <FontAwesomeIcon
        icon={faArrowLeft}
        width="18px"
        height="18px"
        style={{ marginLeft: '3px' }}
      />
    </button>
  )
}

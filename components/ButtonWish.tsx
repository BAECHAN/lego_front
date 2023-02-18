import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ProductT } from 'types'

export default function ButtonWish(props: {
  product: ProductT
  text: boolean
}) {
  let [wish, setWish] = useState(false)
  const { data: session } = useSession()

  const router = useRouter()

  const handleClickLike = () => {
    if (session) {
      setWish(!wish)

      if (wish) {
        // wish 등록 - 만약 wish 이력 있으면 put 처리 , wish 이력 없으면 post 처리
      } else {
        // wish 취소 - wish 이력 있을거니까 put 처리
      }
      console.log(props.product)
    } else {
      signIn()
    }
  }

  return (
    <button
      type="button"
      className="flex justify-start cursor-pointer"
      onClick={handleClickLike}
    >
      {wish === false ? (
        <FontAwesomeIcon icon={faHeart} className="ml-5 w-4 text-blue-700" />
      ) : (
        <FontAwesomeIcon
          icon={faHeartSolid}
          className="ml-5 w-4 text-blue-700"
        />
      )}
      {props.text ? (
        <span className="text-xs ml-3 leading-4">
          {router.pathname.substring(8) == 'wish_list'
            ? '좋아요'
            : '관심목록에 추가'}
        </span>
      ) : null}
    </button>
  )
}

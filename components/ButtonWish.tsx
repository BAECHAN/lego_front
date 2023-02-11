import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function ButtonWish(props: { text: boolean }) {
  let [wish, setWish] = useState(false)

  const handleClickLike = () => {
    setWish(!wish)
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
        <span className="text-xs ml-3 leading-4">관심목록에 추가</span>
      ) : null}
    </button>
  )
}

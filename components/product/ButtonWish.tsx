import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useProductWishList from 'pages/api/query/useProductWishList'
import HandleClickLike from '@components/common/action/handleClickLike'
import { useSession } from 'next-auth/react'

export default function ButtonWish(props: {
  product_id: number
  text: boolean
}) {
  const { data: session } = useSession()
  const router = useRouter()

  const [wishInfo, setWishInfo] = useState({
    product_id: props.product_id,
    wish: false,
  })

  const { data: product, isFetched } = useProductWishList()

  useEffect(() => {
    if (isFetched) {
      if (product && product.data.wishList.length > 0) {
        for (let wish of product.data.wishList) {
          wish.product_id == wishInfo.product_id &&
            setWishInfo({
              ...wishInfo,
              wish: true,
            })
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const { handleClickLike } = HandleClickLike(wishInfo, setWishInfo, session)

  return (
    <button
      type="button"
      title="좋아요 버튼"
      className="flex justify-start cursor-pointer"
      onClick={handleClickLike}
    >
      {wishInfo?.wish ? (
        <FontAwesomeIcon
          icon={faHeartSolid}
          className="ml-5 w-4 text-blue-700"
        />
      ) : (
        <FontAwesomeIcon icon={faHeart} className="ml-5 w-4 text-blue-700" />
      )}

      {props.text && (
        <span className="text-xs ml-3 leading-4">
          {router.pathname.substring(8) == 'wish_list'
            ? '좋아요'
            : '관심목록에 추가'}
        </span>
      )}
    </button>
  )
}

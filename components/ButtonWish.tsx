import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ProductByUserSubmitT, ProductByUserT, ProductT } from 'types'
import axios from 'axios'
import useProductByUser from 'pages/api/query/useProductByUser'
import { useMutation } from '@tanstack/react-query'

export default function ButtonWish(props: {
  product?: ProductT
  text: boolean
}) {
  const [wishInfo, setWishInfo] = useState<ProductByUserT>({
    product_id: 0,
    wish: false,
  })

  const { data: session } = useSession()

  const router = useRouter()

  const { data: productByUser } = useProductByUser(props.product)

  useEffect(() => {
    if (productByUser != undefined) {
      setWishInfo(productByUser)
    }
  }, [productByUser])

  const updateWishAPI = useMutation(
    async (param: ProductByUserSubmitT) => {
      const res = await axios.post(
        'http://localhost:5000/api/add-wish',
        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
      return res.data
    },
    {
      onSuccess: (data) => {
        console.log(data)
        setWishInfo({
          product_id: data.product_id,
          wish: data.wish,
        })
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )

  const handleClickLike = () => {
    if (session) {
      let param: ProductByUserSubmitT = {
        email: session.user?.email,
        product_id: props.product?.product_id,
      }

      if (!productByUser?.wish) {
        // wish 등록 - 만약 wish 이력 있으면 patch 처리 , wish 이력 없으면 post 처리
        updateWishAPI.mutate(param)
      } else {
        // wish 취소 - wish 이력 있을거니까 patch 처리
        axios
          .patch('http://localhost:5000/api/del-wish', JSON.stringify(param), {
            headers: { 'Content-Type': `application/json; charset=utf-8` },
          })
          .then((response) => console.log(response))
          .catch((error) => console.log(error))
      }
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
      {wishInfo?.wish == true ? (
        <FontAwesomeIcon
          icon={faHeartSolid}
          className="ml-5 w-4 text-blue-700"
        />
      ) : (
        <FontAwesomeIcon icon={faHeart} className="ml-5 w-4 text-blue-700" />
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

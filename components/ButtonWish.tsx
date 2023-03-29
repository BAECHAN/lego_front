import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ProductWishSubmitT } from 'types'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import useProductWishList from 'pages/api/query/useProductWishList'

export default function ButtonWish(props: {
  product_id: number
  text: boolean
}) {
  const [wishInfo, setWishInfo] = useState({
    product_id: props.product_id,
    wish: false,
  })

  const { data: session } = useSession()

  const router = useRouter()

  const { data, isFetched } = useProductWishList()

  useEffect(() => {
    if (isFetched) {
      if (data.wishList.length > 0) {
        for (let wish of data.wishList) {
          wish.product_id == wishInfo.product_id
            ? setWishInfo({
                ...wishInfo,
                wish: true,
              })
            : null
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isFetched])

  const addWishAPI = useMutation(
    async (param: ProductWishSubmitT) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/add-wish`,
        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
      return res.data
    },
    {
      onMutate: () => {
        setWishInfo({
          ...wishInfo,
          wish: !wishInfo.wish,
        })

        return () => {
          setWishInfo({
            ...wishInfo,
            wish: !wishInfo.wish,
          })
        }
      },
      onSuccess: (data) => {
        // setWishInfo({
        //   product_id: data.product_id,
        //   wish: data.wish,
        // })
      },
      onError: (error, values, rollback) => {
        if (rollback) {
          rollback()
        } else {
          console.log(error)
        }
      },
    }
  )

  const delWishAPI = useMutation(
    async (param: ProductWishSubmitT) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/del-wish`,
        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
      return res.data
    },
    {
      onSuccess: (data) => {
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
    if (session?.user?.email) {
      let param: ProductWishSubmitT = {
        email: session.user.email,
        product_id: wishInfo.product_id,
      }
      if (!wishInfo.wish) {
        // wish 등록 - 만약 wish 이력 있으면 patch 처리 , wish 이력 없으면 post 처리
        addWishAPI.mutate(param)
      } else {
        // wish 취소 - wish 이력 있을거니까 patch 처리
        delWishAPI.mutate(param)
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
      {wishInfo?.wish ? (
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

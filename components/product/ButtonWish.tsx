import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ProductWishSubmitT } from 'types'

import { queryKeys } from 'pages/api/query/queryKeys'
import useProductWishList from 'pages/api/query/useProductWishList'

export default function ButtonWish(props: { product_id: number; text: boolean }) {
  const { data: session } = useSession()
  const router = useRouter()

  const [wishInfo, setWishInfo] = useState({
    product_id: props.product_id,
    wish: false,
  })

  const { data: product, isFetched } = useProductWishList()

  const queryClient = useQueryClient()

  useEffect(() => {
    if (isFetched) {
      if (product && product.data.wishList.length > 0) {
        for (let wish of product.data.wishList) {
          wish.product_id === wishInfo.product_id &&
            setWishInfo({
              ...wishInfo,
              wish: true,
            })
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const addWishAPI = useMutation(
    async (param: ProductWishSubmitT) => {
      return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/add-wish`, JSON.stringify(param), {
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
    },
    {
      onMutate: async () => {
        setWishInfo({
          ...wishInfo,
          wish: true,
        })
      },
      onSuccess: (response) => {
        if (!(response.status === 201)) {
          alert('의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.')
          console.error(`HTTP status : ${response?.status}`)
        }
      },
      onError: (error, values, rollback) => {
        alert('좋아요 버튼을 반영하는데 문제가 발생하였습니다.\r같은 상황이 지속 된다면 고객센터에 문의해주시기 바랍니다.')
        console.log(error)
        if (rollback) {
          setWishInfo({
            ...wishInfo,
            wish: false,
          })
        }
      },
    }
  )

  const delWishAPI = useMutation(
    async (param: ProductWishSubmitT) => {
      return await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/del-wish`, JSON.stringify(param), {
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
    },
    {
      onMutate: async () => {
        setWishInfo({
          ...wishInfo,
          wish: false,
        })
      },
      onSuccess: (response) => {
        if (!(response.status === 204)) {
          alert('의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.')
          console.error(`HTTP status : ${response?.status}`)
        }
        // 좋아요 취소 후 좋아요 목록에서 제거하도록 초기화 ( refetchType은 default가 active이기 때문에 생략 가능 )
        queryClient.invalidateQueries({ queryKey: [queryKeys.productWishList], refetchType: 'active' })
      },
      onError: (error, values, rollback) => {
        alert('좋아요 버튼을 반영하는데 문제가 발생하였습니다.\r같은 상황이 지속 된다면 고객센터에 문의해주시기 바랍니다.')
        console.log(error)
        if (rollback) {
          setWishInfo({
            ...wishInfo,
            wish: true,
          })
        }
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
      //sessionStorage.setItem('clickedWish', wishInfo.product_id.toString())
      signIn()
    }
  }

  return (
    <button type="button" title="좋아요 버튼" className="flex justify-start cursor-pointer" onClick={handleClickLike}>
      {wishInfo?.wish ? <FontAwesomeIcon icon={faHeartSolid} className="ml-5 w-4 text-blue-700" /> : <FontAwesomeIcon icon={faHeart} className="ml-5 w-4 text-blue-700" />}

      {props.text && <span className="text-xs ml-3 leading-4">{router.pathname.substring(8) === 'wish_list' ? '좋아요' : '관심목록에 추가'}</span>}
    </button>
  )
}

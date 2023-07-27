import { ProductWishSubmitT } from 'types'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { signIn } from 'next-auth/react'
import { Session } from 'next-auth'

const HandleClickWishButton = (
  wishInfo: {
    product_id: number
    wish: boolean
  },
  setWishInfo: Dispatch<
    SetStateAction<{
      product_id: number
      wish: boolean
    }>
  >,
  session: Session | null
) => {
  const addWishAPI = useMutation(
    async (param: ProductWishSubmitT) => {
      return await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/add-wish`,
        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
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
        alert(
          '좋아요 버튼을 반영하는데 문제가 발생하였습니다.\r같은 상황이 지속 된다면 고객센터에 문의해주시기 바랍니다.'
        )
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
      return await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/del-wish`,
        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
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
      },
      onError: (error, values, rollback) => {
        alert(
          '좋아요 버튼을 반영하는데 문제가 발생하였습니다.\r같은 상황이 지속 된다면 고객센터에 문의해주시기 바랍니다.'
        )
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

  return {
    handleClickLike,
  }
}

export default HandleClickWishButton

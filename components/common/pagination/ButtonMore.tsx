import React from 'react'
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query'
import { ButtonMoreType } from 'types'

export default function ButtonMore(props: {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  type: ButtonMoreType
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<any, unknown>>
  hasNextPage: boolean
  isFetchingNextPage: boolean
  data: InfiniteData<any> | undefined
}) {
  const handleClickMoreProduct = () => {
    if (props.type === 'order') {
      props.fetchNextPage({ pageParam: props.page })
      props.setPage(props.page + 1)
    } else if (props.type === 'product') {
      /** 더보기 클릭 시 중복 데이터 가져옴 방지 */

      if (props.data) {
        if (props.data.pages.length) {
          props.fetchNextPage({ pageParam: props.data.pages.length + 1 })
          props.setPage(props.data.pages.length + 1)
        } else {
          return false
        }
      } else {
        alert('전달받은 데이터가 없습니다.')
        return false
      }
    } else {
      alert('허용하지 않는 버튼 타입입니다.\r고객센터로 문의해주시기 바랍니다.')
      return false
    }
  }

  return (
    <button
      type="button"
      title="주문내역 더보기 버튼"
      className="w-full bg-gray-300 h-10 rounded my-7 hover:bg-gray-400"
      onClick={handleClickMoreProduct}
      disabled={!props.hasNextPage || props.isFetchingNextPage}
    >
      {props.isFetchingNextPage ? '불러오는 중...' : props.hasNextPage ? '더보기' : '없음'}
    </button>
  )
}

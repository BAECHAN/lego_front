import Layout from '@components/Layout'
import ProductInOrderHistory from '@components/ProductInOrderHistory'
import useOrderList from 'pages/api/query/useOrderList'
import React, { useState } from 'react'
import { OrderT } from 'types'

export default function ContentsOrderHistory() {
  const [page, setPage] = useState(1)

  const {
    data: orderData,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useOrderList()

  const handleClickMoreProduct = () => {
    fetchNextPage({ pageParam: page })
    setPage(page + 1)
  }

  return (
    <div className="min-h-[602px]">
      {isFetched ? (
        <div className="p-3 mt-3">
          <div className="contents-box">
            <div className="flex text-center mb-3">
              <div className="w-3/12">상품정보</div>
              <div className="w-2/12">주문일자</div>
              <div className="w-1/12 text-right mr-4">주문번호</div>
              <div className="w-2/12">주문금액(수량)</div>
              <div className="w-2/12">주문상태</div>
              <div className="w-2/12">배송지정보</div>
            </div>

            <ul className="flex flex-wrap">
              {orderData?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.orderList.length > 0 ? (
                    page.orderList?.map(
                      (orderProduct: OrderT, index: number) => {
                        return (
                          <ProductInOrderHistory
                            order={orderProduct}
                            key={index}
                          />
                        )
                      }
                    )
                  ) : (
                    <div className="text-xl">주문 내역이 없습니다.</div>
                  )}
                </React.Fragment>
              ))}
            </ul>

            {hasNextPage ? (
              <button
                type="button"
                title="주문내역 더보기 버튼"
                className="w-full bg-gray-300 h-10 rounded my-7 hover:bg-gray-400"
                onClick={() => handleClickMoreProduct()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? '불러오는 중...'
                  : hasNextPage
                  ? '더보기'
                  : '없음'}
              </button>
            ) : (
              <br />
            )}
          </div>
        </div>
      ) : null}

      <style jsx>{`
        div.contents-box {
          padding-left: 10px;
        }
      `}</style>
    </div>
  )
}

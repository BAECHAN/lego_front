import useOrderList from 'pages/api/query/useOrderList'
import React, { useState } from 'react'
import { OrderGroupT } from 'types'
import ButtonMore from '../common/pagination/ButtonMore'
import GroupInOrderHistory from '@components/product/GroupInOrderHistory'

export default function ContentsOrderHistory() {
  const [page, setPage] = useState(1)

  const {
    data: orderData,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useOrderList()

  console.log(orderData)

  return (
    <div className="desktop:min-h-[602px]">
      {isFetched ? (
        <div className="p-3 mt-3">
          <div className="contents-box">
            <div className="flex text-center mb-3">
              <div className="w-2/12">주문정보</div>
              <div className="w-1/12 text-right">주문일자</div>
              <div className="w-1/12 text-right">주문번호</div>
              <div className="w-2/12 pl-8">주문금액(항목)</div>
              <div className="w-2/12">주문상태</div>
              <div className="w-2/12">배송지정보</div>
              <div className="w-2/12">상품상세</div>
            </div>

            {/* <ul className="flex flex-wrap">
              {orderData?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.data.orderList.length > 0 ? (
                    page.data.orderList?.map(
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
                    <div className="text-2xl m-auto">주문 내역이 없습니다.</div>
                  )}
                </React.Fragment>
              ))}
            </ul> */}
            <ul className="flex flex-wrap">
              {orderData?.pages.map((item, index1) => (
                <React.Fragment key={index1}>
                  {item.data.orderGroupList.length > 0 ? (
                    item.data.orderGroupList?.map(
                      (orderGroup: OrderGroupT, index2: number) => {
                        return (
                          <GroupInOrderHistory
                            orderGroup={orderGroup}
                            order={orderData.pages[
                              index1
                            ].data.orderList.filter(
                              (item: { order_group_id: number }) =>
                                item.order_group_id ===
                                orderGroup.order_group_id
                            )}
                            key={index2}
                          />
                        )
                      }
                    )
                  ) : (
                    <div className="text-2xl m-auto">주문 내역이 없습니다.</div>
                  )}
                </React.Fragment>
              ))}
            </ul>

            {hasNextPage ? (
              <ButtonMore
                type="order"
                page={page}
                setPage={setPage}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                data={orderData}
              />
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

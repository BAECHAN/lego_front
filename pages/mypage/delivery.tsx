import Layout from '@components/Layout'
import ModalDelivery from '@components/ModalDelivery'
import Portal from '@components/Portal'
import ShippingItem from '@components/ShippingItem'
import { useQueryClient } from '@tanstack/react-query'
import useDeliveryShippingList from 'pages/api/query/useDeliveryShippingList'
import React, { useEffect, useState } from 'react'
import { ShippingT } from 'types'
import Paging from '@components/common/pagination/index'

export default function Delivery() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalShippingData, setModalShippingData] = useState<ShippingT>()

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const handleClickModalOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    shipping?: ShippingT
  ) => {
    if (shipping) {
      setModalShippingData(shipping)
    } else {
      setModalShippingData(undefined)
    }

    !modalOpen ? setModalOpen(true) : setModalOpen(false)
  }

  const { data } = useDeliveryShippingList(page)

  console.log(data)

  return (
    <div>
      {data && data.shippingList?.length > 0 ? (
        <div className="min-h-[300px]">
          <ul className="flex flex-col min-h-[403.2px]">
            {data.shippingList.map((item: ShippingT, index: number) => {
              return (
                <li key={item.shipping_id}>
                  <ShippingItem
                    shipping={item}
                    onOpen={handleClickModalOpen}
                    page={page}
                    setPage={setPage}
                    setTotalPage={setTotalPage}
                    isLastPage={data.isLastPage}
                    listLength={data.shippingList.length}
                  ></ShippingItem>
                  {index < data.shippingList.length - 1 ? <hr /> : null}
                </li>
              )
            })}
          </ul>
          <div>
            <Paging
              page={page}
              setPage={setPage}
              totalPage={totalPage}
              setTotalPage={setTotalPage}
            />
          </div>
        </div>
      ) : (
        <div className="text-xl">
          <div>배송지가 없습니다.</div>
        </div>
      )}

      <div className="text-xl">
        <div className="flex justify-center my-10">
          <button
            type="button"
            className="btn-add-address"
            onClick={(event) => handleClickModalOpen(event)}
          >
            배송지 등록
          </button>
          {modalOpen && (
            <Portal selector="#portal">
              {modalShippingData ? (
                <ModalDelivery
                  onClose={handleClickModalOpen}
                  page={page}
                  setPage={setPage}
                  totalPage={totalPage}
                  listLength={
                    data && data.shippingList ? data.shippingList.length : 0
                  }
                  shipping={modalShippingData}
                />
              ) : (
                <ModalDelivery
                  onClose={handleClickModalOpen}
                  page={page}
                  setPage={setPage}
                  totalPage={totalPage}
                  listLength={
                    data && data.shippingList ? data.shippingList.length : 0
                  }
                />
              )}
            </Portal>
          )}
        </div>
      </div>

      <style jsx>{`
        button.btn-add-address {
          background-color: gray;
          color: #fff;
          padding: 5px 10px;
          border-radius: 4px;

          :hover {
            background-color: #000;
          }
        }
      `}</style>
    </div>
  )
}
Delivery.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

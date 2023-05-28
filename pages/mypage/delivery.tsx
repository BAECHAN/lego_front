import Layout from '@components/Layout'
import ModalDelivery from '@components/ModalDelivery'
import Portal from '@components/Portal'
import ShippingItem from '@components/shipping/ShippingItem'
import useDeliveryShippingList from 'pages/api/query/useDeliveryShippingList'
import React, { useEffect, useState } from 'react'
import { ShippingT } from 'types'
import Pagination from '@components/common/pagination/index'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import ShippingItemByOrder from '@components/shipping/ShippingItemByOrder'

export default function Delivery() {
  const router = useRouter()

  const [modalOpen, setModalOpen] = useState(false)
  const [modalShippingData, setModalShippingData] = useState<ShippingT>()

  const [page, setPage] = useState(1)
  const [startPage, setStartPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const { data, isFetched } = useDeliveryShippingList(page)

  useEffect(() => {
    if (isFetched && router.query.from === 'order') {
      data.shippingList.length == 0 ? setModalOpen(true) : null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleClickModalOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    shipping?: ShippingT
  ) => {
    shipping ? setModalShippingData(shipping) : setModalShippingData(undefined)

    !modalOpen ? setModalOpen(true) : setModalOpen(false)
  }

  return (
    <div>
      {data?.shippingList.length > 0 ? (
        <div className="min-h-[300px]">
          {router.query.from === 'order' ? (
            <button
              type="button"
              title="주문페이지로 돌아가기 버튼"
              className="m-3"
              onClick={() => router.back()}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                width="18px"
                height="18px"
                style={{ marginLeft: '3px' }}
              />
            </button>
          ) : null}
          <ul className="flex flex-col min-h-[403.2px]">
            {data.shippingList.map((item: ShippingT, index: number) => {
              return router.query.from === 'order' ? (
                <li key={item.shipping_id}>
                  <ShippingItemByOrder
                    shipping={item}
                    onOpen={handleClickModalOpen}
                    page={page}
                    setPage={setPage}
                    startPage={startPage}
                    setStartPage={setStartPage}
                    totalPage={totalPage}
                    setTotalPage={setTotalPage}
                    isLastPage={data.isLastPage}
                    listLength={data.shippingList.length}
                    shippingListCount={data.shippingListCount}
                  ></ShippingItemByOrder>
                </li>
              ) : (
                <li key={item.shipping_id}>
                  <ShippingItem
                    shipping={item}
                    onOpen={handleClickModalOpen}
                    page={page}
                    setPage={setPage}
                    startPage={startPage}
                    setStartPage={setStartPage}
                    totalPage={totalPage}
                    setTotalPage={setTotalPage}
                    isLastPage={data.isLastPage}
                    listLength={data.shippingList.length}
                    shippingListCount={data.shippingListCount}
                  ></ShippingItem>
                  {index < data.shippingList.length - 1 ? <hr /> : null}
                </li>
              )
            })}
          </ul>
          <div>
            <Pagination
              page={page}
              setPage={setPage}
              startPage={startPage}
              setStartPage={setStartPage}
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
            title="배송지 등록 버튼"
            className="btn-add-address"
            onClick={(event) => handleClickModalOpen(event)}
          >
            배송지 등록
          </button>
          {modalOpen && data && (
            <Portal selector="#portal">
              {modalShippingData ? (
                <ModalDelivery
                  onClose={handleClickModalOpen}
                  page={page}
                  setPage={setPage}
                  startPage={startPage}
                  setStartPage={setStartPage}
                  totalPage={totalPage}
                  setTotalPage={setTotalPage}
                  listLength={data.shippingList ? data.shippingList.length : 0}
                  shippingListCount={data.shippingListCount}
                  shipping={modalShippingData}
                />
              ) : (
                <ModalDelivery
                  onClose={handleClickModalOpen}
                  page={page}
                  setPage={setPage}
                  startPage={startPage}
                  setStartPage={setStartPage}
                  totalPage={totalPage}
                  setTotalPage={setTotalPage}
                  listLength={data.shippingList ? data.shippingList.length : 0}
                  shippingListCount={data.shippingListCount}
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

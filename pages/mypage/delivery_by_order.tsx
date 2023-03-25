import Layout from '@components/Layout'
import ModalDelivery from '@components/ModalDelivery'
import Portal from '@components/Portal'
import ShippingItemByOrder from '@components/ShippingItemByOrder'
import useDeliveryShippingList from 'pages/api/query/useDeliveryShippingList'
import React, { useState } from 'react'
import { ShippingT } from 'types'
import Pagination from '@components/common/pagination/index'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export async function getServerSideProps(context: any) {
  return {
    props: context.query,
  }
}
export default function DeliveryByOrder(props: { from: string }) {
  const router = useRouter()

  const [modalOpen, setModalOpen] = useState(false)
  const [modalShippingData, setModalShippingData] = useState<ShippingT>()

  const [page, setPage] = useState(1)
  const [startPage, setStartPage] = useState(1)
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

  return (
    <div>
      {data && data.shippingList?.length > 0 ? (
        <div className="min-h-[300px]">
          <button type="button" className="m-3" onClick={() => router.back()}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              width="18px"
              height="18px"
              style={{ marginLeft: '3px' }}
            />
          </button>
          <ul className="flex flex-col min-h-[403.2px]">
            {data.shippingList.map((item: ShippingT, index: number) => {
              return (
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
                  listLength={
                    data && data.shippingList ? data.shippingList.length : 0
                  }
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
                  listLength={
                    data && data.shippingList ? data.shippingList.length : 0
                  }
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
DeliveryByOrder.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

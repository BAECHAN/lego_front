import Layout from '@components/Layout'
import ModalDelivery from '@components/ModalDelivery'
import Portal from '@components/Portal'
import ShippingItem from '@components/ShippingItem'
import useDeliveryShippingList from 'pages/api/query/useDeliveryShippingList'
import React, { useEffect, useState } from 'react'
import { ShippingT } from 'types'

export default function Delivery() {
  const [modalOpen, setModalOpen] = useState(false)

  const handleClickModalOpen = () => {
    !modalOpen ? setModalOpen(true) : setModalOpen(false)
  }

  const { data, isFetched, isFetching } = useDeliveryShippingList()

  return (
    <div>
      {data && data.shippingList?.length > 0 ? (
        <div className="min-h-[300px]">
          <ul className="flex flex-col">
            {data.shippingList.map((item: ShippingT, index: number) => {
              return (
                <li key={item.shipping_id}>
                  <ShippingItem shipping={item}></ShippingItem>
                  {index < data.shippingList.length - 1 ? <hr /> : null}
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <div className="text-xl">
          <div>배송지가 없습니다.</div>
        </div>
      )}

      <div className="text-xl">
        <div className="flex justify-center mt-10">
          <button
            type="button"
            className="btn-add-address"
            onClick={handleClickModalOpen}
          >
            배송지 등록
          </button>
          {modalOpen && (
            <Portal selector="#portal">
              <ModalDelivery onClose={handleClickModalOpen} />
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

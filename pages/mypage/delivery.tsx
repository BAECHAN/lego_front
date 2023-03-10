import Layout from '@components/Layout'
import ModalDelivery from '@components/ModalDelivery'
import Portal from '@components/portal'
import React, { useEffect, useState } from 'react'

export default function Delivery() {
  const [modalOpen, setModalOpen] = useState(false)

  const handleClickModalOpen = () => {
    !modalOpen ? setModalOpen(true) : setModalOpen(false)
  }

  return (
    <div>
      {true
        ? // <div className="min-h-[600px]">
          //   <ul className="flex flex-col">
          //     {data.cartList?.map((item: ProductCartT, index: number) => {
          //       return (
          //         <li key={item.cart_id}>
          //           <ProductInCart product={item} />
          //           {index < data.cartList.length - 1 ? <hr /> : null}
          //         </li>
          //       )
          //     })}
          //   </ul>
          // </div>
          null
        : null}

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

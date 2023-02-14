import Layout from '@components/Layout'
import React from 'react'

export default function Orders() {
  return <div>주문 내역 조회</div>
}
Orders.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

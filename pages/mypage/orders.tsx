import Layout from '@components/Layout'
import React from 'react'

export default function Orders() {
  return <div>에고</div>
}
Orders.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

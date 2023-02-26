import Layout from '@components/Layout'
import React from 'react'

export default function OrderHistory() {
  return <div>에고</div>
}
OrderHistory.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

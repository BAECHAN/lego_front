import Layout from '@components/Layout'
import React from 'react'

export default function Cart() {
  return <div>에고</div>
}
Cart.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

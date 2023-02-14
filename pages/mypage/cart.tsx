import Layout from '@components/Layout'
import React from 'react'

export default function Cart() {
  return <div>장바구니</div>
}
Cart.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

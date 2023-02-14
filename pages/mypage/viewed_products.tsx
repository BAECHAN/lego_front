import Layout from '@components/Layout'
import React from 'react'

export default function ViewedProducts() {
  return <div>최근 본 상품</div>
}
ViewedProducts.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

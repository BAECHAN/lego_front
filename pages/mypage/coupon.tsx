import Layout from '@components/Layout'
import React from 'react'

export default function Coupon() {
  return <div>에고</div>
}
Coupon.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

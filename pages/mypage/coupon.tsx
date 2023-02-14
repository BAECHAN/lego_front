import Layout from '@components/Layout'
import React from 'react'

export default function Coupon() {
  return <div>쿠폰 조회</div>
}
Coupon.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

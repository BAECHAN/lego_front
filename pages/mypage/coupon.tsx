import React from 'react'

import Layout from '@components/Layout'

export default function Coupon() {
  return <div>에고</div>
}
Coupon.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

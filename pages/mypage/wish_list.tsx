import Layout from '@components/Layout'
import React from 'react'

export default function WishList() {
  return <div>좋아요</div>
}
WishList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

import Layout from '@components/Layout'
import Navbar from '@components/Navbar'
import SidebarMyPage from '@components/SidebarMyPage'
import React from 'react'
import ViewedProducts from './viewed_products'

export default function MyPage() {
  return <div>내 아를 낳아도</div>
}
MyPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

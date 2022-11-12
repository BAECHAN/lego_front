import Layout from '@components/Layout'
import React from 'react'

export default function FindAccount() {
  return <div>find_account</div>
}
FindAccount.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

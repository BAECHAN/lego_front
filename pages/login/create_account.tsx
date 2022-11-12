import Layout from '@components/Layout'
import React from 'react'

export default function CreateAccount() {
  return <div>create_account</div>
}
CreateAccount.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

import Layout from '@components/Layout'
import React from 'react'

export default function FindPassword() {
  return <div>find_password</div>
}
FindPassword.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

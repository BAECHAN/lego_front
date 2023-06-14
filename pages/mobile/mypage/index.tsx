import LayoutMobile from '@components/LayoutMobile'
import MobileSidebarMyPage from '@components/mobile/SidebarMyPage'
import React from 'react'

export default function MobileMypage() {
  return (
    <div className="m-auto min-h-screen">
      <div className="py-4 flex text-center justify-center">
        <MobileSidebarMyPage />
      </div>
    </div>
  )
}

MobileMypage.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutMobile>{page}</LayoutMobile>
}

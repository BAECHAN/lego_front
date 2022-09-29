import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import Helmet from './Helmet'

export default function NoLayout({
  children,
}: React.PropsWithChildren): ReactElement {
  const router = useRouter()

  return (
    <>
      <Helmet
        pathname={router.pathname.slice(1, router.pathname.length)}
      ></Helmet>
      <div>{children}</div>
    </>
  )
}

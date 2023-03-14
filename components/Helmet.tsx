import Head from 'next/head'
import { useRouter } from 'next/router'

type HelmetType = {
  pathname: string
}

export default function Helmet({ pathname }: HelmetType) {
  const router = useRouter()
  let title = ''

  if (router.query.theme_title_en) {
    title = router.query.theme_title_en + ' | Lego'
  } else if (pathname) {
    title = pathname + ' | Lego'
  } else {
    title = 'Lego'
  }

  return (
    <Head>
      <link rel="shortcut icon" href="/lego.ico" />
      <title>{title}</title>
    </Head>
  )
}

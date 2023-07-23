import Head from 'next/head'
import { useRouter } from 'next/router'

type HelmetType = {
  pathname: string
}

export default function Helmet({ pathname }: HelmetType) {
  const router = useRouter()

  const title = router.query.theme_title_en
    ? `${router.query.theme_title_en} | Lego`
    : pathname
    ? `${pathname} | Lego`
    : 'Lego'

  return (
    <Head>
      <link rel="shortcut icon" href="/lego.ico" />
      <title>{title}</title>
    </Head>
  )
}

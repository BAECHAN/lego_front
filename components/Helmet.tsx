import Head from 'next/head'

type HelmetType = {
  pathname: string
}

export default function Helmet({ pathname }: HelmetType) {
  const title = pathname + ' | Lego'

  return (
    <Head>
      <link rel="shortcut icon" href="/lego.ico" />
      <title>{title}</title>
    </Head>
  )
}

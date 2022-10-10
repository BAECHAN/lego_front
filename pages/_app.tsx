import '../styles/globals.css'
import { ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout): ReactElement {
  const getLayout = Component.getLayout || ((page) => page)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity }, // 데이터가 특정 시간보다 오래된 경우에만 가져오도록 지정합니다.
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
  )
}

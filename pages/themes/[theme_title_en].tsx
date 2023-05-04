import Layout from '../../components/Layout'
import SidebarFilter from '../../components/SidebarFilter'
import Navbar from '../../components/NavigationBar'
import { ThemeT, ProductT } from 'types'
import ProductCard from '@components/ProductCard'
import React, { useEffect, useState } from 'react'
import {
  selectedFilterSelector,
  sortSelector,
  themeSelector,
} from 'state/atoms'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import useProductList from 'pages/api/query/useProductList'

import axios from 'axios'
import { QueryClient } from 'react-query'
import { queryKeys } from 'pages/api/query/queryKeys'
import { GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: context.query,
  }
}

export default function Theme(props: ThemeT) {
  const [page, setPage] = useState(1)
  const [sort, setSort] = useRecoilState(sortSelector)
  const [theme, setTheme] = useRecoilState(themeSelector)

  const queryClient = new QueryClient()

  const take = 15
  const filter = useRecoilValue(selectedFilterSelector)

  const recoilReset = useResetRecoilState(selectedFilterSelector)

  const queryKey = queryKeys.productList

  let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${queryKey}`

  const axiosGets = async ({ pageParam = 1 }) => {
    const res = await axios.get(url, {
      params: {
        theme_id: Number(props.theme_id),
        page: pageParam,
        take: take,
        sort: sort,
        filter: filter,
      },
      headers: { 'Content-Type': `application/json; charset=utf-8` },
    })
    return res.data
  }

  const {
    data: productList,
    hasNextPage,
    isFetched,
    isFetchingNextPage,
    fetchNextPage,
  } = useProductList(axiosGets)

  /** 더보기 클릭 시 중복 데이터 가져옴 방지 */
  const handleClickMoreProduct = () => {
    console.log(productList?.pages.length)

    if (productList && productList?.pages.length) {
      fetchNextPage({ pageParam: productList.pages.length + 1 })
      setPage(productList.pages.length + 1)
    }
  }

  /** 상세페이지에서 뒤로가기 시 스크롤 위치 가져오기 */
  useEffect(() => {
    if (sessionStorage.getItem('isHistoryBack') === 'true') {
      let scrollRestoration = setTimeout(() => {
        window.scrollTo(0, Number(sessionStorage.getItem('scrollY')))
        sessionStorage.removeItem('scrollY')
      }, 100)

      sessionStorage.removeItem('isHistoryBack')

      return () => clearTimeout(scrollRestoration)
    } else {
      recoilReset()
      setTheme(props)
      setPage(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setPage(1)
  }, [filter])

  return (
    <div className="px-16">
      <Navbar />
      <div>
        <div className="list-summary flex mx-7 my-3">
          <div className="list-count">
            {productList?.pages[0].productListCount}개 제품 표시
          </div>
          <div className="flex-grow" />
          <div className="list-sort">
            <select
              id="listSort"
              title="정렬 선택"
              className="border rounded"
              onChange={(event) => {
                setSort(event.currentTarget.value)
                setPage(1)
              }}
              defaultValue={sort}
            >
              <option value="newItem">신제품 순</option>
              <option value="ascPrice">가격 낮은 순</option>
              <option value="descPrice">가격 높은 순</option>
              <option value="descPieces">구성품 많은 순</option>
              <option value="ascKorean">가나다 순</option>
            </select>
          </div>
        </div>
        <div className="flex">
          <SidebarFilter themes={props} />
          <div className="mr-5 w-full">
            <ul className="flex flex-wrap">
              {productList?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.productList.length > 0 ? (
                    page.productList?.map(
                      (product: ProductT, index: number) => {
                        return <ProductCard product={product} key={index} />
                      }
                    )
                  ) : (
                    <div className="text-xl">해당하는 상품이 없습니다.</div>
                  )}
                </React.Fragment>
              ))}
            </ul>

            {hasNextPage ? (
              <button
                type="button"
                title="상품 더보기 버튼"
                className="w-full bg-gray-300 h-10 rounded my-7 hover:bg-gray-400"
                onClick={() => handleClickMoreProduct()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? '불러오는 중...'
                  : hasNextPage
                  ? '더보기'
                  : '없음'}
              </button>
            ) : (
              <br />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

Theme.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

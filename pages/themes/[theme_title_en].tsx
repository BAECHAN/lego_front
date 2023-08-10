import Layout from '../../components/Layout'
import SidebarFilter from '../../components/sidebar/SidebarFilter'
import Navbar from '../../components/NavigationBar'
import { ThemeT, ProductT } from 'types'
import ProductCard from '@components/product/ProductCard'
import React, { useEffect, useState } from 'react'
import { selectedFilterSelector, sortSelector, themeSelector } from 'state/atoms'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import useProductList from 'pages/api/query/useProductList'

import axios from 'axios'
import { queryKeys } from 'pages/api/query/queryKeys'
import { GetServerSidePropsContext } from 'next'
import ButtonMore from '@components/common/pagination/ButtonMore'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: context.query,
  }
}

export default function Theme(props: ThemeT) {
  const [page, setPage] = useState(1)
  const [sort, setSort] = useRecoilState(sortSelector)
  const setTheme = useSetRecoilState(themeSelector)

  const take = 15
  const filter = useRecoilValue(selectedFilterSelector)

  const recoilReset = useResetRecoilState(selectedFilterSelector)

  const queryKey = queryKeys.productList

  let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${queryKey}`

  const axiosGets = async ({ pageParam = 1 }) => {
    return await axios.get(url, {
      params: {
        theme_id: Number(props.theme_id),
        page: pageParam,
        take: take,
        sort: sort,
        filter: filter,
      },
      headers: { 'Content-Type': `application/json; charset=utf-8` },
    })
  }

  const { data: productList, hasNextPage, isFetchingNextPage, fetchNextPage } = useProductList(axiosGets)

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
    <div className="desktop:pl-16 mobile:text-xs desktop:text-base">
      <Navbar />
      <div>
        <div className="list-summary flex mx-7 my-3">
          <div className="list-count">{productList?.pages[0].data.productListCount}개 제품 표시</div>
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
            <ul className="flex flex-wrap desktop:min-w-[588px]">
              {productList?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.data.productList.length > 0 ? (
                    page.data.productList?.map((product: ProductT) => {
                      return <ProductCard product={product} key={product.product_id} />
                    })
                  ) : (
                    <div className="text-xl">해당하는 상품이 없습니다.</div>
                  )}
                </React.Fragment>
              ))}
            </ul>

            {hasNextPage ? (
              <ButtonMore type="product" page={page} setPage={setPage} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} data={productList} />
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

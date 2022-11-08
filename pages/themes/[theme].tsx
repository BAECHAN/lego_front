import Layout from '../../components/Layout'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { ThemeT, ProductT } from 'types'
import ProductCard from '@components/ProductCard'
import React, { useState } from 'react'

export async function getServerSideProps(context: any) {
  return {
    props: context.query,
  }
}

const take = 15
export default function Theme(props: ThemeT) {
  const [page, setPage] = useState(1)

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['getProductList'],
      async ({ pageParam = 0 }) => {
        const res = await axios.get(
          `http://localhost:5000/api/getProductList?theme_id=${props.theme_id}&page=${pageParam}&take=${take}`
        )
        return res.data
      },
      {
        onSuccess: (data) => console.log(data),
        onError: (e) => console.log(e),
        getNextPageParam: (lastPage) => !lastPage.isLast ?? undefined,
      }
    )

  const handleClickMoreProduct = () => {
    fetchNextPage({ pageParam: page })
    setPage(page + 1)
  }

  return (
    <div>
      <Navbar currentPage={props.theme_title} />

      <div className="list-summary flex mx-7 my-3">
        <div className="list-count">
          {data?.pages[0].productListCount}개 제품 표시
        </div>
        <div className="flex-grow" />
        <div className="list-sort">
          <select id="listSort" className="border rounded">
            <option>판매순</option>
            <option>높은금액순</option>
            <option>낮은금액순</option>
            <option>신제품순</option>
          </select>
        </div>
      </div>
      <div className="flex">
        <Sidebar />
        <div className="mr-5">
          <ul className="flex flex-wrap">
            {data?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.productList.map((product: ProductT, index: number) => {
                  return <ProductCard product={product} key={index} />
                })}
              </React.Fragment>
            ))}
          </ul>

          {hasNextPage ? (
            <button
              type="button"
              className="w-full bg-gray-300 h-10 rounded my-7 hover:bg-gray-400"
              onClick={() => handleClickMoreProduct()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
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
  )
}
/*

*/
Theme.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

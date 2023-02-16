import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ThemeT } from 'types'
import { selectedFilterSelector, sortSelector } from 'state/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'

const useProductsList = (props: ThemeT) => {
  const take = 15
  const sort = useRecoilValue(sortSelector)
  const filter = useRecoilValue(selectedFilterSelector)

  let url = 'http://localhost:5000' + '/api/getProductList'

  return useInfiniteQuery(
    ['getProductList', filter, sort],
    async ({ pageParam = 0 }) => {
      const res = await axios.post(
        url,
        {
          theme_id: Number(props.theme_id),
          page: pageParam,
          take: take,
          sort: sort,
          filter: filter,
        },
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
      return res.data
    },
    {
      onSuccess: (data) => console.log(data),
      onError: (e) => console.log(e),
      getNextPageParam: (lastPage) => !lastPage.isLast ?? undefined,
      keepPreviousData: true,
    }
  )
}

export default useProductsList

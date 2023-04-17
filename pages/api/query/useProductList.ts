import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ThemeT } from 'types'
import { selectedFilterSelector, sortSelector } from 'state/atoms'
import { useRecoilValue } from 'recoil'

const useProductList = (
  axiosGets: ({ pageParam }: { pageParam?: number | undefined }) => Promise<any>
) => {
  const sort = useRecoilValue(sortSelector)
  const filter = useRecoilValue(selectedFilterSelector)

  return useInfiniteQuery(['product-list', filter, sort], axiosGets, {
    onSuccess: (data) => {},
    onError: (e) => console.log(e),
    getNextPageParam: (lastPage) => !lastPage.isLast ?? undefined,
    //keepPreviousData: true,
  })
}

export default useProductList

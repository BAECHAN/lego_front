import { useInfiniteQuery } from '@tanstack/react-query'
import { selectedFilterSelector, sortSelector } from 'state/atoms'
import { useRecoilValue } from 'recoil'
import { queryKeys } from './queryKeys'

const useProductList = (
  axiosGets: ({ pageParam }: { pageParam?: number }) => Promise<any>
) => {
  const sort = useRecoilValue(sortSelector)
  const filter = useRecoilValue(selectedFilterSelector)

  const queryKey = queryKeys.productList

  return useInfiniteQuery([queryKey, filter, sort], axiosGets, {
    onSuccess: (data) => {},
    onError: (e) => console.log(e),
    getNextPageParam: (lastPage) => !lastPage.isLast ?? undefined,
    keepPreviousData: true,
  })
}

export default useProductList

import React, { useEffect, useState, MouseEvent } from 'react'

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageNumber from './PageNumber'
import useDeliveryShippingList from 'pages/api/query/useDeliveryShippingList'
import { useQueryClient } from '@tanstack/react-query'

export default function Pagination(props: {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  totalPage: number
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
}) {
  const queryClient = useQueryClient()

  const { data, isFetched, isPreviousData, status } = useDeliveryShippingList(
    props.page
  )

  useEffect(() => {
    if (status == 'success' && props.setTotalPage) {
      props.setTotalPage(Math.ceil(Number(data.shippingListCount / 5)))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched])

  const [arr, setArr] = useState<any>([])

  let pageCount = 10
  let startPage = 1

  const handleClickPageButton = (event: MouseEvent<HTMLButtonElement>) => {
    const { name, innerText } = event.currentTarget

    if (name == 'prevPage') {
      props.setPage((old) => Math.max(old - 1, 0))
    } else if (name == 'nextPage') {
      if (!data.isLastPage) {
        props.setPage((old) => old + 1)
      }
    } else {
      props.setPage(Number(innerText.toString()))
    }

    if (name == 'prevPage') {
      if (props.page == startPage) {
        startPage = startPage - pageCount
      }
    } else if (name == 'nextPage') {
      if (props.page == startPage + pageCount - 1) {
        startPage = startPage + pageCount
      }
    }
  }

  useEffect(() => {
    let arrTemp = []

    console.log(startPage)
    console.log(pageCount + startPage - 1)
    console.log(props.totalPage)

    for (let i = 1; i <= props.totalPage; i++) {
      if (i >= startPage && i <= pageCount + startPage - 1) {
        if (props.page == i) {
          arrTemp.push(
            <PageNumber
              key={i}
              page={i}
              handleClickPageButton={handleClickPageButton}
              isActive={true}
            />
          )
        } else {
          arrTemp.push(
            <PageNumber
              key={i}
              page={i}
              handleClickPageButton={handleClickPageButton}
              isActive={false}
            />
          )
        }
      }
    }
    setArr([...arr, arrTemp])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.totalPage])

  return (
    <div className="flex justify-center flex-row items-center">
      <button
        type="button"
        name="prevPage"
        onClick={(event) => handleClickPageButton(event)}
        disabled={props.page == 1}
        className={`${props.page == 1 ? 'fa-disabled' : ''}`}
      >
        <FontAwesomeIcon
          icon={faAngleLeft}
          width="15px"
          height="15px"
          style={{
            position: 'relative',
            margin: '0px 10px',
            cursor: 'pointer',
          }}
        />
      </button>
      {arr}
      <button
        type="button"
        name="nextPage"
        onClick={(event) => handleClickPageButton(event)}
        disabled={isPreviousData || data.isLastPage}
        className={`${isPreviousData || data.isLastPage ? 'fa-disabled' : ''}`}
      >
        <FontAwesomeIcon
          icon={faAngleRight}
          width="15px"
          height="15px"
          style={{
            position: 'relative',
            margin: '0px 10px',
            cursor: 'pointer',
          }}
        />
      </button>

      <style jsx>{`
        .fa-disabled {
          opacity: 0.3;
        }
      `}</style>
    </div>
  )
}

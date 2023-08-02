import React, { useEffect, MouseEvent } from 'react'

import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PageNumber from './PageNumber'
import useDeliveryShippingList from 'pages/api/query/useDeliveryShippingList'
import useIsMobile from '../custom/isMobile'
import { PageButtonInfo } from 'types'

export default function Pagination(props: {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  startPage: number
  setStartPage: React.Dispatch<React.SetStateAction<number>>
  totalPage: number
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
}) {
  const { data, status } = useDeliveryShippingList(props.page)

  useEffect(() => {
    if (status == 'success' && props.setTotalPage) {
      props.setTotalPage(Math.ceil(Number(data.shippingListCount / 5)))
    }
  }, [data, props, status])

  const isMobile = useIsMobile()

  let arr: JSX.Element[] = []
  let pageCount = isMobile ? 5 : 10

  const handleClickPageButton = (event: MouseEvent<HTMLButtonElement>) => {
    const { name, innerText } = event.currentTarget

    const pageButtonInfo: PageButtonInfo = {
      prevPage: {
        setPageValue: props.page - 1 - ((props.page - 1) % pageCount),
        setStartPageValue:
          props.page - pageCount - ((props.page - 1) % pageCount),
      },
      nextPage: {
        setPageValue: props.page + pageCount - ((props.page - 1) % pageCount),
        setStartPageValue:
          props.page + pageCount - ((props.page - 1) % pageCount),
      },
      firstPage: {
        setPageValue: 1,
        setStartPageValue: 1,
      },
      lastPage: {
        setPageValue: props.totalPage,
        setStartPageValue: props.totalPage - (props.totalPage % pageCount) + 1,
      },
    }

    if (name !== '') {
      const { setPageValue, setStartPageValue } = pageButtonInfo[name]

      props.setPage(setPageValue)
      props.setStartPage(setStartPageValue)
    } else {
      props.setPage(Number(innerText))
    }
  }

  for (let i = 1; i <= props.totalPage; i++) {
    arr.push(
      <PageNumber
        key={i}
        page={i}
        handleClickPageButton={handleClickPageButton}
        isActive={props.page === i ? true : false}
      />
    )
  }

  return (
    <div className="flex justify-center flex-row items-center">
      {!isMobile && (
        <button
          type="button"
          name="firstPage"
          title="첫 페이지로 이동"
          onClick={(event) => handleClickPageButton(event)}
          disabled={props.page == 1}
          className={`${props.page == 1 ? 'fa-disabled' : ''}`}
        >
          <FontAwesomeIcon
            icon={faAngleDoubleLeft}
            width="15px"
            height="15px"
            style={{
              position: 'relative',
              margin: '0px 10px',
              cursor: 'pointer',
            }}
          />
        </button>
      )}
      <button
        type="button"
        name="prevPage"
        title="이전 페이지 그룹으로 이동"
        onClick={(event) => handleClickPageButton(event)}
        disabled={Math.floor((props.page - 1) / pageCount) == 0}
        className={`${
          Math.floor((props.page - 1) / pageCount) == 0 ? 'fa-disabled' : ''
        }`}
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
      {arr.map((item, index) => {
        if (
          index >= props.startPage - 1 &&
          index <= pageCount + props.startPage - 2
        ) {
          return item
        }
      })}
      <button
        type="button"
        name="nextPage"
        title="다음 페이지 그룹으로 이동"
        onClick={(event) => handleClickPageButton(event)}
        disabled={
          props.totalPage - props.startPage <= pageCount - 1 ? true : false
        }
        className={`${
          props.totalPage - props.startPage <= pageCount - 1
            ? 'fa-disabled'
            : ''
        }`}
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
      {!isMobile && (
        <button
          type="button"
          name="lastPage"
          title="마지막 페이지로 이동"
          onClick={(event) => handleClickPageButton(event)}
          disabled={props.page == props.totalPage}
          className={`${props.page == props.totalPage ? 'fa-disabled' : ''}`}
        >
          <FontAwesomeIcon
            icon={faAngleDoubleRight}
            width="15px"
            height="15px"
            style={{
              position: 'relative',
              margin: '0px 10px',
              cursor: 'pointer',
            }}
          />
        </button>
      )}

      <style jsx>{`
        .fa-disabled {
          opacity: 0.3;
        }
      `}</style>
    </div>
  )
}

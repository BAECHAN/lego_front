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

  let arr = []
  let pageCount = 10

  const handleClickPageButton = (event: MouseEvent<HTMLButtonElement>) => {
    const { name, innerText } = event.currentTarget

    if (name == 'prevPage') {
      props.setPage(props.page - 1 - ((props.page - 1) % 10))
      props.setStartPage(props.page - 10 - ((props.page - 1) % 10))
    } else if (name == 'nextPage') {
      props.setStartPage(props.page + 10 - ((props.page - 1) % 10))
      props.setPage(props.page + 10 - ((props.page - 1) % 10))
    } else if (name == 'firstPage') {
      props.setStartPage(1)
      props.setPage(1)
    } else if (name == 'lastPage') {
      props.setStartPage(props.totalPage - (props.totalPage % 10) + 1)
      props.setPage(props.totalPage)
    } else {
      props.setPage(Number(innerText.toString()))
    }
  }

  for (let i = 1; i <= props.totalPage; i++) {
    if (props.page == i) {
      arr.push(
        <PageNumber
          key={i}
          page={i}
          handleClickPageButton={handleClickPageButton}
          isActive={true}
        />
      )
    } else {
      arr.push(
        <PageNumber
          key={i}
          page={i}
          handleClickPageButton={handleClickPageButton}
          isActive={false}
        />
      )
    }
  }

  return (
    <div className="flex justify-center flex-row items-center">
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
      <button
        type="button"
        name="prevPage"
        title="이전 페이지 그룹으로 이동"
        onClick={(event) => handleClickPageButton(event)}
        disabled={Math.floor((props.page - 1) / 10) == 0}
        className={`${
          Math.floor((props.page - 1) / 10) == 0 ? 'fa-disabled' : ''
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
        disabled={props.totalPage - props.startPage <= 9 ? true : false}
        className={`${
          props.totalPage - props.startPage <= 9 ? 'fa-disabled' : ''
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

      <style jsx>{`
        .fa-disabled {
          opacity: 0.3;
        }
      `}</style>
    </div>
  )
}

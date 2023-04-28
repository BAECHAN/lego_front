import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect, useRef } from 'react'
import useFilters from 'pages/api/query/useFilters'
import {
  ObjT_Str,
  ObjT_StrArr,
  ProductFilterCountT,
  ProductFilterT,
  ThemeT,
} from 'types'
import { selectedFilterSelector } from 'state/atoms'
import { useRecoilState } from 'recoil'

export default function SidebarFilterAccordian(prop: {
  label: string
  themes: ThemeT
  setPage: React.Dispatch<React.SetStateAction<number>>
}) {
  const [isOpen, setIsOpen] = useState(true)

  const { data: filters } = useFilters(prop.themes)

  const data: ProductFilterT[] = filters?.productFilter

  let filterCount: ProductFilterCountT = {
    filter_price1: 0,
    filter_price2: 0,
    filter_price3: 0,
    filter_price4: 0,
    filter_price5: 0,
    filter_price6: 0,

    filter_ages1: 0,
    filter_ages2: 0,
    filter_ages3: 0,
    filter_ages4: 0,
    filter_ages5: 0,
    filter_ages6: 0,
    filter_ages7: 0,
    filter_ages8: 0,

    filter_sale_enabled1: 0,
    filter_sale_enabled2: 0,
    filter_sale_enabled3: 0,
    filter_sale_enabled4: 0,

    filter_discounting1: 0,
    filter_discounting2: 0,

    filter_pieces1: 0,
    filter_pieces2: 0,
    filter_pieces3: 0,
    filter_pieces4: 0,
    filter_pieces5: 0,
    filter_pieces6: 0,
    filter_pieces7: 0,
  }

  data?.map((item) => {
    // 가격
    if (item.filter_price === 1) {
      // 0 ~ 20,000원 미만
      ++filterCount.filter_price1
    } else if (item.filter_price === 2) {
      // 20,000 ~ 50,000원 미만
      ++filterCount.filter_price2
    } else if (item.filter_price === 3) {
      // 50,000 ~ 100,000원 미만
      ++filterCount.filter_price3
    } else if (item.filter_price === 4) {
      // 100,000 ~ 200,000원 미만
      ++filterCount.filter_price4
    } else if (item.filter_price === 5) {
      // 200,000원 이상
      ++filterCount.filter_price5
    }

    // 연령
    if (item.filter_ages === 1) {
      // 18세 이상
      ++filterCount.filter_ages1
    } else if (item.filter_ages === 2) {
      // 16세 이상
      ++filterCount.filter_ages2
    } else if (item.filter_ages === 3) {
      // 14세 이상
      ++filterCount.filter_ages3
    } else if (item.filter_ages === 4) {
      // 9세 이상
      ++filterCount.filter_ages4
    } else if (item.filter_ages === 5) {
      // 6세 이상
      ++filterCount.filter_ages5
    } else if (item.filter_ages === 6) {
      // 4세 이상
      ++filterCount.filter_ages6
    } else if (item.filter_ages === 7) {
      // 2세 이상
      ++filterCount.filter_ages7
    }

    // 구매가능 여부
    if (item.filter_sale_enabled === 0) {
      // 단종
      ++filterCount.filter_sale_enabled1
    } else if (item.filter_sale_enabled === 1) {
      // 구매가능
      ++filterCount.filter_sale_enabled2
    } else if (item.filter_sale_enabled === 8) {
      // 출시예정
      ++filterCount.filter_sale_enabled3
    } else if (item.filter_sale_enabled === 9) {
      // 일시품절
      ++filterCount.filter_sale_enabled4
    }

    // 할인 여부
    if (item.filter_discounting === 0) {
      // 정가
      ++filterCount.filter_discounting1
    } else if (item.filter_discounting === 1) {
      // 할인중
      ++filterCount.filter_discounting2
    }

    // 부품 수
    if (item.filter_pieces === 1) {
      // 0 ~ 100개 미만
      ++filterCount.filter_pieces1
    } else if (item.filter_pieces === 2) {
      // 100 ~ 250개 미만
      ++filterCount.filter_pieces2
    } else if (item.filter_pieces === 3) {
      // 250 ~ 500개 미만
      ++filterCount.filter_pieces3
    } else if (item.filter_pieces === 4) {
      // 500 ~ 1,000개 미만onChange
      ++filterCount.filter_pieces4
    } else if (item.filter_pieces === 5) {
      // 1,000 ~ 2,000개 미만
      ++filterCount.filter_pieces5
    } else if (item.filter_pieces === 6) {
      // 2,000개 이상
      ++filterCount.filter_pieces6
    }
  })

  const filterPriceObjArr: {
    id: string
    label: string
    title: string
  }[] = [
    {
      id: 'filter_price1',
      label: '0원 - 19,999원',
      title: '가격이 0원 이상 2만원 미만 상품 보기',
    },
    {
      id: 'filter_price2',
      label: '20,000원 - 49,999원',
      title: '가격이 2만원 이상 5만원 미만 상품 보기',
    },
    {
      id: 'filter_price3',
      label: '50,000원 - 99,999원',
      title: '가격이 5만원 이상 10만원 미만 상품 보기',
    },
    {
      id: 'filter_price4',
      label: '100,000원 - 199,999원',
      title: '가격이 10만원 이상 20만원 미만 상품 보기',
    },
    {
      id: 'filter_price5',
      label: '200,000원+',
      title: '가격이 20만원 이상 상품 보기',
    },
  ]

  const filterAgeObj: ObjT_Str = {
    filter_ages7: '2',
    filter_ages6: '4',
    filter_ages5: '6',
    filter_ages4: '9',
    filter_ages3: '14',
    filter_ages2: '16',
    filter_ages1: '18',
  }

  const filterSaleEnabledObj: ObjT_Str = {
    filter_sale_enabled1: '단종',
    filter_sale_enabled2: '구매가능',
    filter_sale_enabled3: '출시예정',
    filter_sale_enabled4: '일시품절',
  }

  const filterDiscountingObj: ObjT_StrArr = {
    filter_discounting1: ['정가 판매', '정가'],
    filter_discounting2: ['할인 판매', '할인중'],
  }

  const filterPiecesObjArr: {
    id: string
    min: number
    max: number
  }[] = [
    { id: 'filter_pieces1', min: 1, max: 99 },
    { id: 'filter_pieces2', min: 100, max: 249 },
    { id: 'filter_pieces3', min: 250, max: 499 },
    { id: 'filter_pieces4', min: 500, max: 999 },
    { id: 'filter_pieces5', min: 1000, max: 1999 },
    { id: 'filter_pieces6', min: 2000, max: Infinity },
  ]

  const [selectedFilter, setSelectedFilter] = useRecoilState(
    selectedFilterSelector
  )

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    prop.setPage(1)

    setSelectedFilter({
      ...selectedFilter,
      [e.currentTarget.id]: e.currentTarget.checked ? 1 : 0,
    })
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="필터 항목 열기"
        className="btn-accordion w-full my-3"
      >
        <span className="btn-label float-left">{prop.label}</span>
        <FontAwesomeIcon
          icon={isOpen ? faAngleUp : faAngleDown}
          width="20px"
          height="20px"
          style={{
            position: 'relative',
            display: 'inline-block',
            float: 'right',
            right: '5px',
            top: '4px',
          }}
        />

        {prop.label == '가격(원)' ? (
          <div className="btn-option">
            <ul className={isOpen ? 'open' : ''}>
              {filterPriceObjArr.map((filterObj) => {
                return (
                  filterCount[filterObj.id] > 0 && (
                    <li
                      onClick={(event) => event.stopPropagation()}
                      key={filterObj.id}
                      title={filterObj.title}
                    >
                      <input
                        type="checkbox"
                        onInput={handleChangeCheck}
                        id={filterObj.id}
                        defaultChecked={
                          selectedFilter[filterObj.id] ? true : false
                        }
                      />
                      <label htmlFor={filterObj.id}>
                        {filterObj.label}&nbsp;
                        <span>[{filterCount[filterObj.id]}]</span>
                      </label>
                    </li>
                  )
                )
              })}
            </ul>
          </div>
        ) : null}

        {prop.label == '연령' ? (
          <div className="btn-option">
            <ul className={isOpen ? 'open' : ''}>
              {Object.keys(filterAgeObj).map((key) => {
                return (
                  filterCount[key] > 0 && (
                    <li
                      onClick={(event) => event.stopPropagation()}
                      key={key}
                      title={`${filterAgeObj[key]}세 이상 상품 보기`}
                    >
                      <input
                        type="checkbox"
                        onInput={handleChangeCheck}
                        id={key}
                        defaultChecked={selectedFilter[key] ? true : false}
                      />
                      <label htmlFor={key}>
                        {filterAgeObj[key]}+ <span>[{filterCount[key]}]</span>
                      </label>
                    </li>
                  )
                )
              })}
            </ul>
          </div>
        ) : null}

        {prop.label == '구매가능' ? (
          <div className="btn-option">
            <ul className={isOpen ? 'open' : ''}>
              {Object.keys(filterSaleEnabledObj).map((key) => {
                return (
                  filterCount[key] > 0 && (
                    <li
                      onClick={(event) => event.stopPropagation()}
                      key={key}
                      title={`${filterSaleEnabledObj[key]} 상품 보기`}
                    >
                      <input
                        type="checkbox"
                        onInput={handleChangeCheck}
                        id={key}
                        defaultChecked={selectedFilter[key] ? true : false}
                      />
                      <label htmlFor={key}>
                        {filterSaleEnabledObj[key]}{' '}
                        <span>[{filterCount[key]}]</span>
                      </label>
                    </li>
                  )
                )
              })}
            </ul>
          </div>
        ) : null}

        {prop.label == '할인여부' ? (
          <div className="btn-option">
            <ul className={isOpen ? 'open' : ''}>
              {Object.keys(filterDiscountingObj).map((key) => {
                return (
                  filterCount[key] > 0 && (
                    <li
                      onClick={(event) => event.stopPropagation()}
                      key={key}
                      title={`${filterDiscountingObj[key][0]} 상품 보기`}
                    >
                      <input
                        type="checkbox"
                        onInput={handleChangeCheck}
                        id={key}
                        defaultChecked={selectedFilter[key] ? true : false}
                      />
                      <label htmlFor={key}>
                        {filterDiscountingObj[key][1]}{' '}
                        <span>[{filterCount[key]}]</span>
                      </label>
                    </li>
                  )
                )
              })}
            </ul>
          </div>
        ) : null}

        {prop.label == '부품수' ? (
          <div className="btn-option">
            <ul className={isOpen ? 'open' : ''}>
              {filterPiecesObjArr.map((filterPiecesObj) => {
                return (
                  filterCount[filterPiecesObj.id] > 0 && (
                    <li
                      onClick={(event) => event.stopPropagation()}
                      key={filterPiecesObj.id}
                      title={
                        filterPiecesObj.max != Infinity
                          ? `부품수 ${filterPiecesObj.min}개 이상 ${
                              filterPiecesObj.max + 1
                            }개 미만 상품 보기`
                          : `부품수 ${filterPiecesObj.min}개 이상 상품 보기`
                      }
                    >
                      <input
                        type="checkbox"
                        onInput={handleChangeCheck}
                        id={filterPiecesObj.id}
                        defaultChecked={
                          selectedFilter[filterPiecesObj.id] ? true : false
                        }
                      />
                      <label htmlFor={filterPiecesObj.id}>
                        {filterPiecesObj.max != Infinity
                          ? `${filterPiecesObj.min}-${filterPiecesObj.max}`
                          : `${filterPiecesObj.min}+`}
                        <span>[{filterCount[filterPiecesObj.id]}]</span>
                      </label>
                    </li>
                  )
                )
              })}
            </ul>
          </div>
        ) : null}
      </button>
      <hr />
      <style jsx>{`
        span.btn-label {
          margin-left: 0px;
          user-select: none;
          :hover {
            font-weight: 700;
          }
        }

        .btn-option span {
          font-weight: 300;
          color: gray;
        }

        ul {
          text-align: left;
          padding-top: 0px;
          width: 100%;
          height: 0;
          opacity: 0;
          transition: all ease-in-out 0.2s;
          overflow: hidden;
        }

        ul.open {
          padding-top: 15px;
          height: auto;
          opacity: 1;
        }

        li {
          display: flex;
        }

        input[type='checkbox'] {
          width: 25px;
          height: 25px;
          margin-right: 5px;
          accent-color: orange;
        }

        label {
          width: 100%;
          position: relative;
          cursor: pointer;
          user-select: none;
          :hover {
            font-weight: 700;
          }
        }
      `}</style>
    </div>
  )
}

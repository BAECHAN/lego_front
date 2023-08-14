import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { productFilterInfoSelector } from 'state/atoms'
import { ProductFilterCountT, ProductFilterT, ThemeT } from 'types'

import useFilters from 'pages/api/query/useFilters'

import SidebarFilterItem from './SidebarFilterItem'

export default function SidebarFilterAccordian(props: { label: string; themes: ThemeT }) {
  const [isOpen, setIsOpen] = useState(true)

  const { data: filters } = useFilters(props.themes)

  const productFilter: ProductFilterT[] = filters?.data

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

  productFilter?.map((item) => {
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

  const filterInfo = useRecoilValue(productFilterInfoSelector)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} title="필터 항목 열기" className="btn-accordion w-full my-3">
        <span className="btn-label float-left">{props.label}</span>
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

        {props.label === '가격(원)' ? (
          <div className="btn-option">
            <ul className={isOpen ? 'open' : ''}>
              {filterInfo.filterPriceObjArr.map((filterObj) => {
                return filterCount[filterObj.id] > 0 && <SidebarFilterItem key={filterObj.id} filterObj={filterObj} filterCount={filterCount} />
              })}
            </ul>
          </div>
        ) : null}

        {props.label === '연령' ? (
          <div className="btn-option">
            <ul className={isOpen ? 'open' : ''}>
              {filterInfo.filterAgeObjArr.map((filterObj) => {
                return filterCount[filterObj.id] > 0 && <SidebarFilterItem key={filterObj.id} filterObj={filterObj} filterCount={filterCount} />
              })}
            </ul>
          </div>
        ) : null}

        {props.label === '구매가능' ? (
          <div className="btn-option">
            <ul className={isOpen ? 'open' : ''}>
              {filterInfo.filterSaleEnabledObjArr.map((filterObj) => {
                return filterCount[filterObj.id] > 0 && <SidebarFilterItem key={filterObj.id} filterObj={filterObj} filterCount={filterCount} />
              })}
            </ul>
          </div>
        ) : null}

        {props.label === '할인여부' ? (
          <div className="btn-option">
            <ul className={isOpen ? 'open' : ''}>
              {filterInfo.filterDiscountingObjArr.map((filterObj) => {
                return filterCount[filterObj.id] > 0 && <SidebarFilterItem key={filterObj.id} filterObj={filterObj} filterCount={filterCount} />
              })}
            </ul>
          </div>
        ) : null}

        {props.label === '부품수' ? (
          <div className="btn-option mb-5">
            <ul className={isOpen ? 'open' : ''}>
              {filterInfo.filterPiecesObjArr.map((filterObj) => {
                return filterCount[filterObj.id] > 0 && <SidebarFilterItem key={filterObj.id} filterObj={filterObj} filterCount={filterCount} />
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

        ul {
          text-align: left;
          padding-top: 0px;
          width: 100%;
          height: 0;
          opacity: 0;
          transition: all ease-in-out 0.2s;
          overflow: hidden;

          &.open {
            padding-top: 15px;
            height: auto;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

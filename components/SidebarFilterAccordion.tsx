import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import useFilters from 'pages/api/query/useFilters'
import { ProductFilterCountT, ProductFilterT, ThemeT } from 'types'

export default function SidebarFilterAccordian(prop: {
  label: string
  themes: ThemeT
}) {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const elmntLi = document.querySelectorAll('li')

    elmntLi.forEach((element) => {
      element.addEventListener('click', function (event) {
        event?.stopPropagation()
      })
    })
  })

  const { data: filters } = useFilters(prop.themes)

  const data: ProductFilterT[] = filters?.productFilter

  let filterCount = {
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
      // 500 ~ 1,000개 미만
      ++filterCount.filter_pieces4
    } else if (item.filter_pieces === 5) {
      // 1,000 ~ 2,000개 미만
      ++filterCount.filter_pieces5
    } else if (item.filter_pieces === 6) {
      // 2,000개 이상
      ++filterCount.filter_pieces6
    }
  })

  console.log(filterCount)

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
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
            {filterCount.filter_price1 > 0 ? (
              <li>
                <input type="checkbox" id="filter_price1" />
                <label htmlFor="filter_price1">
                  0원 - 19,999원 <span>[{filterCount.filter_price1}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_price2 > 0 ? (
              <li>
                <input type="checkbox" id="filter_price2" />
                <label htmlFor="filter_price2">
                  20,000원 - 49,999원 <span>[{filterCount.filter_price2}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_price3 > 0 ? (
              <li>
                <input type="checkbox" id="filter_price3" />
                <label htmlFor="filter_price3">
                  50,000원 - 99,999원 <span>[{filterCount.filter_price3}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_price4 > 0 ? (
              <li>
                <input type="checkbox" id="filter_price4" />
                <label htmlFor="filter_price4">
                  100,000원 - 199,999원{' '}
                  <span>[{filterCount.filter_price4}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_price5 > 0 ? (
              <li>
                <input type="checkbox" id="filter_price5" />
                <label htmlFor="filter_price5">
                  200,000원+ <span>[{filterCount.filter_price5}]</span>
                </label>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}

      {prop.label == '연령' ? (
        <div className="btn-option">
          <ul className={isOpen ? 'open' : ''}>
            {filterCount.filter_ages7 > 0 ? (
              <li>
                <input type="checkbox" id="filter_ages7" />
                <label htmlFor="filter_ages7">
                  2+ <span>[{filterCount.filter_ages7}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_ages6 > 0 ? (
              <li>
                <input type="checkbox" id="filter_ages6" />
                <label htmlFor="filter_ages6">
                  4+ <span>[{filterCount.filter_ages6}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_ages5 > 0 ? (
              <li>
                <input type="checkbox" id="filter_ages5" />
                <label htmlFor="filter_ages5">
                  6+ <span>[{filterCount.filter_ages5}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_ages4 > 0 ? (
              <li>
                <input type="checkbox" id="filter_ages4" />
                <label htmlFor="filter_ages4">
                  9+ <span>[{filterCount.filter_ages4}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_ages3 > 0 ? (
              <li>
                <input type="checkbox" id="filter_ages3" />
                <label htmlFor="filter_ages3">
                  14+ <span>[{filterCount.filter_ages3}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_ages2 > 0 ? (
              <li>
                <input type="checkbox" id="filter_ages2" />
                <label htmlFor="filter_ages2">
                  16+ <span>[{filterCount.filter_ages2}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_ages1 > 0 ? (
              <li>
                <input type="checkbox" id="filter_ages1" />
                <label htmlFor="filter_ages1">
                  18+ <span>[{filterCount.filter_ages1}]</span>
                </label>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}

      {prop.label == '구매가능' ? (
        <div className="btn-option">
          <ul className={isOpen ? 'open' : ''}>
            {/* {
                filterCount.filter_sale_enabled1 > 0 
                ? <li>
                    <input type="checkbox" id="filter_sale_enabled1" />
                    <label htmlFor="filter_sale_enabled1">단종 <span>[{filterCount.filter_sale_enabled1}]</span></label>
                  </li>
                : null
              } */}
            {filterCount.filter_sale_enabled2 > 0 ? (
              <li>
                <input type="checkbox" id="filter_sale_enabled2" />
                <label htmlFor="filter_sale_enabled2">
                  구매가능 <span>[{filterCount.filter_sale_enabled2}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_sale_enabled3 > 0 ? (
              <li>
                <input type="checkbox" id="filter_sale_enabled3" />
                <label htmlFor="filter_sale_enabled3">
                  출시예정 <span>[{filterCount.filter_sale_enabled3}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_sale_enabled4 > 0 ? (
              <li>
                <input type="checkbox" id="filter_sale_enabled4" />
                <label htmlFor="filter_sale_enabled4">
                  일시품절 <span>[{filterCount.filter_sale_enabled4}]</span>
                </label>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}

      {prop.label == '할인여부' ? (
        <div className="btn-option">
          <ul className={isOpen ? 'open' : ''}>
            {filterCount.filter_discounting1 > 0 ? (
              <li>
                <input type="checkbox" id="filter_discounting1" />
                <label htmlFor="filter_discounting1">
                  정가 <span>[{filterCount.filter_discounting1}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_discounting2 > 0 ? (
              <li>
                <input type="checkbox" id="filter_discounting2" />
                <label htmlFor="filter_discounting2">
                  할인중 <span>[{filterCount.filter_discounting2}]</span>
                </label>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}

      {prop.label == '부품수' ? (
        <div className="btn-option">
          <ul className={isOpen ? 'open' : ''}>
            {filterCount.filter_pieces1 > 0 ? (
              <li>
                <input type="checkbox" id="filter_pieces1" />
                <label htmlFor="filter_pieces1">
                  1-99 <span>[{filterCount.filter_pieces1}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_pieces2 > 0 ? (
              <li>
                <input type="checkbox" id="filter_pieces2" />
                <label htmlFor="filter_pieces2">
                  100-249 <span>[{filterCount.filter_pieces2}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_pieces3 > 0 ? (
              <li>
                <input type="checkbox" id="filter_pieces3" />
                <label htmlFor="filter_pieces3">
                  250-499 <span>[{filterCount.filter_pieces3}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_pieces4 > 0 ? (
              <li>
                <input type="checkbox" id="filter_pieces4" />
                <label htmlFor="filter_pieces4">
                  500-999 <span>[{filterCount.filter_pieces4}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_pieces5 > 0 ? (
              <li>
                <input type="checkbox" id="filter_pieces5" />
                <label htmlFor="filter_pieces5">
                  1000-1999 <span>[{filterCount.filter_pieces5}]</span>
                </label>
              </li>
            ) : null}
            {filterCount.filter_pieces6 > 0 ? (
              <li>
                <input type="checkbox" id="filter_pieces6" />
                <label htmlFor="filter_pieces6">
                  2000+ <span>[{filterCount.filter_pieces6}]</span>
                </label>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}

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

        input[type='checkbox'] {
          width: 25px;
          height: 25px;
          margin-right: 5px;
          accent-color: orange;
        }

        label {
          position: relative;
          top: -7px;
          cursor: pointer;
          user-select: none;
          :hover {
            font-weight: 700;
          }
        }
      `}</style>
    </button>
  )
}

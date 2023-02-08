import { ThemeT } from 'types'
import SidebarFilterAccordian from './SidebarFilterAccordion'
import SidebarFilterSelected from './SidebarFilterSelected'
import { useRecoilValue } from 'recoil'
import { selectedFilterSelector } from 'state/atoms'
type HelmetType = {
  pathname: string
}

export default function SidebarFilter(props: { themes: ThemeT }) {
  const selectedFilter = useRecoilValue(selectedFilterSelector)

  return (
    <aside className="filter mx-5 h-full">
      <div className="w-60">
        <div className="filter-option mb-3">
          {Object.values(selectedFilter).indexOf(1) > -1 ? (
            <SidebarFilterSelected />
          ) : null}
          <hr />
          <div className="my-3 leading-3">
            <ul>
              <li>
                <input type="checkbox" id="ea" />
                <label htmlFor="ea">재고 있는 상품만 표시</label>
              </li>
            </ul>
          </div>
          <hr />
          <SidebarFilterAccordian label="가격(원)" themes={props.themes} />
          <hr />
          <SidebarFilterAccordian label="연령" themes={props.themes} />
          <hr />
          <SidebarFilterAccordian label="구매가능" themes={props.themes} />
          <hr />
          <SidebarFilterAccordian label="할인여부" themes={props.themes} />
          <hr />
          <SidebarFilterAccordian label="부품수" themes={props.themes} />
          <hr />
        </div>
      </div>

      <style jsx>{`
        .btn-reset-option {
          background-color: #ddd;
          width: inherit;
          height: 40px;
        }

        aside.filter input[type='checkbox'] {
          width: 25px;
          height: 25px;
          margin-right: 5px;
          accent-color: orange;
        }

        /* aside.filter .filter-option > div {
          padding: 0px 0px 10px 5px;
        } */

        aside.filter label {
          position: relative;
          top: -7px;
          cursor: pointer;
          user-select: none;
          :hover {
            font-weight: 700;
          }
        }
      `}</style>
    </aside>
  )
}

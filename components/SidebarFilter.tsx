import { ThemeT } from 'types'
import SidebarFilterAccordian from './SidebarFilterAccordion'

type HelmetType = {
  pathname: string
}

export default function SidebarFilter(props: { themes: ThemeT }) {
  return (
    <aside className="filter mx-5 border border-gray-300 border-solid">
      <div className="w-60">
        <button type="button" className="btn-reset-option">
          초기화
        </button>
        <div className="filter-option my-3">
          <div>
            <ul>
              <li>
                <input type="checkbox" id="ea" />
                <label htmlFor="ea">재고 있는 상품만 표시</label>
              </li>
            </ul>
          </div>
          <hr />
          <div>
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

        aside.filter .filter-option > div {
          padding: 0px 0px 10px 5px;
        }

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

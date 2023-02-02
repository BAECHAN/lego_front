import SidebarFilterDropDown from './SidebarFilterDropDown'

type HelmetType = {
  pathname: string
}

export default function SidebarFilter() {
  return (
    <aside className="filter mx-5 border border-gray-300 border-solid">
      <div className="w-60">
        <button type="button" className="btn-reset-option">
          초기화
        </button>
        <div className="filter-option">
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
            <SidebarFilterDropDown label="가격(원)" />
          </div>
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

        aside.filter .filter-option > div {
          padding: 10px 0px 10px 5px;
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

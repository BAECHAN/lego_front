import { ThemeT } from 'types'
import SidebarFilterAccordian from './SidebarFilterAccordion'
import SidebarFilterSelected from './SidebarFilterSelected'
import { useRecoilValue } from 'recoil'
import { selectedFilterSelector } from 'state/atoms'

export default function SidebarFilter(props: { themes: ThemeT }) {
  const selectedFilter = useRecoilValue(selectedFilterSelector)

  return (
    <aside className="filter mx-5 h-full sticky top-0 overflow-y-scroll overflow-x-hidden w-96">
      <div className="h-[700px]">
        <div className="filter-option mb-3">
          {Object.values(selectedFilter).indexOf(1) > -1 ? (
            <SidebarFilterSelected />
          ) : null}
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

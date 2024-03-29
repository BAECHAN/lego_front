import { useRecoilValue } from 'recoil'
import { selectedFilterSelector } from 'state/atoms'
import { ThemeT } from 'types'

import SidebarFilterAccordian from './SidebarFilterAccordion'
import SidebarFilterSelected from './SidebarFilterSelected'

export default function SidebarFilter(props: { themes: ThemeT }) {
  const selectedFilter = useRecoilValue(selectedFilterSelector)

  const labelList: string[] = ['가격(원)', '연령', '구매가능', '할인여부', '부품수']

  return (
    <aside className="filter mx-5 h-[40rem] sticky top-0 overflow-y-scroll overflow-x-hidden desktop:w-96 desktop:min-w-[240px] mobile:w-64">
      <div>
        <div className="filter-option mb-3">
          {Object.values(selectedFilter).indexOf(1) > -1 ? <SidebarFilterSelected /> : null}
          <hr />

          {labelList.map((item: string, index: number) => {
            return <SidebarFilterAccordian key={index} label={item} themes={props.themes} />
          })}
        </div>
      </div>

      <style jsx>{`
        .btn-reset-option {
          background-color: #ddd;
          width: inherit;
          height: 40px;
        }

        aside.filter {
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
        }
      `}</style>
    </aside>
  )
}

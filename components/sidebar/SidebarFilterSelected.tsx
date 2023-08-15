import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { productFilterInfoSelector, selectedFilterSelector } from 'state/atoms'
import { ProductFilterArrT } from 'types'

import FontAwesomeXmark from '../FontAwesomeXmark'

export default function SidebarFilterSelected() {
  const [selectedFilter, setSelectedFilter] = useRecoilState(selectedFilterSelector)

  const handleClickRecoilReset = useResetRecoilState(selectedFilterSelector)

  const handleClickDeleteTag = (filter: string) => {
    setSelectedFilter({
      ...selectedFilter,
      [filter]: 0,
    })
  }

  const filterInfo = useRecoilValue(productFilterInfoSelector)

  const SelectedFilterButton = (props: { arr: ProductFilterArrT }) => {
    return (
      <div>
        {props.arr.map(({ id, label, title }) => {
          let labelPrefix = ''

          if (props.arr === filterInfo.filterAgeObjArr) {
            labelPrefix = '연령 '
          } else if (props.arr === filterInfo.filterPiecesObjArr) {
            labelPrefix = '부품수 '
          }

          return (
            selectedFilter[id] === 1 && (
              <button type="button" key={id} title={`${title} 필터 삭제 버튼`} className="btn-selected-filter" onClick={() => handleClickDeleteTag(id)}>
                {labelPrefix}
                {label}
                <FontAwesomeXmark />
              </button>
            )
          )
        })}
      </div>
    )
  }

  const buttonStyles = `
    .btn-selected-filter {
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 14px;
      line-height: 20px;
      margin-top: 12px;
      margin-right: 8px;
      border: 0.5px solid black;
      color: gray;
    }
    .reset {
      color: white;
      background-color: black;
    }
  `

  return (
    <div>
      <hr />
      <div className="py-3 w-full">
        <div>선택한 필터</div>
        <button type="button" title="선택한 필터 모두 삭제" onClick={handleClickRecoilReset} className="btn-selected-filter reset">
          모든 필터 삭제
        </button>
        <SelectedFilterButton arr={filterInfo.filterPriceObjArr} />
        <SelectedFilterButton arr={filterInfo.filterAgeObjArr} />
        <SelectedFilterButton arr={filterInfo.filterSaleEnabledObjArr} />
        <SelectedFilterButton arr={filterInfo.filterDiscountingObjArr} />
        <SelectedFilterButton arr={filterInfo.filterPiecesObjArr} />
      </div>
      <style jsx>{buttonStyles}</style>
    </div>
  )
}

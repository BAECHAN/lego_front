import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { productFilterInfoSelector, selectedFilterSelector } from 'state/atoms'
import FontAwesomeXmark from '../FontAwesomeXmark'

export default function SidebarFilterSelected() {
  const [selectedFilter, setSelectedFilter] = useRecoilState(
    selectedFilterSelector
  )

  const handleClickRecoilReset = useResetRecoilState(selectedFilterSelector)

  const handleClickDeleteTag = (filter: string) => {
    setSelectedFilter({
      ...selectedFilter,
      [filter]: 0,
    })
  }

  const filterInfo = useRecoilValue(productFilterInfoSelector)

  return (
    <div>
      <hr />
      <div className="py-3 w-full">
        <div>선택한 필터</div>
        <button
          type="button"
          title="선택한 필터 모두 삭제"
          onClick={handleClickRecoilReset}
          className="btn-selected-filter reset"
        >
          모든 필터 삭제
        </button>
        {filterInfo.filterPriceObjArr.map(({ id, label, title }) => {
          return selectedFilter[id] === 1 ? (
            <button
              type="button"
              key={id}
              title={`${title} 필터 삭제 버튼`}
              className="btn-selected-filter"
              onClick={() => handleClickDeleteTag(id)}
            >
              {label}
              <FontAwesomeXmark />
            </button>
          ) : null
        })}

        {filterInfo.filterAgeObjArr.map(({ id, label, title }) => {
          return selectedFilter[id] === 1 ? (
            <button
              type="button"
              key={id}
              title={`${title} 필터 삭제 버튼`}
              className="btn-selected-filter"
              onClick={() => handleClickDeleteTag(id)}
            >
              연령 {label}
              <FontAwesomeXmark />
            </button>
          ) : null
        })}

        {filterInfo.filterSaleEnabledObjArr.map(({ id, label, title }) => {
          return selectedFilter[id] === 1 ? (
            <button
              type="button"
              key={id}
              title={`${title} 필터 삭제 버튼`}
              className="btn-selected-filter"
              onClick={() => handleClickDeleteTag(id)}
            >
              {label}
              <FontAwesomeXmark />
            </button>
          ) : null
        })}

        {filterInfo.filterDiscountingObjArr.map(({ id, label, title }) => {
          return selectedFilter[id] === 1 ? (
            <button
              type="button"
              key={id}
              title={`${title} 필터 삭제 버튼`}
              className="btn-selected-filter"
              onClick={() => handleClickDeleteTag(id)}
            >
              {label}
              <FontAwesomeXmark />
            </button>
          ) : null
        })}

        {filterInfo.filterPiecesObjArr.map(({ id, label, title }) => {
          return selectedFilter[id] === 1 ? (
            <button
              type="button"
              key={id}
              title={`${title} 필터 삭제 버튼`}
              className="btn-selected-filter"
              onClick={() => handleClickDeleteTag(id)}
            >
              부품수 {label}
              <FontAwesomeXmark />
            </button>
          ) : null
        })}
      </div>

      <style jsx>{`
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
      `}</style>
    </div>
  )
}

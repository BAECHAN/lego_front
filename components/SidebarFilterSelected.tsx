import { useRecoilState, useResetRecoilState } from 'recoil'
import { selectedFilterSelector } from 'state/atoms'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'

export default function SidebarFilterSelected() {
  const [selectedFilter, setSelectedFilter] = useRecoilState(
    selectedFilterSelector
  )

  const handleClickRecoilReset = useResetRecoilState(selectedFilterSelector)

  const handleClickBtnReset = () => {
    document
      .querySelectorAll('.filter-option input[type=checkbox]')
      .forEach((item) => {
        ;(item as HTMLInputElement).checked = false
      })
  }

  const handleClickDeleteTag = (filter: string) => {
    setSelectedFilter({
      ...selectedFilter,
      [filter]: 0,
    })

    document
      .querySelectorAll('.filter-option input[type=checkbox]')
      .forEach((item) => {
        item.id === filter ? ((item as HTMLInputElement).checked = false) : null
      })
  }

  return (
    <div>
      <hr />
      <div className="py-3 w-full">
        <div>선택한 필터</div>
        <button
          type="button"
          onClick={() => {
            handleClickRecoilReset(), handleClickBtnReset()
          }}
          className="btn-selected-filter reset"
        >
          모든 필터 지우기
        </button>
        {selectedFilter.filter_price1 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_price1')
            }}
          >
            0원 - 19,999원
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_price2 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_price2')
            }}
          >
            20,000원 - 49,999원
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_price3 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_price3')
            }}
          >
            50,000원 - 99,999원
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_price4 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_price4')
            }}
          >
            100,000원 - 199,999원
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_price5 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_price5')
            }}
          >
            200,000원+
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}

        {selectedFilter.filter_ages7 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_ages7')
            }}
          >
            연령 2+
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_ages6 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_ages6')
            }}
          >
            연령 4+
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_ages5 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_ages5')
            }}
          >
            연령 6+
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_ages4 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_ages4')
            }}
          >
            연령 9+
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_ages3 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_ages3')
            }}
          >
            연령 14+
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_ages2 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_ages2')
            }}
          >
            연령 16+
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_ages1 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_ages1')
            }}
          >
            연령 18+
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}

        {selectedFilter.filter_sale_enabled1 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_sale_enabled1')
            }}
          >
            단종
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_sale_enabled2 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_sale_enabled2')
            }}
          >
            구매가능
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_sale_enabled3 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_sale_enabled3')
            }}
          >
            출시예정
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_sale_enabled4 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_sale_enabled4')
            }}
          >
            일시품절
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}

        {selectedFilter.filter_discounting1 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_discounting1')
            }}
          >
            정가
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_discounting2 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_discounting2')
            }}
          >
            할인중
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}

        {selectedFilter.filter_pieces1 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_pieces1')
            }}
          >
            부품수 1-99
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_pieces2 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_pieces2')
            }}
          >
            부품수 100-249
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_pieces3 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_pieces3')
            }}
          >
            부품수 250-499
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_pieces4 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_pieces4')
            }}
          >
            부품수 500-999
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_pieces5 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_pieces5')
            }}
          >
            부품수 1000-1999
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
        {selectedFilter.filter_pieces6 == 1 ? (
          <button
            type="button"
            className="btn-selected-filter"
            onClick={() => {
              handleClickDeleteTag('filter_pieces6')
            }}
          >
            부품수 2000+
            <FontAwesomeIcon
              icon={faXmark}
              width="10px"
              style={{
                display: 'inline',
                position: 'relative',
                top: '-2px',
                left: '6px',
              }}
            />
          </button>
        ) : null}
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

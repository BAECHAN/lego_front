import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { selectedFilterSelector } from 'state/atoms'
import { ObjT_Str, ProductFilterCountT } from 'types'

export default function SidebarFilterItem(props: {
  filterObj: ObjT_Str
  filterCount: ProductFilterCountT
}) {
  const [selectedFilter, setSelectedFilter] = useRecoilState(
    selectedFilterSelector
  )

  const [isChecked, setIsChecked] = useState(false)

  /** 상세페이지에서 뒤로가기 시 필터 남겨두기 */
  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilter({
      ...selectedFilter,
      [e.currentTarget.id]: e.currentTarget.checked ? 1 : 0,
    })
  }

  useEffect(() => {
    selectedFilter[props.filterObj.id] == 0
      ? setIsChecked(false)
      : setIsChecked(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter[props.filterObj.id]])

  return (
    <li
      className="flex"
      onClick={(event) => event.stopPropagation()}
      title={props.filterObj.title}
    >
      <input
        type="checkbox"
        onChange={handleChangeCheck}
        id={props.filterObj.id}
        checked={isChecked}
      />
      <label htmlFor={props.filterObj.id}>
        {props.filterObj.label}&nbsp;
        <span>[{props.filterCount[props.filterObj.id]}]</span>
      </label>

      <style jsx>{`
        li {
          > * {
            cursor: pointer;
          }

          input[type='checkbox'] {
            width: 25px;
            height: 25px;
            margin-right: 5px;
            accent-color: orange;
          }

          label {
            width: 100%;
            position: relative;
            user-select: none;
            :hover {
              font-weight: 700;
            }

            span {
              font-weight: 300;
              color: gray;
            }
          }
        }
      `}</style>
    </li>
  )
}

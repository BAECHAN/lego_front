import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'

export default function SidebarFilterDropDown(prop: { label: string }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const elmntLi = document.querySelectorAll('li')

    elmntLi.forEach((element) => {
      element.addEventListener('click', function (event) {
        event?.stopPropagation()
      })
    })
  })

  return (
    <button onClick={() => setIsOpen(!isOpen)} className="btn-dropdown">
      <span className="btn-label">{prop.label}</span>
      <FontAwesomeIcon
        icon={isOpen ? faAngleUp : faAngleDown}
        width="20px"
        height="20px"
        style={{
          position: 'relative',
          marginLeft: '150px',
          top: '-2px',
          display: 'inline',
        }}
      />
      <div>
        {prop.label == '가격(원)' ? (
          <ul className={isOpen ? 'open' : ''}>
            <li>
              <input type="checkbox" id="price1" />
              <label htmlFor="price1">0원 - 25,000 원 </label>
            </li>
            <li>
              <input type="checkbox" id="price2" />
              <label htmlFor="price2">25,000원 - 50,000 원 </label>
            </li>
            <li>
              <input type="checkbox" id="price3" />
              <label htmlFor="price3">50,000원 - 75,000 원 </label>
            </li>
            <li>
              <input type="checkbox" id="price4" />
              <label htmlFor="price4">75,000원 - 100,000 원 </label>
            </li>
          </ul>
        ) : null}
      </div>

      <style jsx>{`
        span.btn-label {
          user-select: none;
          :hover {
            font-weight: 700;
          }
        }

        ul {
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

        li {
          float: left;
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

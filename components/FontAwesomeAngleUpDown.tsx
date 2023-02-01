import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function FontAwesomeAngleUpDown(prop: { label: string }) {
  const [isUp, setIsUp] = useState(false)

  return (
    <button onClick={() => setIsUp(!isUp)}>
      <span className="btn-label">{prop.label}</span>
      <FontAwesomeIcon
        icon={isUp ? faAngleDown : faAngleUp}
        width="20px"
        height="20px"
        style={{
          position: 'relative',
          marginLeft: '120px',
          top: '-2px',
          display: 'inline',
        }}
      />
      <style jsx>{`
        span.btn-label {
          user-select: none;
          :hover {
            font-weight: 700;
          }
        }
      `}</style>
    </button>
  )
}

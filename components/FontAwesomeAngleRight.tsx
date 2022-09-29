import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FontAwesomeAngleRight() {
  return (
    <FontAwesomeIcon
      icon={faAngleRight}
      width="15px"
      height="15px"
      style={{
        position: 'relative',
        marginLeft: '5px',
        top: '-2px',
        display: 'inline',
      }}
    />
  )
}

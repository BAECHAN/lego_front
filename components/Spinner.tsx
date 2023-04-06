import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function Spinner() {
  return (
    <FontAwesomeIcon
      icon={faSpinner}
      width="400px"
      height="400px"
      style={{
        position: 'relative',
      }}
      size="6x"
      className="fa-spin"
    />
  )
}

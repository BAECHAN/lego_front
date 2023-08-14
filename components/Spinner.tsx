import '@fortawesome/fontawesome-svg-core/styles.css'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Spinner() {
  return (
    <div className="spinner-container">
      <FontAwesomeIcon icon={faSpinner} width="400px" height="400px" size="6x" className="fa-spin" />
      <style jsx>{`
        .spinner-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  )
}

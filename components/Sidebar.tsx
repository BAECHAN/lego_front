type HelmetType = {
  pathname: string
}

export default function Sidebar() {
  return (
    <aside className="sidebar m-5 border border-gray-300 border-solid">
      <div className="w-52">
        <button type="button" className="btn-reset-option">
          초기화
        </button>
      </div>

      <style jsx>{`
        .btn-reset-option {
          background-color: #ddd;
          width: inherit;
          height: 40px;
        }
      `}</style>
    </aside>
  )
}

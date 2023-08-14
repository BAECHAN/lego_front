import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ChangeEvent, useRef } from 'react'

export default function ButtonUploadFile(props: {
  newValue: string
  setNewValue: React.Dispatch<React.SetStateAction<string>>
  setUploadFile: React.Dispatch<React.SetStateAction<File | undefined>>
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClickButton = (type: string) => {
    if (type === 'defaultImage') {
      props.setNewValue('/default_profile.png')
    } else if (type === 'searchImage') {
      fileInputRef.current ? fileInputRef.current.click() : null
    }
  }

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null

    if (!file) {
      return false
    }

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = (e: any) => {
      if (reader.readyState === 2) {
        props.setNewValue(e.target.result)
        props.setUploadFile(file)
        const formData = new FormData()

        formData.append('image', file)
      }
    }
  }

  return (
    <div className="flex justify-around relative -left-2">
      <button type="button" className="flex h-8 leading-5 mr-3" title="사진 파일 찾기 버튼" onClick={() => handleClickButton('searchImage')}>
        사진 선택
        <FontAwesomeIcon icon={faEdit} width="23px" height="23px" style={{ marginLeft: '3px' }} />
      </button>

      <button type="button" className="flex h-8 leading-5" title="기본 사진으로 변경 버튼" onClick={() => handleClickButton('defaultImage')}>
        기본이미지로 변경
        <FontAwesomeIcon icon={faEdit} width="23px" height="23px" style={{ marginLeft: '3px' }} />
      </button>

      <input type="file" name="image_URL" accept="image/*" className="hidden" title="input image hidden" ref={fileInputRef} onChange={handleChangeImage} />

      <style jsx>{`
        button {
          background-color: gray;
          color: #fff;
          padding: 5px 10px;
          border-radius: 4px;

          :hover {
            background-color: #000;
          }
        }
      `}</style>
    </div>
  )
}

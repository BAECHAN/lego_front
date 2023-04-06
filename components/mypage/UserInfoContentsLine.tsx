import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import ButtonChange from './ButtonChange'
import Image from 'next/image'
import ButtonSave from './ButtonSave'
import ButtonUploadFile from './ButtonUploadFile'

export default function UserInfoContentsLine(props: {
  infoKey: string
  infoName: string
  infoValue?: any
  infoUpdate: boolean
  email: string
  onConnect?: boolean
}) {
  const [isChange, setIsChange] = useState(false)
  const [value, setValue] = useState(props.infoValue)
  const [newValue, setNewValue] = useState('')
  const [isEnter, setIsEnter] = useState(false)

  const infoInputRef = useRef<HTMLInputElement>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [uploadFile, setUploadFile] = useState<File>()

  useEffect(() => {
    if (infoInputRef && infoInputRef.current) {
      infoInputRef.current.focus()
    }
  }, [isChange])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEnter(true)
    }
  }

  return (
    <>
      <div
        className={`user-info-line flex w-full ${
          props.infoKey == 'image' ? 'h-56' : ''
        } my-4`}
      >
        <div className="user-info-cell flex w-full items-center">
          <div className="info-name w-1/6">
            <span title="회원정보 항목명">{props.infoName}</span>
          </div>

          <div className="w-1/6" />

          <div className="info-value">
            {props.infoKey == 'image' ? (
              isChange ? (
                <>
                  <Image
                    src={
                      newValue != '' && newValue.length > 0
                        ? newValue
                        : props.infoValue
                        ? props.infoValue
                        : '/default_profile.png'
                    }
                    width="200px"
                    height="200px"
                    alt="프로필 사진"
                    style={{
                      borderRadius: '100%',
                    }}
                  ></Image>
                  <ButtonSave
                    infoKey={props.infoKey}
                    email={props.email}
                    isChange={isChange}
                    setIsChange={setIsChange}
                    setValue={setValue}
                    setNewValue={setNewValue}
                    newValue={newValue}
                    isEnter={isEnter}
                    setIsEnter={setIsEnter}
                    uploadFile={uploadFile}
                    setUploadFile={setUploadFile}
                  />
                </>
              ) : (
                <Image
                  src={
                    props.infoValue ? props.infoValue : '/default_profile.png'
                  }
                  width="200px"
                  height="200px"
                  alt="프로필 사진"
                  style={{
                    borderRadius: '100%',
                  }}
                ></Image>
              )
            ) : isChange ? (
              <div className="info-update-contents">
                {props.infoKey == 'name' ? (
                  <>
                    <ul className="text-xs">
                      <li>※ 2~16자로 작성해주세요.</li>
                      <li>※ 중복 닉네임은 불가합니다.</li>
                      <li>※ 특수문자, 단일 초성은 불가합니다.</li>
                    </ul>
                    <input
                      type="text"
                      title={`새로운 ${props.infoName} 입력란`}
                      placeholder={`새로운 ${props.infoName} 등록`}
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid black',
                        paddingLeft: '5px',
                      }}
                      onChange={(e) => setNewValue(e.target.value)}
                      ref={infoInputRef}
                      onKeyDown={handleKeyDown}
                    />
                    <ButtonSave
                      infoKey={props.infoKey}
                      email={props.email}
                      isChange={isChange}
                      setIsChange={setIsChange}
                      setValue={setValue}
                      setNewValue={setNewValue}
                      newValue={newValue}
                      isEnter={isEnter}
                      setIsEnter={setIsEnter}
                      uploadFile={uploadFile}
                      setUploadFile={setUploadFile}
                    />
                  </>
                ) : null}
              </div>
            ) : (
              <p>{value}</p>
            )}
          </div>

          <div className="flex-grow" />

          <div className="info-update-button flex w-2/6 flex-row-reverse">
            {props.infoUpdate ? (
              props.infoKey == 'image' ? (
                isChange ? (
                  <ButtonUploadFile
                    newValue={newValue}
                    setNewValue={setNewValue}
                    fileInputRef={fileInputRef}
                    setUploadFile={setUploadFile}
                  />
                ) : (
                  <ButtonChange
                    infoKey={props.infoKey}
                    infoName={props.infoName}
                    isChange={isChange}
                    setIsChange={setIsChange}
                  />
                )
              ) : isChange ? null : (
                <ButtonChange
                  infoKey={props.infoKey}
                  infoName={props.infoName}
                  isChange={isChange}
                  setIsChange={setIsChange}
                />
              )
            ) : props.onConnect ? (
              <p className="text-blue-600 font-bold">ON</p>
            ) : null}
          </div>
          <div className="w-1/6" />
        </div>
      </div>
      <hr />
      <style jsx>{`
        .info-update-contents > * {
          margin-bottom: 12px;
        }

        .info-update-password > * {
          margin: 8px 0px;
        }
      `}</style>
    </>
  )
}

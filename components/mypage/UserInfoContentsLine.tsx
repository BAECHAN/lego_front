import Image from 'next/image'
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'

import useIsMobile from '@components/common/custom/isMobile'

import ButtonChange from './ButtonChange'
import ButtonSave from './ButtonSave'
import ButtonUploadFile from './ButtonUploadFile'

export default function UserInfoContentsLine(props: { infoKey: string; infoName: string; infoValue?: any; infoUpdate: boolean; email: string; onConnect?: boolean }) {
  const [isChange, setIsChange] = useState(false)
  const [value, setValue] = useState(props.infoValue)
  const [newValue, setNewValue] = useState('')
  const [isEnter, setIsEnter] = useState(false)

  const infoInputRef = useRef<HTMLInputElement>(null)

  const [uploadFile, setUploadFile] = useState<File>()

  const isMobile = useIsMobile()

  useEffect(() => {
    if (infoInputRef?.current) {
      infoInputRef.current.focus()
    }
  }, [isChange])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEnter(true)
    }
  }

  const changeComponent = (
    <div className="info-update-button flex desktop:w-2/6 desktop:flex-row-reverse mobile:justify-center mobile:mt-3">
      {props.infoUpdate ? (
        props.infoKey === 'image' ? (
          isChange ? (
            <ButtonUploadFile newValue={newValue} setNewValue={setNewValue} setUploadFile={setUploadFile} />
          ) : (
            <ButtonChange infoKey={props.infoKey} infoName={props.infoName} isChange={isChange} setIsChange={setIsChange} />
          )
        ) : isChange ? null : (
          <ButtonChange infoKey={props.infoKey} infoName={props.infoName} isChange={isChange} setIsChange={setIsChange} />
        )
      ) : props.infoKey === 'onKakao' || props.infoKey === 'onGoogle' ? (
        props.onConnect ? (
          <p className="text-blue-600 font-bold">ON</p>
        ) : (
          <p className="text-red-600 font-bold">OFF</p>
        )
      ) : null}
    </div>
  )

  return (
    <>
      <div className={`user-info-line desktop:flex mobile:block w-full ${props.infoKey === 'image' ? 'h-56' : ''} my-4`}>
        <div className="user-info-cell w-full flex items-center">
          <div className="info-name desktop:w-1/6 mobile:w-1/2 mobile:ml-3">
            <span title="회원정보 항목명">{props.infoName}</span>
          </div>

          <div className="desktop:w-1/6" />

          <div className="info-value">
            {props.infoKey === 'image' ? (
              isChange ? (
                <>
                  <Image
                    src={newValue != '' && newValue.length > 0 ? newValue : props.infoValue ? props.infoValue : '/default_profile.png'}
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
                  src={props.infoValue ? props.infoValue : '/default_profile.png'}
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
                {props.infoKey === 'name' ? (
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
              <p className="mobile:text-right">{value}</p>
            )}
          </div>

          <div className="desktop:flex-grow" />

          {isMobile ? null : changeComponent}
          <div className="desktop:w-1/6" />
        </div>
        {isMobile ? changeComponent : null}
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

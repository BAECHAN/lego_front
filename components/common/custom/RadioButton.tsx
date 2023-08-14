import Image from 'next/image'
import React from 'react'

export default function RadioButton(props: { group: string; contents: string; isChecked: boolean }) {
  return (
    <label>
      <input type="radio" name={props.group} defaultChecked={props.isChecked} />

      {props.contents != 'kakaoPay' ? (
        <span>{props.contents}</span>
      ) : (
        <span className="relative top-1 ml-1">
          <Image src="/payment_icon_yellow_medium.png" width="85px" height="40px" alt="카카오페이로 결제" />
        </span>
      )}

      <style jsx>{`
        label {
          font-size: 18px;
          line-height: 2rem;
          padding: 0.2em 0.4em;
        }

        span {
          vertical-align: middle;
        }

        [type='radio'] {
          vertical-align: middle;
          appearance: none;
          border: max(2px, 0.1em) solid gray;
          border-radius: 50%;
          width: 1.25em;
          height: 1.25em;
          transition: border 0.5s ease-in-out;

          &:checked {
            border: 0.4em solid blue;
          }

          &:focus-visible {
            outline-offset: max(2px, 0.1em);
            outline: max(2px, 0.1em) dotted blue;
          }

          &:hover {
            box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
            cursor: pointer;
          }

          &:disabled {
            background-color: lightgray;
            box-shadow: none;
            opacity: 0.7;
            cursor: not-allowed;
          }

          &:disabled + span {
            opacity: 0.7;
            cursor: not-allowed;
          }
        }

        /* Global CSS */
        fieldset {
          display: flex;
          justify-content: center;
          border: none;
          margin: 0;
          padding: 40px 20px;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
      `}</style>
    </label>
  )
}

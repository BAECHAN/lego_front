import { InputRegExpT } from 'types'

export const inputRegExp: InputRegExpT = {
  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  pw: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
  nickname: /^(?=.*[a-z0-9A-Z가-힣])[a-z0-9A-Z가-힣]{2,16}$/,
}

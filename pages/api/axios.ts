import axios from 'axios'
import { ParamT } from 'types'

export default async function axiosRequest(
  method: string,
  url: string,
  param: ParamT
) {
  const JSONParam = JSON.stringify(param)
  const config = {
    headers: { 'Content-Type': `application/json; charset=utf-8` },
    validateStatus: function (status: number) {
      return status < 500
    }, // 허용 가능한 HttpStatus 범위 지정 ( 500 미만 ), 이 경우 catch로 빠지는게 아닌 then으로
  }

  let response

  if (method == 'post') {
    return (response = await axios.post(url, JSONParam, config))
  } else if (method == 'get') {
    if (param) {
      console.error('Send parameters as a query string in GET METHOD')
    }

    return (response = await axios.get(url, config))
  } else if (method == 'patch') {
    return (response = await axios.patch(url, JSONParam, config))
  }
}

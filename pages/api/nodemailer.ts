import { NextApiHandler } from 'next'
import nodemailer from 'nodemailer'
import axios from 'axios'

const sender = process.env.GMAIL_CLIENT_ID
const pass = process.env.GMAIL_CLIENT_SECRET

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: sender,
    pass,
  },
})

const handler: NextApiHandler<any> = async (req, res) => {
  const recipient: string = JSON.parse(req.body.param).email

  if (req.method !== 'POST') {
    return res.status(404).send({ error: 'Begone.' })
  }

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-token`

  const token = await axios
    .post(
      url,
      {
        email: recipient,
      },
      {
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      }
    )
    .then((response) => {
      if (response.status === 201) {
        return response.data.token
      } else {
        alert('의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.')
        console.error(`HTTP status : ${response?.status}`)
      }
    })
    .catch((error) => {
      console.log(error)
    })

  res.setHeader('Content-Type', 'application/json')

  try {
    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: sender,
      subject: '[레고] 비밀번호 재설정을 위한 안내메일입니다.',
      html: `
        <div>
          <p style="margin-bottom: 20px">
            비밀번호 재설정을 위한 본인 확인메일입니다.<br />
            비밀번호를 재설정 하시려면 아래의 링크를 클릭해주세요.<br />
            <span style="color:blue;">해당 링크는 발송 후 1시간 동안만 유효합니다.</span>
          </p>
          <a href="http://localhost:3000/account/reset_password?token=${token}">비밀번호 재설정하기</a>
        </div>`,
    })

    //  <a href="https://port-0-lego-front-nx562olfs8ljco.sel3.cloudtype.app/account/reset_password?token=${token}">비밀번호 재설정하기</a>

    res.status(200).json(res.status)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export default handler

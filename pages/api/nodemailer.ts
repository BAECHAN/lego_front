import { NextApiHandler } from 'next'
import nodemailer from 'nodemailer'
import crypto from 'crypto-js'
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

  console.log(recipient)

  const url = 'http://localhost:5000' + '/api/get-token'

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
      return response.data.token
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
          <a href="${process.env.CLIENT_URL}/login/reset_password?email=${recipient}&token=${token}">비밀번호 재설정하기</a>
        </div>`,
    })

    res.status(200).json(console.log(res.status))
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export default handler

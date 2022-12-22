import { encode } from 'js-base64';
import { format } from 'date-fns';
import { withIronSessionApiRoute } from 'iron-session/next';
import md5 from 'md5';

import { IronSessionOptions } from 'utils/config';
import request from 'utils/request';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  code: number | string,
  msg: string,
};
export default withIronSessionApiRoute(sendVerifyCode, IronSessionOptions);

async function sendVerifyCode(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { to, templateId } = req.body;
  const session = req.session;
  // 容联云短信服务
  const appId = '2c94887684cb6e0f0185297c9de80660';
  const accountSid = '2c94887684cb6e0f0185297c9cfc0659';
  const authToken = 'fce81e2eb0404774a939ea4eaca8bbf2';
  const nowDate = format(new Date(), 'yyyyMMddHHmmss');
  const sigParameter = md5(`${accountSid}${authToken}${nowDate}`);
  const Authorization = encode(`${accountSid}:${nowDate}`);
  const verifyCode = Math.floor(Math.random() * 8999) + 1000;
  const expireMinute = '5';
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${accountSid}/SMS/TemplateSMS?sig=${sigParameter}`;
  try {
    const data = await request.post(
      url,
      {
        to,
        appId,
        templateId,
        datas: [verifyCode, expireMinute],
      },
      {
        headers: {
          Authorization,
        },
      },
    );
    console.log(data, 'dd');
    if ((data as any).statusCode === '000000') {
      (session as any).verifyCode = verifyCode;
      await session.save();
      res.status(200).json({ code: 0, msg: 'success' });
    } else {
      res.status(200).json({
        code: -1,
        msg: 'error'
      });
    }
  } catch (error) {
    res.status(200).json({
      code: -1,
      msg: error as string
    });
  }
}

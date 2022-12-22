import { withIronSessionApiRoute } from 'iron-session/next';
import { Cookie } from 'next-cookie';

import { IronSessionOptions } from 'utils/config';
import { setCookie } from 'utils/cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  code: number,
  msg: string,
  data?: Record<string, any>,
};

const USERDATA = [
  {
    id: 1,
    nickName: '马骏',
    phone: '13750668127',
    avatar: '/image/avatar.png',
  },
];

const UserFindOne = (payload: { phone: string }) => {
  const { phone } = payload;
  const user = USERDATA.find((user) => user.phone === phone);
  return user;
};

async function Login(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { phone = '', verify = '', identity_type = 'phone' } = req.body;
  const cookies = Cookie.fromApiRoute(req, res);
  console.log((req.session as any).verifyCode, '= =')
  if (identity_type === 'phone') {
    // 验证码判断
    // 8322
    if (String((req.session as any).verifyCode) === String(verify)){
      const curUser = UserFindOne({ phone });
      if (curUser) {
        setCookie(cookies, {id: String(curUser.id), avatar: curUser.avatar, nickname: curUser.nickName})
        // (req.session as any).verifyCode = null
        res.status(200).json({ code: 0, msg: '登陆成功', data: { ...curUser } });
      } else {
        res.status(200).json({ code: -1, msg: '用户不存在' });
      }
    } else {
      res.status(200).json({ code: -1, msg: '验证码不正确' });
    }
  }
}

export default withIronSessionApiRoute(Login, IronSessionOptions);

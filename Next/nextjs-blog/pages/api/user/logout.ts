import { withIronSessionApiRoute } from 'iron-session/next';
import { Cookie } from 'next-cookie';
import { IronSessionOptions } from 'utils/config';
import { clearCookie } from 'utils/cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  code: number | string,
  msg: string,
  data: Record<string, any>,
};

async function logout(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = req.session;
  const cookie = Cookie.fromApiRoute(req, res);
  // await session.destroy();

  clearCookie(cookie);

  res.status(200).json({
    code: 0,
    msg: '退出成功',
    data: {},
  });
}

export default withIronSessionApiRoute(logout, IronSessionOptions);

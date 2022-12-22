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

async function publish(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { title = '', content = '' } = req.body;
  const session = req.session;
  // await session.destroy();

  res.status(200).json({
    code: 0,
    msg: '发布成功',
    data: {},
  });
}

export default withIronSessionApiRoute(publish, IronSessionOptions);

import { withIronSessionApiRoute } from 'iron-session/next';
import { IronSessionOptions } from 'utils/config';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  code: number | string,
  msg: string,
  data: Record<string, any>,
};

export type ArticlesType = {
  id: number,
  title: string,
  content: string,
  create_time: number,
  view: number,
  user: {
    id: number,
    nickname: string,
    avatar: string,
  },
};
export type CommentsType = {
  id: number,
  articleId: number,
  content: string,
  create_time: number,
  user: {
    id: number,
    nickname: string,
    avatar: string,
  },
};

export const articleList: Array<ArticlesType> = [
  {
    id: 1,
    title: '测试文章1',
    content: '测试文章1内容',
    create_time: 1671691517083,
    view: 100,
    user: {
      id: 1,
      nickname: '马骏',
      avatar: '/image/avatar.png',
    },
  },
  {
    id: 2,
    title: '测试文章2',
    content: '测试文章2内容',
    create_time: 1671691517083,
    view: 400,
    user: {
      id: 1,
      nickname: '马骏',
      avatar: '/image/avatar.png',
    },
  },
];

export const commentList: Array<CommentsType> = [
  {
    id: 1,
    articleId: 1,
    content: '写得太好了',
    create_time: 1671763835780,
    user: {
      id: 1,
      nickname: '马骏',
      avatar: '/image/avatar.png',
    }
  },
  {
    id: 2,
    articleId: 2,
    content: '不错不错',
    create_time: 1671763835780,
    user: {
      id: 1,
      nickname: '马骏',
      avatar: '/image/avatar.png',
    }
  }
]

export const getArticles = (id?: number) => {
  if (id) {
    const findOne = articleList.find((article) => article.id === id);
    return findOne ? findOne : {} as ArticlesType;
  }
  return articleList;
};
export const getComment = (articleId: number) => {
  const findAny: Array<CommentsType> = []
  commentList.map(item => {
    if(articleId === item.articleId) {
      findAny.push(item);
    }
  });
  return findAny;
}

async function articles(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = req.session;
  res.status(200).json({
    code: 0,
    msg: '发布成功',
    data: [...articleList],
  });
}

export default withIronSessionApiRoute(articles, IronSessionOptions);

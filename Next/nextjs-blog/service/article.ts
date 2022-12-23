import request from 'utils/request';

// 发布文章
export const pubilshArticles = async (params: { title: string, content: number, id: number }) => {
  return await request.post('/api/article/publish', params);
};

// 登陆
export const queryArticles = async () => {
  return await request.post('/api/article/articles');
};

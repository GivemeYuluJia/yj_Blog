import request from 'utils/request';

// 发送验证码
export const sendVerifyCode = async (params: { to: string, templateId: number }) => {
  return await request.post('/api/user/sendVerifyCode', params);
};

// 登陆
export const login = async (params: { phone: string, verify: string, identity_type: string }) => {
  return await request.post('/api/user/login', params);
};

// 登陆
export const logout = async () => {
  return await request.post('/api/user/logout');
};

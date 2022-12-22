import { Cookie } from 'next-cookie';

interface CookieInfo {
  id: string;
  nickname: string;
  avatar: string;
}

// 全局导出cookie实例
export const cookie = new Cookie();

export const setCookie = (cookie: Cookie, { id, nickname, avatar }: CookieInfo) => {
  // 登陆时效
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const path = '/';
  cookie.set('id', id, {
    expires,
    path,
  });
  cookie.set('nickname', nickname, {
    expires,
    path,
  });
  cookie.set('avatar', avatar, {
    expires,
    path,
  });
};

export const clearCookie = (cookie: Cookie) => {
  // 登陆时效
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const path = '/';
  cookie.set('id', '', {
    expires,
    path,
  });
  cookie.set('nickname', '', {
    expires,
    path,
  });
  cookie.set('avatar', '', {
    expires,
    path,
  });
};

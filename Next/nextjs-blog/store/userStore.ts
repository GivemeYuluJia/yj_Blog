import { makeAutoObservable } from 'mobx';
import { cookie } from 'utils/cookie';
import { login, logout } from 'service/login';
import { message } from 'antd';

type UserInfoType = {
  id?: number | undefined,
  nickname?: string | undefined,
  avatar?: string | undefined,
};

export default class UserStore {
  rootStore: any = null;
  authInfo: UserInfoType = {
    id: cookie.get('id') || undefined,
    nickname: cookie.get('nickname') || undefined,
    avatar: cookie.get('avatar') || undefined,
  };
  constructor(RootStore: any) {
    makeAutoObservable(this);
    this.rootStore = RootStore;
  }
  setUserState(type: string, value: Record<string, any>) {
    //@ts-ignore
    this[type] = value;
  }
  async login(params: { phone: string, verify: string, identity_type: string }) {
    // const { data } = await login(params);
    login(params)
      .then((res: any) => {
        message.success(res.msg);
        this.setUserState('authInfo', { ...res.data });
      })
      .catch((res) => {
        message.warning(res);
      });
  }
  async logout() {
    await logout()
      .then((res: any) => {
        message.success(res.msg);
        this.setUserState('authInfo', {});
      })
      .catch((res) => {
        message.warning(res);
      });
  }
}

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { observer } from 'mobx-react';

import CountDown from 'components/CountDown';
import { Button, Input, message } from 'antd';

import { sendVerifyCode } from 'service/login';
import { useStore } from 'store';

import ss from './index.module.scss'

export interface LoginProps {
  isShow: boolean;
  onClose?: () => void;
}
const Login: React.FC<LoginProps> = (props) => {
  const { isShow, onClose } = props;
  const { userStore } = useStore();
  const [ isShowVerifyCode, setIsShowVerifyCode ] = useState(false);
  const [ isLoginLoad, setIsLoginLoad ] = useState(false);
  const [ form, setForm ] = useState({
    phone: '',
    verify: ''
  });

  const handleClose = () => {
    onClose && onClose();
  }
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  };
  const handleGetVerifyCode = () => {
    const phoneRegex = /^[1][3,4,5,7,8][0-9]{9}$/;
    if(!form.phone) {
      message.warning('请输入手机号');
      return;
    }
    if (!phoneRegex.test(form.phone)) {
      message.warning('手机格式错误');
      return;
    }

    sendVerifyCode({
      to: form.phone,
      templateId: 1
    }).then((res: any) => {
      message.success(res.msg)
    }).catch(res => {
      message.error(res);
    }).finally(() => {
      setIsShowVerifyCode(true);
    })
  };
  const handleCountDownEnd = () => {
    setIsShowVerifyCode(false);
  };
  const handleLogin = () => {
    if (isLoginLoad) return;
    if (Number(form.verify) > 999 && Number(form.verify) < 10000) {
      setIsLoginLoad(true);
      userStore.login({
        ...form,
        identity_type: 'phone'
      }).finally(() => {
        setIsLoginLoad(false);
        setForm({phone: '', verify: ''})
        onClose && onClose();
      })
    } else {
      message.warning('验证码应为四位数')
    }
  }

  if (!isShow) return null;

  return (
    createPortal(
      <div className={ss.loginbackdrop}>
        <div className={ss.loginContainer}>
          <div className={ss.loginHead}>
            <div className={ss.loginTitle}>手机号登陆</div>
            <div className={ss.closeBtn} onClick={handleClose}>x</div>
          </div>
          <Input 
            allowClear
            className={ss.phoneInput}
            name='phone'
            type="text" 
            placeholder='请输入手机号' 
            value={form.phone} 
            onChange={(e) => handleFormChange(e)} 
          />
          <div className={ss.verifyCodeArea}>
            <Input 
              name='verify' 
              type="text" 
              maxLength={4}
              placeholder='请输入验证码' 
              value={form.verify} 
              onChange={(e) => handleFormChange(e)}
            /> 
              <Button className={ss.verifyBtn} disabled={isShowVerifyCode} onClick={handleGetVerifyCode}>
                { isShowVerifyCode ? 
                  <CountDown time={60} onEnd={handleCountDownEnd} /> 
                  : 
                  '获取验证码'
                }
              </Button>
          </div>
          <div className={ss.loginBtn} onClick={handleLogin}>{ isLoginLoad ? 'Loading' : '登陆'}</div>
          <div className={ss.otherLogin}>使用 GitHub 登陆</div>
          <div className={ss.loginPrivacy}>
            注册登陆即表示同意
            <a href='https://baidu.com' rel='noreferrer' target="_blank">隐私政策</a>
          </div>
        </div>
      </div>,
      document.body
    )
  )
};

export default observer(Login);
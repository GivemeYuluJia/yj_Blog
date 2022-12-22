import React, { useState } from "react";
import Link from "next/link";
import cx from 'classnames';
import { observer } from 'mobx-react';
import { useRouter } from "next/router";
import { useStore } from "store";

import { MenuProps, message } from 'antd';
import { Avatar, Button, Dropdown, Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined
} from '@ant-design/icons';

import Login from "components/Login";

import { navs } from "./config";

import ss from './index.module.scss';

const Header = () => {
  const { pathname, push } = useRouter();
  const store = useStore();
  const { id, avatar } = store.userStore.authInfo;
  const [ isShowLogin, setIsShowLogin ] = useState(false);
  const handleGotoEditorPage = () => {
    if (id) {
      push('/editor/new');
    } else {
      message.warning('请先登录')
    }
  };
  const handleLogin = () => {
    setIsShowLogin(true);
  };
  const handleClose = () => {
    setIsShowLogin(false);
  };
  const handleLogout = () => {
    store.userStore.logout();
  }

  const items: MenuProps['items'] = [
    {
      label: (<Link href={`/user/${id}`}>个人主页</Link>),
      key: '1',
      icon: <HomeOutlined />,
    },
    {
      label: <a onClick={handleLogout}>退出系统</a>,
      key: '2',
      icon: <LoginOutlined />,
    },
  ];

  return (
    <div className={ss.headerContainer}>
      <section className={ss.logoArea}>Blog-C</section>
      <section className={ss.linkArea}>
        {navs.map((nav) => (
          <Link 
            className={cx({
              [ss.active]: pathname === nav.value
            })}
            key={nav.label} 
            href={nav.value}
          >
            {nav.label}
          </Link>
        ))}
      </section>
      <section className={ss.operationArea}>
        <Button onClick={handleGotoEditorPage}>写文章</Button>
        { id ? (
          <Dropdown menu={{items}}>
            <Avatar src={avatar} size={32} />
          </Dropdown>
        ) : 
          <Button type="primary" onClick={handleLogin}>登陆</Button>
        }
      </section>
      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  )
};

export default observer(Header);
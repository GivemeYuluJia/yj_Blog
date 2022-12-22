import type { NextPage } from 'next';
import Head from 'next/head'
import Image from 'next/image';

import styles from '../styles/Home.module.css';
import 'antd/dist/reset.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      我是首页
    </div>
  )
};

export default Home;

import { Fragment } from 'react';
import { Divider } from 'antd';
import ListItem from 'components/ListItem';
import { getArticles, ArticlesType } from './api/article/articles';
import type { NextPage } from 'next';

import styles from '../styles/Home.module.css';
import 'antd/dist/reset.css';


type HomeProps = {
  articles: Array<ArticlesType>
}
const Home: NextPage<HomeProps> = (props) => {
  const { articles } = props;
  return (
    <div className={styles.container}>
      {articles.map(article => (
        <Fragment key={article.title}>
          <ListItem article={article} />
          <Divider />
        </Fragment>
      ))}
    </div>
  )
};

export const getServerSideProps = async () => {
  // 模拟操作数据库获取文章列表= =
  const articles = getArticles()
  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles))
    }
  }
}

export default Home;

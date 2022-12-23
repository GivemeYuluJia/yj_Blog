import React from "react";
import { Avatar } from "antd";
import { EyeOutlined } from '@ant-design/icons';
import Link from "next/link";
import { markdownToTxt } from 'markdown-to-txt'
import { formatDistanceToNow } from 'date-fns';
import { ArticlesType } from "pages/api/article/articles";

import ss from './index.module.scss';


type ListItemProps = {
  article: ArticlesType
}

const ListItem = (props: ListItemProps) => {
  const { article } = props;
  return (
    <Link href={`/article/${article.id}`}>
      <div className={ss.listItem}>
        <div className={ss.articleItem}>
          <div className={ss.userInfo}>
            <span className={ss.name}>{article?.user.nickname}</span>
            <span className={ss.date}>{formatDistanceToNow(new Date(article?.create_time))}</span>
          </div>
          <h4 className={ss.title}>
            {article?.title}
          </h4>
          <p className={ss.content}>
            {markdownToTxt(article?.content)}
          </p>
          <div className={ss.statistics}>
            <EyeOutlined />
            <span>{article.view}</span>
          </div>
        </div>
        <Avatar src={article?.user.avatar} />
      </div>
    </Link>
  )
};

export default ListItem;
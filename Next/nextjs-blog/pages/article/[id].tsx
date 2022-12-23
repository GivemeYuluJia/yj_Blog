import React, { ChangeEvent, useState } from "react";
import { Avatar, Button, Divider, Input } from "antd";
import { format } from 'date-fns';
import Link from "next/link";
import { observer } from 'mobx-react';
import MarkDown from 'markdown-to-jsx';
import type { GetServerSideProps } from 'next';

import { getArticles, getComment, ArticlesType, CommentsType } from 'pages/api/article/articles';
import { useStore } from "store";

import ss from './index.module.scss';


type ArticleDetailProps = {
  article: ArticlesType & Record<'comments', Array<CommentsType>>
}

const ArticleDetail = (props: ArticleDetailProps) => {
  const { article } = props;
  const [ commentValue, setCommentValue ] = useState('');
  const { userStore } = useStore();
  const { comments } = article;
  console.log(article, 'aaa')
  const handleComment = () => {

  }
  return (
    <>
      <div className={ss.articledetailContainer}>
        <h2 className={ss.title}>{article.title}</h2>
        <div className={ss.user}>
          <Avatar src={article.user.avatar} size={50} />
          <div className={ss.info}>
            <div className={ss.name}>{article.user.nickname}</div>
            <div className={ss.date}>
              <div>{format(article.create_time, 'yyyy-MM-dd hh:mm:ss')}</div>
              <div>阅读 {article.view}</div>
              { Number(userStore.authInfo.id) === Number(article.user.id) && (
                <Link href={`/editor/${article.id}`}>编辑</Link>
              )}
            </div>
          </div>
        </div>
        <MarkDown className={ss.markdown}>{article.content}</MarkDown>
      </div>
      <div className={ss.divider}></div>
      <div className={ss.commentContainer}>
        <h3>评论</h3>
        {
          userStore.authInfo.id && (
            <div className={ss.enter}>
              <Avatar src={userStore.authInfo.avatar} size={40} />
              <div className={ss.content}>
                <Input.TextArea
                  placeholder="请输入评论"
                  rows={4}
                  value={commentValue}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setCommentValue(event.target.value)}
                />
                <Button type="primary" onClick={handleComment}>发表评论</Button>
              </div>
            </div>
          )
        }
        <Divider />
        <div className={ss.commentList}>
          { comments.map(comment => (
            <div className={ss.commentItem} key={comment.id}>
              <Avatar src={comment.user.avatar} size={40} />
              <div className={ss.commentInfo}>
                <div className={ss.name}>
                  <div>{comment.user.nickname}</div>
                  <div className={ss.date}>{format(comment.create_time, 'yyyy-MM-dd hh:mm:ss')}</div>
                </div>
                <div className={ss.commentContent}>{comment.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const articleId = ctx.params?.id;
  const article = getArticles(Number(articleId));
  const comments = getComment(Number(articleId));
  // 增加阅读此书
  if(!Array.isArray(article) && article) {
    article.view = article?.view + 1;
  }
  return {
    props: {
      article: {
        ...article,
        comments,
      }
    }
  }
}

export default observer(ArticleDetail);
import React, { ChangeEvent, useState } from 'react';
import { Input, Button, message } from 'antd';
import dynamic from "next/dynamic";
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { useStore } from 'store';
import type { GetServerSideProps } from 'next';

import { getArticles, ArticlesType } from 'pages/api/article/articles';

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import ss from './index.module.scss';

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const ModifyEditor = (props: { article: ArticlesType }) => {
  const { article } = props;
  const [ title, setTitle ] = useState(article.title || '');
  const [ content, setContent ] = useState(article.content || '');
  const { push } = useRouter();
  const { userStore } = useStore();

  const handlePublish = () => { 
    if (!title) {
      message.warning('请输入文章标题');
      return;
    }
    message.success('更新成功')
    push(`/user/${userStore.authInfo.id}`);
  }
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const handleContentChange = (value: any) => {
    setContent(value);
  }

  return (
    <div className={ss.container}>
      <div>
        <Input className={ss.title} placeholder='请输入文章标题' value={title} onChange={handleTitleChange} />
        <Button className={ss.button} type='primary' onClick={handlePublish}>发布</Button>
      </div>
      <MDEditor value={content} onChange={handleContentChange} />
    </div>
  )
};
(ModifyEditor as any).Layout = null;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const articleId = ctx.params?.id;
  const article = getArticles(Number(articleId));

  return {
    props: {
      article
    }
  }
}

export default observer(ModifyEditor);
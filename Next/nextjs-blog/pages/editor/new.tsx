import React, { ChangeEvent, useState } from 'react';
import { Input, Button, message } from 'antd';
import dynamic from "next/dynamic";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import ss from './index.module.scss';


const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const NewEditor = () => {
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');

  const handlePublish = () => { 
    if (!title) {
      message.warning('请输入文章标题');
      return;
    }
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
(NewEditor as any).Layout = null;

export default NewEditor;
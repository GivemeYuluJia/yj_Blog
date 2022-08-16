# 自定义脚手架搭建

### 准备工作

1.创建 bin 目录 输入 npm init 初始化项目 package.json 会有 bin 选项参数 把命令指定对应文件下

2.执行 npm link 把当前命令挂载到全局命令中

### 工具

1.commander 是一个轻巧的 nodejs 模块，提供了用户命令行输入和参数解析强大功能。

```sh
# 安装
npm install commander
```

2.inquirer 是一个命令交互工具。9 版本以上不支持 commonJs

```sh
# 安装
npm install inquirer
```

3.down-git-repo 是使用 node 下载远程代码工具。

```sh
# 安装
npm install down-git-rep
```

4.Ora 是一个命令行任务等待工具。5 版本以上不支持 commonJs

```sh
# 安装
npm install ora@5
```

5.chalk 是一个命令样式渲染工具。4 版本以上不支持 commonJs

```sh
# 安装
npm install chalk
```

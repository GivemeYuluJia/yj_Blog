# NEST

### 安装

1. nest cli 安装 npm i -g @nestjs/cli
2. 项目脚手架创建 nest new project-name

### 指令 nest-cli 使用

- nest 来查看指令
- 创建 module —— nest g mo [moduleName]
- 创建 Controller —— nest g mo [controllerName]
- 创建 Service —— nest g mo [serviceName]
- 创建完整增删改查的内容 —— nest g res [name]

### 装饰器

### swagger 使用

介绍

- 一个专用模块，允许通过利用装饰器生成类似 RESTful API 的规范。

安装

- npm install --save @nestjs/swagger

使用

- 见官方文档 先初始化 SwaggerModule

```
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
```

- DocumentBuilder 有助于构建符合 OpenAPI 规范的基础文档。它提供了几种方法来允许设置诸如标题、描述、版本等属性。为了创建一个完整的文档（定义了所有 HTTP 路由），我们使用类的 createDocument()方法 SwaggerModule。此方法有两个参数，一个应用程序实例和一个 Swagger 选项对象。或者，我们可以提供第三个参数，它应该是 type SwaggerDocumentOptions。更多关于这在文档选项部分。

- 创建了一个 document，就可以调用该 setup()方法。它接受：
  - 挂载 Swagger UI 的路径
  - 一个应用实例
  - 上面实例化的文档对象
  - 可选配置参数

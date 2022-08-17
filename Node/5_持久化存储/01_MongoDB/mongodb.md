# MongoDB

### what is MongoDB

1. 一个基于文件存储的分布式 NoSQL(非关系) 数据存储库。

   - 非关系型数据库(nosql ),属于文档型数据库。即可以存放 xml、json、bson 类型系那个的数据。这些数据具备自述性，呈现分层的树状数据结构。数据结构由键值(key=>value)对组成。

2. 数据结构由键值对组成。
3. 拥有非常强大的查询能力。

### 特性

1. 文档型数据库，较强可扩展性，拥有强大的查询语言，多种存储引擎。
2. 存储方式：虚拟内存+持久化。
3. 查询语句：是独特的 MongoDB 的查询方式。多种查询类型支持，且支持数据聚合查询、文本检索、地址位置查询。
4. 适合场景：事件的记录，内容管理或者博客平台等等。
5. 架构特点：可以通过副本集，以及分片来实现高可用。高性能、高可用、水平扩展：支持数据嵌入，子文档查询、支持副本集与分片。
6. 数据处理：数据是存储在硬盘上的，只不过需要经常读取的数据会被加载到内存中，将数据存储在物理内存中，从而达到高速读写。

### 使用场景

1. 对数据处理性能有较高要求
2. 需要借助缓存层来处理数据
3. 需要高度的伸缩性

### 指令

- show dbs —— 查看数据库
- use < database > —— 进入/切换/创建数据库
- db —— 显示当前数据库
- db.dropDatabase() —— 删除当前使用数据库
- show collections —— 在当前数据库查看集合
- db.< collections >.drop() —— 删除当前集合
- db.createCollection(< collections >) or db.< collections >.insert() —— 创建集合
- db.< collections >.insert() 和 db.< collections >.insertMany() —— 插入一个/多个数据
- db.< collections >.find() 和 db.< collections >.findOne() —— 查询多个/一个数据
- db.< collections >.updateOne(< data >, {$set: {< updatedata >}}) 和 db.< collections >.updateMany(< data >, {$set: {< updatedata >}}) —— 修改一个/多个数据
- db.< collections >.deleteMany() 和 db.< collections >.deleteOne() —— 查询多个/一个数据

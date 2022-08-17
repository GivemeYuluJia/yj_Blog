const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017');

const collect = async(collection) => {
  /** 数据库连接 */
  await client.connect();
  /** 实例化数据库对象 */
  const db = client.db('test');
  /** 实例化集合对象 */
  return db.collection(collection);
}
const main = async() => {
  const userCollection = await collect('user');
  // 插入多条数据
  // await userCollection.insertMany([
  //   { username: 'huangzhenghao', age: 27},
  //   { username: 'chengmohan', age: 26}
  // ]);

  // 插入一条数据
  // await userCollection.insertOne({ username: 'sunbingcong', age: 28});
  
  // 查找数据
  // const d = await userCollection.find();
  // console.log(await d.toArray());

  // 查找年龄大于26的数据
  // const d = await userCollection.find({age: { $gt:26 } });
  // console.log(await d.toArray());

  // 更新数据
  // const d = await userCollection.updateOne({age: {$gt: 27}}, {$set: {age: 30}});
  // console.log(d)

  // 删除一条数据
  const d = await userCollection.deleteOne({age: {$lt: 10}});
  console.log(d);
}
main().finally(() => {
  client.close();
});
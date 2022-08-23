const Koa = require("koa");

const app = new Koa();
/**
 * 无await 打印 
 *  one 1
 *  two 1
 *  three 1
 *  three 2
 *  two 2
 *  one 2
 * 有await 打印
 *  one 1
 *  two 1
 *  one 2
 *  three 1
 *  three 2
 *  two 2
 * because 洋葱模型 await时候 下面代码需要等待await代码执行完才能向下执行 此时中间件向第一个执行
 */
app.use(async (ctx, next) => {
  console.log('one 1')
  next()
  console.log('one 2')
})

app.use(async (ctx, next) => {
  // console.log('two 1')
  await console.log('two 1')
  next()
  // console.log('two 2')
  await console.log('two 2')
})

app.use(async (ctx, next) => {
  console.log('three 1')
  next()
  console.log('three 2')
})

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000')
})


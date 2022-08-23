const Koa = require("koa");
const router = require("./router/index");
const koabody = require("koa-body");
const cors = require("@koa/cors")

const app = new Koa();

// 跨域处理
app.use(cors());
// 解析post传参 urlencode json 通过ctx.request.body获取
app.use(koabody())
app.use(router.routes())

app.use(async (ctx, next) => {
  console.log(ctx.path, '1');
})

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000')
})

app.on('error', (err, ctx) => {
  console.log(err);
  ctx.body = err;
})
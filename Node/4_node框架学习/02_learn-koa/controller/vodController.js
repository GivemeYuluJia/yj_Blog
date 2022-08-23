const RPCClient = require('@alicloud/pop-core').RPCClient;

function initVodClient(accessKeyId, accessKeySecret) {
  const regionId = 'cn-shanghai';   // 点播服务接入地域
  const client = new RPCClient({//填入AccessKey信息
    accessKeyId: accessKeyId,
    accessKeySecret: accessKeySecret,
    endpoint: 'http://vod.' + regionId + '.aliyuncs.com',
    apiVersion: '2017-03-21'
  });

  return client;
}

// 创建播放地址
module.exports.getvod = async ctx => {
  const client = initVodClient(
    'LTAI5t6N7W3BoSYpmtasXzoo',
    'GSedSGNfNDvUOGP1Txz5AnwAxfSsa3'
  );

  const vodback = await client.request("CreateUploadVideo", {
    Title: ctx.request.query.title,
    FileName: ctx.request.query.filename,
  }, {})
  ctx.body = vodback
}

const getvodplay = async (vodid) => {
  const client = initVodClient(
    'LTAI5t6N7W3BoSYpmtasXzoo',
    'GSedSGNfNDvUOGP1Txz5AnwAxfSsa3'
  );

  try {
    const response = await client.request("GetPlayInfo", {
      VideoId: vodid
    }, {})
    return response
  } catch (error) {
    console.log(error);
  }
}
// 获取播放地址
module.exports.getPlay = async ctx => {
  const play = await getvodplay(ctx.request.query.vodid);
  ctx.body = play;
}

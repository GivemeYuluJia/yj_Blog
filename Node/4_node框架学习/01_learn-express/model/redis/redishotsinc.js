const { redis } = require('./index')

module.exports.hotInc = async (videoId, incNum) => {
  let data = await redis.zscore('videohots', videoId);
  let res;
  if(data) {
    res = await redis.zincrby('videohots', incNum, videoId)
  } else {
    res = await redis.zadd('videohots', incNum, videoId)
  }
}

module.exports.topHots = async (num) => {
  var paixu = await redis.zrevrange('videohots', 0, -1, 'withscores')
  var newarr = paixu.slice(0, num * 2)
  var obj = {}
  for (let i = 0; i < newarr.length; i++){
    if(i%2 == 0){
      obj[newarr[i]] = newarr[i+1]
    }
  }
  return obj 
}
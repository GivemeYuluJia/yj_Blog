const bar = require('./bar.js');

/**
 * CommonJs输出的是一个值的拷贝
 */
console.log("name", bar.name);
console.log("age", bar.age);
bar.sayHello('Yan');

setTimeout(() => {
  console.log('setTimeout', bar.name); // 'Yan Da Shuai'
}, 2000)

// const { name, age, sayHello } = require('./bar.js');

// console.log("name", name);
// console.log("age", age);
// sayHello('Yan');
// setTimeout(() => {
//   console.log('setTimeout', bar.name); // 'Yan Jun'
// }, 2000)

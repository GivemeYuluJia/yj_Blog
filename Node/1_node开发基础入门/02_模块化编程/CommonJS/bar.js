const name = 'Yan Jun';
const age = 21;

function sayHello(name) {
  console.log('Hello' + '-' + name)
}
setTimeout(() => {
  module.exports.name = 'Yan Da Shuai'
}, 1000);

module.exports = {
  name,
  age,
  sayHello
};
// console.log(module);
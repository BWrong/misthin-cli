const path = require('path');
const notifier = require('node-notifier');
notifier.notify({
  title:'123',
  icon: path.join(__dirname, '../assets/logo.png'),
  message:'测试信息',
  contentImage: path.join(__dirname, '../assets/logo.png'),
  sound: true
});
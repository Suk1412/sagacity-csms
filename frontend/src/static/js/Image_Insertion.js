import fs from 'fs'
import mysql from 'mysql2'


// 1. 连接数据库
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'wangxiao',
  password: '2472532732',
  database: 'sagacityapp',
  port: 3306
});

// 2. 读取图片为 Buffer（二进制数据）
const imagePath = 'wx-hero.jpg';
const userId = 1;
const avatarData = fs.readFileSync(imagePath);


const sql = `UPDATE users SET avatar = ? WHERE id = ?`;
connection.query(sql, [avatarData, userId], (err, result) => {
  if (err) {
    console.error('头像更新失败：', err);
  } else {
    console.log(`用户 ${userId} 的头像更新成功`);
  }
  connection.end();
});
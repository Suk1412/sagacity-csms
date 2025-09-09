// db.js
import mysql from 'mysql2'

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost',          // 数据库服务器地址，'localhost' 表示本机
  user: 'wangxiao',           // 连接数据库的用户名
  password: '2472532732',     // 该用户的密码
  database: 'sagacityapp',    // 要连接的数据库名称
  port: 3306,                 // MySQL 默认端口号，一般是3306
  waitForConnections: true,   // 当连接池连接用完时，是否等待有连接释放后再分配，true表示等待，false表示直接报错
  connectionLimit: 10,        // 连接池最大连接数，同时最多10个连接活跃
  queueLimit: 0               // 最大等待连接数量，0表示没有限制，排队等待的连接数无限制
});

// 获取数据库连接
function getConnection() {
  return pool.promise();
}
export { getConnection };
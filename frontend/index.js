const express = require('express');
const cors = require('cors');

const app = express();
const port = 3306;

//  中间件
app.use(cors());
app.use(express.json());

// 引入 auth 路由
const authRoutes = require('@/routes/auth');
app.use('/', authRoutes); // 路由挂载

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
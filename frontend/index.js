import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import registerRoutes from './routes/register.js';


const app = express();
const port = 3000;

//  中间件
app.use(cors());
app.use(express.json());

// 引入 auth 路由
app.use('/', authRoutes); // 路由挂载
app.use('/', registerRoutes); // 路由挂载

// 启动服务器
app.listen(port, () => {console.log(`Server running at http://localhost:${port}`);});
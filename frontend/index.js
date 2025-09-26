import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import registerRoutes from './routes/register.js';
import allusersRoutes from './routes/allusers.js';


const app = express();
const port = 3000;

//  中间件
app.use(cors());
app.use(express.json());


app.use('/', authRoutes); // 引入 auth 路由
app.use('/', registerRoutes); // 引入 register 路由
app.use('/', allusersRoutes); // 引入 allusers 路由

// 启动服务器
app.listen(port, () => {console.log(`Server running at http://localhost:${port}`);});
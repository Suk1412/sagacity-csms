import express from 'express';
import cors from 'cors';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express();
const port = 3000;

//  中间件
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const routesPath = path.join(__dirname, 'routes')

// 读取 routes 目录下所有以 .js 结尾的文件
const routeFiles = fs.readdirSync(routesPath).filter(file => file.endsWith('.js'))

for (const file of routeFiles) {
  const filePath = path.join(routesPath, file)
  const routeModule = await import(filePath)
  app.use('/', routeModule.default)
  console.log(`✅ 路由已加载: ${file}`)
}

// 启动服务器
app.listen(port, () => {console.log(`Server running at http://localhost:${port}`);});







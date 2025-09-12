import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'

const app = express()
app.use(cors())
app.use(express.json())

// ✅ 连接你的数据库 sagacityapp
const db = await mysql.createPool({
  host: 'localhost',
  user: 'wangxiao',
  password: '2472532732',
  database: 'sagacityapp',
  port: 3306,
  waitForConnections: true,
})

// 健康检查（可选）
app.get('/health', (req, res) => res.json({ ok: true }))

// ✅ 关键路由：GET /users/:username
app.get('/users/:username', async (req, res) => {
  try {
    const { username } = req.params
    const [rows] = await db.query(
      'SELECT username, nickname, email, created_at, avatar, role FROM users WHERE username = ? LIMIT 1',
      [username]
    )
    if (!rows.length) return res.status(404).json({ message: '用户不存在' })
    res.json(rows[0])
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: '服务器错误' })
  }
})

const PORT = 3000
app.listen(PORT, () => console.log(`API on http://127.0.0.1:${PORT}`))

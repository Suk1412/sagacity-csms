import express from 'express'
import bcrypt from 'bcrypt'
import pool from '../db.js'
import fs from 'fs'
import path from 'path'
import { randomBytes } from 'crypto'
import { kMaxLength } from 'buffer'

const router = express.Router()

router.post('/addcard', async (req, res) => {
  try {
    console.log('收到添加卡片请求数据:', req.body)
    const {url, img, title, theme, time} = req.body || {}
    if (!title || !theme || !img) {
      return res.status(400).json({ message: '图片、标题、主题不能为空' })
    }
    // 先检查是否已存在
    const [existRows] = await pool.execute('SELECT url FROM cards WHERE theme = ? LIMIT 1',[url])
    if (existRows.length > 0) {
      return res.status(409).json({ message: '该卡片已存在' })
    }

    const __dirname = path.resolve();
    const filePath = path.join(__dirname, img);
    if (!fs.existsSync(filePath)) {
      console.error('文件不存在:', filePath);
      return res.status(404).send('文件不存在');
    }

    const imgData = fs.readFileSync(filePath)
    console.log('imgData数据:', imgData)
    // 仅插入必要字段；如果你表里还有 img 等字段，未提供时可设为 NULL / 默认值
    const sql = 'INSERT INTO cards (url, img, title, theme, time) VALUES (?,?,?,?,?)'
    await pool.execute(sql, [url ,imgData, title, theme, time])

    return res.status(201).json({ message: '保存成功' })
  } catch (err) {
    // 唯一键冲突（双重保险）
    if (err?.code === 'ER_DUP_ENTRY' || err?.errno === 1062) {
      return res.status(409).json({ message: '用户名已存在' })
    }
    console.error('注册接口错误:', err)
    return res.status(500).json({ message: '服务器错误' })
  }
})

export default router

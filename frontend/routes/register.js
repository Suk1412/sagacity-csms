import express from 'express'
import bcrypt from 'bcrypt'
import pool from '../db.js'
import fs from 'fs'
import path from 'path'
import { randomBytes } from 'crypto'

const router = express.Router()

// 可按需从环境变量读取，默认 10
const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10)

// 简单校验函数（可按需调整）
function validUsername(u) {
  return typeof u === 'string' && u.trim().length >= 3 && u.trim().length <= 50
}
function validPassword(p) {
  return typeof p === 'string' && p.length >= 6 && p.length <= 128
}

// 随机生成函数：长度 n，字符集为 [0-9a-zA-Z]
function randomString(n = 12) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  const bytes = randomBytes(n)
  for (let i = 0; i < n; i++) {
    result += chars[bytes[i] % chars.length]
  }
  return result
}

const avatarDir = path.join(process.cwd(), 'src/static/img/default_avatar')

// 从目录随机挑选一个文件
function randomAvatar() {
  const files = fs.readdirSync(avatarDir).filter(f =>
    /\.(png|jpe?g|gif|webp)$/i.test(f)   // 只要图片文件
  )
  if (files.length === 0) return null
  const pick = files[Math.floor(Math.random() * files.length)]
  // 返回一个相对 URL，方便前端访问
  return `${avatarDir}/${pick}`
  // return pick
}


/**
 * 注册接口（JSON）
 * 请求体：{ username: string, password: string }
 * 规则：password_hash = bcrypt.hash(username + password)
 */
router.post('/register', async (req, res) => {
  try {
    console.log('收到登录请求，数据:', req.body)
    const { username, password } = req.body || {}
    // 基础校验
    if (!username || !password) {
      return res.status(400).json({ message: '用户名和密码不能为空' })
    }
    if (!validUsername(username)) {
      return res.status(400).json({ message: '用户名长度需在 3~50 之间' })
    }
    if (!validPassword(password)) {
      return res.status(400).json({ message: '密码长度需在 6~128 之间' })
    }

    const uname = username.trim()
    // 先检查是否已存在
    const [existRows] = await pool.execute('SELECT id FROM users WHERE username = ? LIMIT 1',[uname])
    if (existRows.length > 0) {
      return res.status(409).json({ message: '用户名已存在' })
    }

    // 用与登录一致的规则做哈希：username + password

    const toHash = uname + password
    const passwordHash = await bcrypt.hash(toHash, SALT_ROUNDS)
    const nickName = randomString(12)


    const avatarfile = randomAvatar()
    console.log('avatarfile:', avatarfile)
    const avatarData = fs.readFileSync(avatarfile)
    console.log('avatarData数据:', avatarData)


    // 仅插入必要字段；如果你表里还有 avatar 等字段，未提供时可设为 NULL / 默认值
    const sql = 'INSERT INTO users (username, nickname, password_hash, avatar) VALUES (?,?,?,?)'
    await pool.execute(sql, [uname ,nickName, passwordHash, avatarData])

    return res.status(201).json({ message: '注册成功' })
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

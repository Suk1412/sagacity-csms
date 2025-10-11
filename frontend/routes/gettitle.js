const router = express.Router();
import express from 'express'
import pool from '../db.js'

router.get('/cards/title', async (req, res) => {
  try {
      const sql = 'SELECT title FROM cards'
      const [results] = await pool.execute(sql);
      console.log('数据库返回Title', results)
      const arr = results.map(item => ({ title: item.title }))
      console.log('转换后的数组', arr)
      return res.json({ data: arr })
  } catch (error) {
    console.error('数据库查询失败', error)
  }});

export default router
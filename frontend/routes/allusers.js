const router = express.Router();
import express from 'express'
import pool from '../db.js'


router.get('/users/all', async (req, res) => {
  try {
      const sql = 'SELECT id, username, nickname, email, role FROM users ORDER BY id DESC;'
      const [results] = await pool.execute(sql);
      console.log('数据库返回数据', results)
      return res.json({ data: results });
  } catch (error) {
    console.log('数据库查询失败', error)
  }});

export default router

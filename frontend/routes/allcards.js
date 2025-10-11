const router = express.Router();
import express from 'express'
import pool from '../db.js'

router.get('/cards/all', async (req, res) => {
  try {
      const sql = 'SELECT * FROM cards ORDER BY id DESC'
      const [results] = await pool.execute(sql);
      console.log('数据库返回Cards', results)
      // console.log('img', results[3].img)

      // 定义一个辅助函数，将 Buffer 转为 Data URI
      const convertImageBufferToDataURI = async (buffer) => {
        if (!buffer) return null
        const base64 = buffer.toString('base64')
        // ⚠️ 这里假设图片是 PNG，可以根据实际情况改成 jpeg/webp
        return `data:image/png;base64,${base64}`
      }

      // 异步转换所有 img
      const convertedResults = await Promise.all(
        results.map(async (card) => {
          const avatarBase64 = await convertImageBufferToDataURI(card.img)
          return {
            ...card,
            img: avatarBase64, // 用转换后的字符串替换原来的 Buffer
          }
        })
      )
      return res.json({ data: convertedResults })
  } catch (error) {
    console.error('数据库查询失败', error)
  }});

export default router
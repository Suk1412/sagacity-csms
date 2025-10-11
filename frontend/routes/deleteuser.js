const router = express.Router();
import express from 'express'
import pool from '../db.js'


router.delete('/users/:id', async (req, res) => {
  const { id } = req.params
  try {
    const sql = 'DELETE FROM users WHERE id = ?;'
    const [result] = await pool.execute(sql, [id])
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '用户不存在' })
    }
    console.log(`用户 ID=${id} 已删除`)
    return res.json({ message: '删除成功', deletedId: id })
  } catch (error) {
    console.error('删除用户失败:', error)
    return res.status(500).json({ message: '删除失败', error: error.message })
  }
})
export default router

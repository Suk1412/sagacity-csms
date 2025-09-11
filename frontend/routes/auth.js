const router = express.Router();
import bcrypt from 'bcrypt'
import express from 'express'
import pool from '../db.js'
import { convertImageBufferToDataURI } from '../src/static/js/imageHelper.js'


// 登录接口
router.post('/login', async (req, res) => {
  console.log('收到登录请求，数据:', req.body)
  const { username, password } = req.body;

  if (!username || !password){
    return res.status(400).json({ message: '用户名和密码不能为空' });
  }

  try {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const [results] = await pool.execute(sql, [username]);
      if (results.length === 0){
        return res.status(401).json({ message: '用户不存在' });
      }
      console.log('数据库返回数据', results)
      const user = results[0];
      const combined = username + password

      console.log('用户+密码', combined, "加密密码",user.password_hash)
      const isMatch = await bcrypt.compare(combined, user.password_hash);
      
      if (!isMatch) {
        return res.status(401).json({ message: '密码错误' })
      };

      const avatarBase64 = await convertImageBufferToDataURI(user.avatar);

      return res.json({
        message: '登录成功',
        avatar:avatarBase64,
      });
    }
    catch (error) {
    console.error('数据库查询出错:', error);
    return res.status(500).json({ message: '服务器错误' });
    }
  });

export default router

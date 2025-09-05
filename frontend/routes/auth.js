const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

// 建议把连接单独封装，这里简写
const db = mysql.createConnection({
  host: 'localhost',
  user: 'wangxiao',
  password: '2472532732',
  database: 'your_database'
});


// 登录接口
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: '用户名和密码不能为空' });

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.execute(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: '数据库错误' });

    if (results.length === 0)
      return res.status(401).json({ message: '用户不存在' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: '密码错误' });

    res.json({ message: '登录成功', user: { id: user.id, username: user.username } });
  });
});

module.exports = router;

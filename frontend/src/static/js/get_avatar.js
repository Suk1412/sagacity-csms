// login controller
const user = await db.query('SELECT username, avatar_url FROM users WHERE username = ?', [username]);
if (!user) {
  return res.status(401).json({ message: '用户不存在' });
}
res.json({
  message: '登录成功',
  user: {
    username: user.username,
    avatarUrl: user.avatar_url, // 从数据库读取
  }
});
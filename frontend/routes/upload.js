import express from 'express'
import multer from 'multer'


const router = express.Router()
const upload = multer({ dest: 'uploads/' }); // 上传到 uploads 文件夹


router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('没有上传文件');
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  console.log('上传成功', fileUrl)
  return res.json({ url: fileUrl });
})

export default router

import { fileTypeFromBuffer } from 'file-type'

/**
 * 将数据库中的图片 Buffer 转为可在前端使用的 base64 data URI
 * @param {Buffer} buffer - 数据库中的图片 Buffer
 * @returns {string|null} data:image/...;base64,... 格式 或 null
 */
export async function convertImageBufferToDataURI(buffer) {
  if (!buffer) return null;

  const fileType = await fileTypeFromBuffer(buffer);

  if (!fileType || !fileType.mime.startsWith('image/')) {
    console.warn('⚠️ 头像不是有效图片类型');
    return null;
  }

  const base64 = buffer.toString('base64');
  return `data:${fileType.mime};base64,${base64}`;
}
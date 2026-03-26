const cron = require('node-cron');
const { Op } = require('sequelize');
const { FoodPhoto } = require('../models');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ดึง public_id จาก Cloudinary URL
const getPublicId = (url) => {
  if (!url || !url.includes('cloudinary.com')) return null;
  const parts = url.split('/');
  const uploadIndex = parts.indexOf('upload');
  if (uploadIndex === -1) return null;
  // ข้าม version (v1234567) ถ้ามี
  const afterUpload = parts.slice(uploadIndex + 1);
  if (afterUpload[0]?.startsWith('v')) afterUpload.shift();
  return afterUpload.join('/').replace(/\.[^/.]+$/, ''); // ตัด extension
};

const deleteYesterdayPhotos = async () => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  const cutoffStr = cutoff.toISOString().split('T')[0];
  try {
    const oldPhotos = await FoodPhoto.findAll({
      where: { date: { [Op.lt]: cutoffStr } },
    });

    if (oldPhotos.length === 0) {
      console.log('[Cleanup] ไม่มีรูปเก่าต้องลบ');
      return;
    }

    // ลบจาก Cloudinary
    for (const photo of oldPhotos) {
      const publicId = getPublicId(photo.photoUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId).catch(() => {});
      }
    }

    // ลบจาก database
    const deleted = await FoodPhoto.destroy({
      where: { date: { [Op.lt]: cutoffStr } },
    });

    console.log(`[Cleanup] ลบรูปเก่า ${deleted} รูป (เก่ากว่า 7 วัน ก่อน ${cutoffStr})`);
  } catch (err) {
    console.error('[Cleanup] เกิดข้อผิดพลาด:', err.message);
  }
};

// รันทุกวันเที่ยงคืน (00:00 น.)
const startCleanupJob = () => {
  cron.schedule('0 0 * * *', deleteYesterdayPhotos, { timezone: 'Asia/Bangkok' });
  console.log('[Cleanup] ตั้งเวลาลบรูปทุกเที่ยงคืน (Asia/Bangkok)');
};

module.exports = { startCleanupJob, deleteYesterdayPhotos };

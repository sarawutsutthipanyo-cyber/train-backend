const { FoodPhoto, Client } = require('../models');
const path = require('path');

exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const { mealType, date, notes } = req.body;
    // clientId comes from the logged-in user's clientProfile
    const client = await Client.findOne({ where: { userId: req.user.id } });
    if (!client) return res.status(404).json({ message: 'Client profile not found' });
    const photoUrl = `/uploads/${req.file.filename}`;
    const photo = await FoodPhoto.create({
      clientId: client.id,
      mealType: mealType || 'other',
      date: date || new Date().toISOString().split('T')[0],
      photoUrl,
      notes: notes || '',
    });
    res.status(201).json(photo);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getClientPhotos = async (req, res) => {
  try {
    const photos = await FoodPhoto.findAll({
      where: { clientId: req.params.clientId },
      order: [['createdAt', 'DESC']],
    });
    res.json(photos);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deletePhoto = async (req, res) => {
  try {
    const photo = await FoodPhoto.findByPk(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Not found' });
    await photo.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

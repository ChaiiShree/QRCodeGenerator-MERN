const qrCode = require('qrcode');
const { QRCode } = require('../models/QRCode');

async function generateQRCode(data) {
  try {
    return await qrCode.toBuffer(data);
  } catch (error) {
    console.error('Error generating QR code:', error.message);
    throw new Error('Failed to generate QR code');
  }
}

async function saveQRCodeToDB(qrCodeBuffer) {
  try {
    const qrCode = new QRCode({ qrCodeImage: qrCodeBuffer });
    await qrCode.save();
    return qrCode._id;
  } catch (error) {
    console.error('Error saving QR code to database:', error.message);
    throw new Error('Failed to save QR code to database');
  }
}

async function updateQRCodeInDB(id, qrCodeBuffer) {
  try {
    await QRCode.findByIdAndUpdate(id, { qrCodeImage: qrCodeBuffer });
  } catch (error) {
    console.error('Error updating QR code in database:', error.message);
    throw new Error('Failed to update QR code in database');
  }
}

async function deleteQRCodeFromDB(id) {
  try {
    await QRCode.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error deleting QR code from database:', error.message);
    throw new Error('Failed to delete QR code from database');
  }
}

module.exports = {
  generateQRCode,
  saveQRCodeToDB,
  updateQRCodeInDB,
  deleteQRCodeFromDB
};

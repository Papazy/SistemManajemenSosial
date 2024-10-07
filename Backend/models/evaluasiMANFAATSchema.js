import mongoose from 'mongoose';

const evaluasiMANFAATSchema = new mongoose.Schema({
  statusBantuan: {
    type: String,
    required: true,
    enum: ['Tetap', 'Berjalan', 'Hilang']
  },
  namaPendamping: {
    type: String,
    required: true
  },
  pekerjaanPendamping: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const EvaluasiManfaat = mongoose.model('EvaluasiManfaat', evaluasiMANFAATSchema);
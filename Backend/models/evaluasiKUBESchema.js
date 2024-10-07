import mongoose from 'mongoose';

const evaluasiKUBESchema = new mongoose.Schema({
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

export const EvaluasiKUBE = mongoose.model('EvaluasiKUBE', evaluasiKUBESchema);
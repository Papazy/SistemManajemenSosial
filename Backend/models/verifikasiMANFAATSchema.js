import mongoose from "mongoose";

const verifikasiManfaatSchema = new mongoose.Schema({
  tahun: {
    type: Number,
    required: true // User is required to fill in the year
  },
  jumlahBantuan: {
    type: Number,
    required: true // User must fill in the number of beneficiaries
  },
  sumberDana: {
    type: String,
    enum: ['APBN', 'APBA', 'APBK'],
    required: true // User must select a funding source
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'pending',
    required: true // User must provide the verification status
  },
  keterangan: {
    type: String,
    default: '' // Optional description field
  }
}, { timestamps: true });

export const VerifikasiManfaat = mongoose.model('VerifikasiManfaat', verifikasiManfaatSchema);

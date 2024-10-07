import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Manfaat } from "../models/manfaatSchema.js";

export const addNewManfaat = catchAsyncErrors(async (req, res, next) => {
  const {
    NIK,
    nomorHP,
    nomorAgendaPermohonan,
    tanggalPermohonan,
    suratKurangMampu,
    rekomendasiCamat,
    bidangBantuan,
    jenisBantuan
  } = req.body;

  if (
    !NIK ||
    !nomorHP ||
    !nomorAgendaPermohonan ||
    !tanggalPermohonan ||
    !suratKurangMampu ||
    !rekomendasiCamat ||
    !bidangBantuan ||
    !jenisBantuan
  ) {
    return next(new ErrorHandler("Mohon Isi Semua Field Yang Diperlukan!", 400));
  }

  const manfaat = await Manfaat.create({
    NIK,
    nomorHP,
    nomorAgendaPermohonan,
    tanggalPermohonan,
    suratKurangMampu,
    rekomendasiCamat,
    bidangBantuan,
    jenisBantuan
  });

  res.status(201).json({
    success: true,
    message: "Data Manfaat Baru Berhasil Ditambahkan!",
    manfaat,
  });
});

export const updateManfaat = catchAsyncErrors(async (req, res, next) => {
  const newManfaatData = {
    NIK: req.body.NIK,
    nomorHP: req.body.nomorHP,
    nomorAgendaPermohonan: req.body.nomorAgendaPermohonan,
    tanggalPermohonan: req.body.tanggalPermohonan,
    suratKurangMampu: req.body.suratKurangMampu,
    rekomendasiCamat: req.body.rekomendasiCamat,
    bidangBantuan: req.body.bidangBantuan,
    jenisBantuan: req.body.jenisBantuan
  };

  const manfaat = await Manfaat.findByIdAndUpdate(req.params.id, newManfaatData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Data Manfaat Berhasil Diperbarui!",
    manfaat,
  });
});

export const deleteManfaat = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const manfaat = await Manfaat.findById(id);
  if (!manfaat) {
    return next(new ErrorHandler("Data Manfaat Tidak Ditemukan!", 404));
  }
  await manfaat.deleteOne();
  res.status(200).json({
    success: true,
    message: "Data Manfaat Berhasil Dihapus!",
  });
});

export const getAllManfaat = catchAsyncErrors(async (req, res, next) => {
  const manfaatList = await Manfaat.find();
  res.status(200).json({
    success: true,
    manfaatList,
  });
});

export const getSingleManfaat = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const manfaat = await Manfaat.findById(id);
    if (!manfaat) {
      return next(new ErrorHandler("Data Manfaat Tidak Ditemukan!", 404));
    }
    res.status(200).json({
      success: true,
      manfaat,
    });
  } catch (error) {
    next(new ErrorHandler("Error Saat Mengambil Data Manfaat", 500));
  }
});

export const getBidangBantuanManfaats = catchAsyncErrors(async (req, res, next) => {
  const manfaats = Manfaat.schema.path('bidangBantuan').enumValues;
  res.status(200).json({
    success: true,
    manfaats,
  });
});
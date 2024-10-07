import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Uep } from "../models/uepSchema.js";

export const postUep = catchAsyncErrors(async (req, res, next) => {
  const {
    nik,
    nomorHP,
    nomorAgendaPermohonan,
    tanggalPermohonan,
    suratKurangMampu,
    rekomendasiCamat,
    bidangBantuan,
    jenisBantuan, 
    alamatUsaha
  } = req.body;

  const newUep = await Uep.create({
    nik,
    nomorHP,
    nomorAgendaPermohonan,
    tanggalPermohonan,
    suratKurangMampu,
    rekomendasiCamat,
    bidangBantuan,
    jenisBantuan,
    alamatUsaha
  });

  res.status(201).json({
    success: true,
    message: "UEP Added!",
    newUep,
  });
});

export const deleteUep = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let uep = await Uep.findById(id);
  if (!uep) {
    return next(new ErrorHandler("UEP not found", 404));
  }
  await uep.deleteOne();
  res.status(200).json({
    success: true,
    message: "UEP Deleted!",
  });
});

export const getAllUeps = catchAsyncErrors(async (req, res, next) => {
  const ueps = await Uep.find();
  res.status(200).json({
    success: true,
    ueps,
  });
});

export const getBidangBantuan = catchAsyncErrors(async (req, res, next) => {
  const bidangBantuanList = Uep.schema.path('bidangBantuan').enumValues;
  res.status(200).json({
    success: true,
    bidangBantuan: bidangBantuanList,
  });
});
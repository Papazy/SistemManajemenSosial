import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Kube } from "../models/kubeSchema.js";

export const addNewKube = catchAsyncErrors(async (req, res, next) => {
  const {
    namaKelompok,
    nomorHP,
    NIKKetua,
    nomorAgendaPermohonan,
    NIKSekretaris,
    tanggalPermohonan,
    NIKBendahara,
    suratKurangMampu,
    anggota,
    rekomendasiCamat,
    bidangBantuan,
    jenisBantuan,
    alamatUsaha
  } = req.body;

  if (!namaKelompok || !nomorHP || !NIKKetua || !nomorAgendaPermohonan) {
    return next(new ErrorHandler("Please Fill All Required Fields!", 400));
  }

  const kube = await Kube.create({
    namaKelompok,
    nomorHP,
    NIKKetua,
    nomorAgendaPermohonan,
    NIKSekretaris,
    tanggalPermohonan,
    NIKBendahara,
    suratKurangMampu,
    anggota,
    rekomendasiCamat,
    bidangBantuan,
    jenisBantuan,
    alamatUsaha
  });

  res.status(201).json({
    success: true,
    message: "New KUBE Added",
    kube,
  });
});

export const deleteKube = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let kube = await Kube.findById(id);
  if (!kube) {
    return next(new ErrorHandler("KUBE not found!", 404));
  }
  await kube.deleteOne();
  res.status(200).json({
    success: true,
    message: "KUBE Deleted!",
  });
});

export const updateKube = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let kube = await Kube.findById(id);
  if (!kube) {
    return next(new ErrorHandler("KUBE not found!", 404));
  }

  kube = await Kube.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "KUBE Updated!",
    kube,
  });
});

export const getAllKubes = catchAsyncErrors(async (req, res, next) => {
  const kubes = await Kube.find();
  res.status(200).json({
    success: true,
    kubes,
  });
});

export const getBidangBantuan = catchAsyncErrors(async (req, res, next) => {
  const bidangBantuan = [
    "PERTANIAN PALAWIJA",
    "PERTERNAKAN UNGGAS",
    "PERIKANAN AIR TAWAR / ASIN",
    "PERTUKANGAN PERABOTAN",
    "PERBENGKELAN",
    "MENJAHIT",
    "KERAJINAN TANGAN / HOME INDUSTRI",
    "JUALAN"
  ];
  
  res.status(200).json({
    success: true,
    bidangBantuan,
  });
});
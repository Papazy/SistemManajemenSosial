import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";

const CetakDataRekapitulasi = ({ breadcrumbItems, tipe }) => {
 
  const [kabupatenData, setKabupatenData] = useState([])
  const [kecamatanData, setKecamatanData] = useState([])
  const [jenisRekap, setJenisRekap] = useState([])
  
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{ 
    const fetchData = async() =>{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${tipe}/print-data`);
      // const response = await fetch(`https://emsifa.github.io/api-wilayah-indonesia/api/regencies/11.json`);
      if(response.ok){
        const data = await response.json(); 
        setKabupatenData(data.Kabupaten);
        setKecamatanData(data.Kecamatan);
        if(tipe === 'PPKS'){
          setJenisRekap(data.Jenis_PPKS);
        }else{
          setJenisRekap(data.Jenis_PSKS);
        }

      }
      setIsLoading(false);
    }
    fetchData();
  },[tipe])



  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />

      <form className="grid grid-cols-1 gap-4 max-w-96">
        {/* Dropdown untuk Kabupaten/Kota */}
        <div>
          <label htmlFor="kabupaten" className="block text-sm font-medium text-gray-700">
            Kabupaten/Kota
          </label>
          <select
            id="kabupaten"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Pilih Kabupaten/Kota</option>
            {isLoading && <p>Loading ...</p>}
            {!isLoading && kabupatenData.map((kabupaten) => (
              <option value={kabupaten}>{kabupaten}</option>
            ))}
          </select>
        </div>

        {/* Dropdown untuk Kecamatan */}
        <div>
          <label htmlFor="kecamatan" className="block text-sm font-medium text-gray-700">
            Kecamatan
          </label>
          <select
            id="kecamatan"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Pilih Kecamatan</option>
            {isLoading && <p>Loading ...</p>}
            {!isLoading && kecamatanData.map((kecamatan) => (
              <option value={kecamatan}>{kecamatan}</option>
            ))}
          </select>
        </div>

        {/* Dropdown dinamis untuk Jenis Rekapitulasi berdasarkan tipe */}
        <div>
          <label htmlFor="jenis-rekapitulasi" className="block text-sm font-medium text-gray-700">
            Jenis Rekapitulasi
          </label>
          <select
            id="jenis-rekapitulasi"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Pilih Jenis Rekapitulasi</option>
               {isLoading && <p>Loading ...</p>}
            {!isLoading && jenisRekap.map((rekap) => (
              <option value={rekap}>{rekap}</option>
            ))}
          </select>
        </div>

        {/* Tombol Cetak */}
        <div className="my-auto">
          <button
            type="submit"
            className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cetak
          </button>
        </div>
      </form>
    </div>
  );
};

export default CetakDataRekapitulasi;

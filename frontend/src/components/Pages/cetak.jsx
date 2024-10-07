import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";


const CetakData = ({ breadcrumbItems, tipe }) => {
  // Data dummy untuk PPKS dan PSKS, ini bisa diganti dengan data yang diambil dari API
  
  
 
  const [kabupatenData, setKabupatenData] = useState([])
  const [kecamatanData, setKecamatanData] = useState([])
  const [desaData, setDesaData] = useState([])
  const [jenisRekap, setJenisRekap] = useState([])
  
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{ 
    const fetchData = async() =>{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${tipe}/print-data`);
      if(response.ok){
        const data = await response.json(); 
        setKabupatenData(data.Kabupaten);
        setKecamatanData(data.Kecamatan);
        console.log(data);

        if(tipe === 'PPKS'){
          setDesaData(data.Desa);
          setJenisRekap(data.Jenis_PPKS);
        }else{
          setDesaData(data.Gampong);
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
        {/* Menampilkan form berdasarkan tipe yang diterima dari props */}
        {tipe === "PPKS" && (
          <div>
            <label htmlFor="jenis-ppks" className="block text-sm font-medium text-gray-700">
              Jenis PPKS
            </label>
            <select
              id="jenis-ppks"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Pilih Jenis PPKS</option>
              {jenisRekap.map((jenis, index) => (
                <option key={index} value={jenis}>
                  {jenis}
                </option>
              ))}
            </select>
          </div>
        )}

        {tipe === "PSKS" && (
          <div>
            <label htmlFor="jenis-psks" className="block text-sm font-medium text-gray-700">
              Jenis PSKS
            </label>
            <select
              id="jenis-psks"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Pilih Jenis PSKS</option>
              {jenisRekap.map((jenis, index) => (
                <option key={index} value={jenis}>
                  {jenis}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Dropdown untuk Kabupaten/Kota, Kecamatan, dan Desa tetap sama untuk PPKS dan PSKS */}
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
            {!isLoading && kabupatenData.map((kecamatan) => (
              <option value={kecamatan}>{kecamatan}</option>
            ))}
          </select>
        </div>

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
            {!isLoading && kecamatanData.map((rekap) => (
              <option value={rekap}>{rekap}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="desa" className="block text-sm font-medium text-gray-700">
            Desa
          </label>
          <select
            id="desa"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Pilih Desa</option>
            {isLoading && <p>Loading ...</p>}
            {!isLoading && desaData.map((rekap) => (
              <option value={rekap}>{rekap}</option>
            ))}
          </select>
        </div>

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



export default CetakData;

import { useEffect, useState } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import Breadcrumb from "../breadcrumb";
import MyDocument from "./cetakPage"; // Komponen yang membuat PDF

const CetakDataRekapitulasi = ({ breadcrumbItems, tipe }) => {
  const [kabupatenData, setKabupatenData] = useState([]);
  const [kecamatanData, setKecamatanData] = useState([]);
  const [jenisRekap, setJenisRekap] = useState([]);
  
  const [selectedKabupaten, setSelectedKabupaten] = useState('');
  const [selectedKecamatan, setSelectedKecamatan] = useState('');
  const [selectedJenisRekap, setSelectedJenisRekap] = useState('');
  const [header, setHeader] = useState({
    title: '',
    kabupaten: '',
    kecamatan: '',
  })
  const [footer, setFooter] = useState([{
    'ADK' : ' Anak Dengan Kecatatan',
    'PD' : ' Penyandang Disabilitas',
    'KAT' : ' Keluarga Adat Terpencil',
    'AY' : ' Anak Yatim',
    'AP' : ' Anak Piatu',
    'AYP' : ' Anak Yatim Piatu',
    'TS' : ' Tuna Susila',
    'KBA' : ' Korban Bencana Alam',
    'AT' : ' Anak Terlantar',
    'PGMS' : ' Pengemis',
    'KBS' : ' Korban Bencana Sosial',
    'ABH' : ' Anak Bermasalah Hukum',
    'GLDG' : ' Gelandangan',
    'PM' : ' Pekerja Migran Bermasalah Sosial',
    'AJ' : ' Anak Jalanan',
    'BWBLK' : ' Bekas Warga Binaan Lembaga Kemasyarakatan',
    'ODHA' : ' Orang Dengan HIV/AIDS',
    'ABT' : ' Anak Balita Terlantar',
    'NAPZA' : ' Korban Penyalahgunaan NAPZA',
    'ODKB' : ' Orang Dengan Kecacatan Berat',
    'AKTK' : ' Anak Korban Tindak Kekerasan',
    'FM' : ' Fakir Miskin',
    'PRSE' : ' Perempuan Rawan Sosial Ekonomi',
    'RTLH' : ' Keluarga Berumah Tidak Layak Huni',
    'KTK' : ' Korban Tindak Kekerasan',
    'KR' : ' Keluarga Rentan',
    'LUT' : ' Lanjut Usia Terlantar',
    'KBSP' : ' Keluarga Bermasalah Sosial Psikologi',
  }])


  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [filteredData, setFilteredData] = useState({
    '' : ''
  });

  useEffect(()=>{ 
    const fetchData = async() =>{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${tipe}/print-data`);
      if(response.ok){
        const data = await response.json(); 
        setKabupatenData(data.Kabupaten);
        setKecamatanData(data.Kecamatan);
        setJenisRekap(tipe === 'PPKS' ? data.Jenis_PPKS : data.Jenis_PSKS);
      }
      setIsLoading(false);
    }
    fetchData();
  },[tipe]);

  const [isLoadingServer, setIsLoadingServer] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoadingServer(true);

    try{

      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${tipe}/social-welfare/getall/${tipe}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });
      const responseData = await response.json();
      console.log(responseData);
      setFilteredData(responseData);
    }catch(err){
      console.log(err);
      alert('Error Memproses Data Cetak');
    }
  
    setHeader({
      title: selectedJenisRekap,
      kabupaten: selectedKabupaten,
      kecamatan: selectedKecamatan,
    })

    setIsLoadingServer(true)
    setIsSubmitted(true);
  };

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />

      <form className="grid grid-cols-1 gap-4 max-w-96" onSubmit={handleSubmit}>
        {/* Dropdown untuk Kabupaten/Kota */}
        <div>
          <label htmlFor="kabupaten" className="block text-sm font-medium text-gray-700">
            Kabupaten/Kota
          </label>
          <select
            id="kabupaten"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={selectedKabupaten}
            onChange={(e) => setSelectedKabupaten(e.target.value)}
          >
            <option value="">Pilih Kabupaten/Kota</option>
            {isLoading && <p>Loading ...</p>}
            {!isLoading && kabupatenData.map((kabupaten, index) => (
              <option key={index} value={kabupaten}>{kabupaten}</option>
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
            value={selectedKecamatan}
            onChange={(e) => setSelectedKecamatan(e.target.value)}
          >
            <option value="">Pilih Kecamatan</option>
            {isLoading && <p>Loading ...</p>}
            {!isLoading && kecamatanData.map((kecamatan, index) => (
              <option key={index} value={kecamatan}>{kecamatan}</option>
            ))}
          </select>
        </div>

        {/* Dropdown untuk Jenis Rekapitulasi */}
        <div>
          <label htmlFor="jenis-rekapitulasi" className="block text-sm font-medium text-gray-700">
            Jenis Rekapitulasi
          </label>
          <select
            id="jenis-rekapitulasi"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={selectedJenisRekap}
            onChange={(e) => setSelectedJenisRekap(e.target.value)}
          >
            <option value="">Pilih Jenis Rekapitulasi</option>
            {isLoading && <p>Loading ...</p>}
            {!isLoading && jenisRekap.map((rekap, index) => (
              <option key={index} value={rekap}>{rekap}</option>
            ))}
          </select>
        </div>

        {/* Tombol Cetak */}
        <div className="my-auto">
          <button
            type="submit"
            className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLoadingServer ? 'Loading...' : 'Cetak'}
          </button>
        </div>
      </form>

      {/* Tampilkan PDF setelah submit */}
      {isSubmitted && filteredData && (
        <div className="mt-8">
          <PDFDownloadLink
            document={<MyDocument data={filteredData} header={header} footer={footer}/>}
            fileName="rekapitulasi.pdf"
          >
            {({ loading }) => (loading ? 'Loading PDF...' : 'Download PDF')}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default CetakDataRekapitulasi;

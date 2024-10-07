import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VerifikasiUEP = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    tahun: '',
    jumlahBantuan: '',
    sumberDana: '',
    status: 'approved'
  });
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false); // To check if we are editing or creating new data

  // Fetch data on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/v1/verifikasi/Uep/verifikasi');
        const resData = res.json()
        const verifikasiData = resData.data.find((data) => data.id === id);

        if (verifikasiData) {
          setFormData({
            tahun: verifikasiData.tahun,
            jumlahBantuan: verifikasiData.jumlahBantuan,
            sumberDana: verifikasiData.sumberDana,
            status: verifikasiData.status
          });
          setIsEdit(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        // Update data if it exists
        await fetch(`http://localhost:4000/api/v1/verifikasi/Uep/update/${id}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
          credentials: 'include'
        });
        alert('Data successfully updated!');
      } else {
        // Create new data if it doesn't exist
        await fetch('http://localhost:4000/api/v1/verifikasi/Uep/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
          credentials: 'include'
        });
        alert('Data successfully added!');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Verifikasi Data Proposal UEP</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="tahun">
            Tahun
          </label>
          <div className="flex items-center border rounded px-3 py-2">
            <input
              type="text"
              name="tahun"
              id="tahun"
              value={formData.tahun}
              onChange={handleChange}
              className="flex-1 outline-none"
              placeholder="Masukkan Tahun"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="jumlahBantuan">
            Jumlah Bantuan
          </label>
          <div className="flex items-center border rounded px-3 py-2">
            <input
              type="number"
              name="jumlahBantuan"
              id="jumlahBantuan"
              value={formData.jumlahBantuan}
              onChange={handleChange}
              className="flex-1 outline-none"
              placeholder="Masukkan Jumlah Bantuan"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="sumberDana">
            Sumber Dana
          </label>
          <div className="flex items-center border rounded px-3 py-2">
            <select
              name="sumberDana"
              id="sumberDana"
              value={formData.sumberDana}
              onChange={handleChange}
              className="flex-1 outline-none">
              <option value="APBA">APBA</option>
              <option value="APBN">APBN</option>
              <option value="Dana Desa">Dana Desa</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>

        <div className="flex justify-start">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded shadow hover:bg-blue-600">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifikasiUEP;

import React from 'react';
import Breadcrumb from '../breadcrumb';

const Proposal = ({breadcrumbItems}) => {
  

  return (
    <div className="p-4 w-full">
      <Breadcrumb items={breadcrumbItems} />
     
      <div className="my-8 flex justify-center items-center gap-5">
        <div className="bg-white p-4 rounded-md shadow-md flex-1 py-8">
          <h2 className="text-lg font-semibold mb-4">List Data</h2>
          <div className="flex flex-col">

          <a href="/proposal/uep" className="mb-2 p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 transition-transform transform hover:bg-gray-100 hover:scale-105">
            Usaha Ekonomi Produktif (UEP)
          </a>
          <a href="/proposal/kube" className="mb-2 p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 transition-transform transform hover:bg-gray-100 hover:scale-105">
            Kelompok Usaha Bersama (KUBE)
          </a>
          <a href="/proposal/manfaat" className="mb-2 p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 transition-transform transform hover:bg-gray-100 hover:scale-105">
            Penerima Manfaat
          </a>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md shadow-md flex-1 py-8">
          <h2 className="text-lg font-semibold mb-4">Input Data</h2>
          <div className="flex flex-col">

          <a href="/proposal/input/uep" className="mb-2 p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 transition-transform transform hover:bg-gray-100 hover:scale-105">
            Usaha Ekonomi Produktif (UEP)
          </a>
          <a href="/proposal/input/kube" className="mb-2 p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 transition-transform transform hover:bg-gray-100 hover:scale-105">
            Kelompok Usaha Bersama (KUBE)
          </a>
          <a href="/proposal/input/manfaat" className="mb-2 p-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 transition-transform transform hover:bg-gray-100 hover:scale-105">
            Penerima Manfaat
          </a>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default Proposal;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Proposal from './page';
import InputRoutes from './input';
import TableLayout from './list/KUBE';
import TableUEP from './list/UEP';
import DetailDataProposal from './config/detail';
import EditRoutes from './config/edit';
import VerifikasiUEP from './verifikasi/UEP';
import EvaluasiFormUEP from './evaluasi/UEP';

function ProposalRoutes() {
  const breadcrumbItems = [
    { label: 'Proposal', path: '/proposal' },
  ];

  return (
    <Routes>
      <Route path="/" element={<Proposal breadcrumbItems={breadcrumbItems} />} />
      <Route path="/kube" element={<TableLayout breadcrumbItems={breadcrumbItems} tipe={"kube"} />} />
      <Route path="/uep" element={<TableUEP breadcrumbItems={breadcrumbItems} tipe={"uep"} />} />
      <Route path="/:tipe/detail/:id" element={<DetailDataProposal breadcrumbItems={breadcrumbItems} tipe={"uep"} />} />
      <Route path="/:tipe/verifikasi/:id" element={<VerifikasiUEP breadcrumbItems={breadcrumbItems} tipe={"uep"} />} />
      <Route path="/:tipe/evaluasi/:id" element={<EvaluasiFormUEP breadcrumbItems={breadcrumbItems} tipe={"uep"} />} />
      <Route path="/:tipe/edit/:id" element={<EditRoutes breadcrumbItems={breadcrumbItems} tipe={"uep"} />} />
      <Route path="input/*" element={<InputRoutes breadcrumbItems={breadcrumbItems} />} />
    </Routes>
  );
}

export default ProposalRoutes;
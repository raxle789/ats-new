'use client';
import React, { useState, useEffect } from 'react';
import Wrapper from '@/layouts/wrapper';
import EmployAside from '@/app/components/dashboard/employ/aside';
import SubmitJobArea from '@/app/components/dashboard/employ/submit-job-area';
import ContohModal from '@/app/components/common/popup/contoh-modal';

const EmployDashboardSubmitJobPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  // Fungsi untuk menampilkan modal saat komponen dimuat
  useEffect(() => {
    setIsModalVisible(false);
  }, []);
  return (
    <>
      {/* Modal */}
      <ContohModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      />
      <SubmitJobArea />;
    </>
  );
};

export default EmployDashboardSubmitJobPage;

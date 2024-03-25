'use client';
import BackToTop from '@/libs/back-to-top';
import React, { useEffect } from 'react';

function BackToTopCom() {
  useEffect(() => {
    BackToTop('.scroll-top');
  }, []);
  return (
    <button className="scroll-top">
      <i className="bi bi-arrow-up-short"></i>
    </button>
  );
}

export default BackToTopCom;

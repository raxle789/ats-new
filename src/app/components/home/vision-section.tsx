'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import vertical_line from '@/assets/images/vertical-line.jpg';

const VisionSection = () => {
  return (
    <>
      <div className="vision-section container mt-100">
        <div className="row">
          <div className="col-lg-4">
            <h2>Vision</h2>
            <p className="mt-5 mb-40">
              To provide mobile products and solutions to improve the quality of
              life and lifestyle
            </p>
            <h2>Mission</h2>
            <p className="mt-5">
              Becoming a leading distribution and retail company with integrated
              direct access to consumers and retailers that offer a complete
              range of mobile products & solutions
            </p>
          </div>
          <div className="col-lg-8">
            <h2 className="text-center mb-40">ILEAD Core Values</h2>
            <div className="row">
              <div className="col-lg-6">
                <h3>Innovation</h3>
                <p className="mt-5">Strategic thinking</p>
              </div>
              <div className="col-lg-6">
                <h3>Digital</h3>
                <p className="mt-5">Technology savvy</p>
              </div>
              <div className="col-lg-6">
                <h3>Leadership</h3>
                <p className="mt-5">
                  Strategic leadership, leading others and developing others
                </p>
              </div>
              <div className="col-lg-6">
                <h3>Agility</h3>
                <p className="mt-5">Creative agility</p>
              </div>
              <div className="col-lg-6">
                <h3>Excellent Customer Service</h3>
                <p className="mt-5">
                  Reliable partner, quality-oriented and achievement-oriented
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisionSection;

'use client';

import React from 'react';

const JobDetailWrapper = ({ component, property }) => {
  // new component

  return React.createElement(component, { property });
};

export default JobDetailWrapper;

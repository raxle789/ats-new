import React from 'react';
import formidable from 'formidable';
import path from 'path';
import postFile from './upload';

export const config = {
  api: {
    bodyParser: false,
  },
};

// export default async (req, res) => {
// };

const HandleUploadPage = async () => {
  postFile();
  return <div>Handle Upload</div>;
};

export default HandleUploadPage;

'use client';

import { Document, pdfjs, Page } from 'react-pdf';
import { useState, useEffect } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = import(
//   'pdfjs-dist/build/pdf.worker.min.mjs'
// ).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = `/static/js/pdf.worker-${pdfjs.version}.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = `; //cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
};

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const DocumentViewer = ({ data }) => {
  const [file, setFile] = useState<File | null>(null);

  const [filePage, setFilePage] = useState(1);

  useEffect(() => {
    // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    //   'pdfjs-dist/build/pdf.worker.min.mjs',
    //   import.meta.url,
    // ).toString();

    // const base64String = data.toString();

    fetch(data as string)
      .then((res) => res.blob())
      .then((blob) => setFile(new File([blob], 'ayam.pdf')));
  }, []);

  return (
    <>
      {file && (
        <Document
          file={file}
          options={options}
          onLoadSuccess={() => console.info('ayam goreng')}
        >
          <Page pageNumber={filePage} renderTextLayer={false} />
        </Document>
      )}
    </>
  );
  6;
};

export default DocumentViewer;

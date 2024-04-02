import formidable from 'formidable';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default postFile = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'public/uploads');
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed.' });
    }

    const imagePath = files.image.path;

    return res.status(200).json({ imagePath });
  });
};

// import { NextApiRequest, NextApiResponse } from 'next';
// import multer from 'multer';
// import { v4 as uuidv4 } from 'uuid';
// import path from 'path';

// // Konfigurasi multer untuk menangani pengunggahan file
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: './public/uploads',
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname);
//       const filename = uuidv4() + ext;
//       cb(null, filename);
//     },
//   }),
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Handler untuk endpoint POST /api/upload
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     // Menjalankan middleware upload dengan nama field 'file'
//     upload.single('file')(req, res, (err: any) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Terjadi kesalahan saat mengunggah file' });
//       }
//       return res.status(200).json({ message: 'File berhasil diunggah' });
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Terjadi kesalahan saat mengunggah file' });
//   }
// }

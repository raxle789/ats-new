import formidable from 'formidable';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
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

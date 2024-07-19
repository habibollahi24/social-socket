import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';
import multer from 'multer';
import { Readable } from 'stream';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's built-in body parser
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //   if (req.method !== 'POST') {
  //     return res.status(405).json({ error: 'Method not allowed' });
  //   }

  try {
    await new Promise<void>((resolve, reject) => {
      upload.single('file')(req, {} as any, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const file = (req as any).file;
    const stream = Readable.from(file.buffer);

    const result = await new Promise((resolve, reject) => {
      const streamLoad = cloudinary.v2.uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
      stream.pipe(streamLoad);
    });

    return res.status(200).json({ success: true, result });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export default handler;

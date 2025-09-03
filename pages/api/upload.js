import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image } = req.body;
    
    const result = await cloudinary.uploader.upload(image, {
      folder: 'schools',
    });

    res.json({ imagePath: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
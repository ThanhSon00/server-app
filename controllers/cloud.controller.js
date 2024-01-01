const { StatusCodes } = require('http-status-codes');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const uploadFile = async (req, res) => {
    const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream((error, result) => { if (result) resolve(result); else reject(error) });
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        })
    }

    const result = await streamUpload(req);
    // Check if the Cloudinary upload was successful
    if (!result || !result.secure_url) {
        throw new Error("Error uploading the file to Cloudinary.");
    }
    // save to db
    return res.status(StatusCodes.CREATED).json({ image: result.secure_url });
}

module.exports = {
    uploadFile,
}
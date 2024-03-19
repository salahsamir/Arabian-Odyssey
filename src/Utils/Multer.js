import multer from 'multer';

const list = ['image/png', 'image/jpg', 'image/jpeg'];

export const UploadImage = () => {
    const storage = multer.diskStorage({});
    
    const fileFilter = (req, file, cb) => {
        if (list.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('invalid_extension'), false);
        }
    };

    const upload = multer({ storage, fileFilter });
    return upload;
};

import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirSync('uploads', { recursive: true })
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const filename = file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]
        cb(null, filename)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cd(new Error ('Invalid file type, should be iamge file'))
    }
}

const limits = {
    filesize: 1024 * 1024 * 5
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
})

export default upload
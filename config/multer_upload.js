import multer from 'multer';
import randomstring from 'randomstring';
import path from 'path';
import fs from 'fs';


let upload = []
let maxSize = 100*1024*1024 // file upload max size 100MB

const defaultDisk = {
    destination: 'public/uploads',
    filename: function(req, file, callback) {
        // make sure theres no duplicate file
        let safe_filename = generate_filename(file);

        fs.readFile(path.normalize(`${__dirname}/../public/uploads/`) + safe_filename, (err, data) => {
            if (err) {
                callback(null, safe_filename);
            } else { 
                safe_filename = generate_filename(file);
            }
        })
    }
}

function generate_filename(file){
    return randomstring.generate(10) + path.extname(file.originalname);
}

upload['default'] = multer({storage: multer.diskStorage(defaultDisk), limits: { fileSize: maxSize}});

export default upload['default'];
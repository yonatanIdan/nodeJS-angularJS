const fs = require('fs');
const path = require('path');
const PUBLIC_PATH = "../public/image"

class FileController {

    constructor() {}

    writeFileBase64(req, res) {
        let filePath = path.join(__dirname, PUBLIC_PATH, req.body.name);
        console.log('filePath:', filePath);
        let file_data = req.body.blob.substr(req.body.blob.indexOf("base64") + "base64".length + 1);
        fs.writeFile(filePath, file_data, { encoding: 'base64' },(err, data) => {
            if (err) res.status(400).json({ reason: 'Error in Data Base' })
            else res.json(data);
        });
    }

}

module.exports = {
    fileController: new FileController()
}
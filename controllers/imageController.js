const CONSTANTS = require('../constants');
const uploadURL = require('../functions').uploadURL
const fs = require('fs');
const resizeImg = require('resize-img');
const isImageUrl = require('is-image-url');

const createThumbnail = async (req, res) => {
    try {
        const params = req.query
        const filename = `${new Date() / 1000}`;
        const url = params.url
        if (!isImageUrl(url)) {
            res.status(422).send({
                message: 'Invalid url',
                response_code: 422
            });
        }
        else {
            uploadURL(params.url, filename + '.png', (err) => {
                if (err) {
                    res.status(500).send({
                        message: err,
                        response_code: 500
                    });
                }
                else {
                    const newFileName = `${filename}-50x50.png`
                    resizeImg(fs.readFileSync(`uploads/${filename}.png`), { width: 50, height: 50 }).then(buf => {
                        try {
                            fs.writeFileSync(`uploads/${newFileName}`, buf);
                            res.status(200).send({
                                thumbnail_image: `${CONSTANTS.SERVER_ADDRESS}/uploads/${newFileName}`
                            })
                        } catch (err) {
                            res.status(500).send({
                                message: err.message,
                                response_code: 500
                            });
                        }
                    });
                }
            })
        }

    } catch (err) {
        res.status(500).send({
            message: err.message,
            response_code: 500
        });
    }
}


module.exports = {
    createThumbnail
}
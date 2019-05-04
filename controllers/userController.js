const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const CONSTANT = require('../constants');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken')

const addUser = async (req, res) => {
    try {
        const timestamp = new Date();
        const params = req.body;
        const passwordHash = await bcrypt.hashSync(params.password, CONSTANT.SALT_ROUND);

        const newUser = new userModel({
            first_name: params.first_name,
            last_name: params.last_name,
            email: params.email,
            password: passwordHash,
            created_at: timestamp,
            updated_at: timestamp
        });

        newUser.save()
            .then(data => {
                res.status(201).send({
                    message: 'User added',
                    response_code: 201
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message,
                    response_code: 500
                });
            });

    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            response_code: 500
        });
    }
}

getUsers = (req, res) => {
    try {
        userModel.find()
            .then(data => {
                res.send({
                    data,
                    response_code: 200
                });

            }).catch(err => {
                res.status(500).send({
                    message: err.message,
                    response_code: 500
                });
            });
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            response_code: 500
        });
    }
}

updateUser = (req, res) => {
    try {
        let timestamp = new Date();
        let params = req.body;

        if (!ObjectId.isValid(params.user_id)) {
            res.send({
                message: 'No user found'
                , response_code: 404
            });
        }
        else {
            params.updated_at = timestamp;
            userModel.findOneAndUpdate({ _id: params.user_id }, params, { new: true })
                .then(data => {
                    if (data !== null)
                        res.send({
                            data,
                            response_code: 201
                        });
                    else
                        res.send({
                            message: 'No user found',
                            response_code: 404
                        });
                }).catch(err => {
                    res.status(500).send({
                        message: err.message,
                        response_code: 500
                    });
                });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            response_code: 500
        });
    }
}

deleteUsers = (req, res) => {
    try {
        let params = req.body;
        if (!ObjectId.isValid(params.user_id)) {
            res.send({
                message: 'No user found'
                , response_code: 404
            });
        }
        else {
            userModel.findByIdAndDelete(params.user_id)
                .then(data => {
                    res.send({
                        message: 'user deleted',
                        response_code: 200
                    });

                }).catch(err => {
                    res.status(500).send({
                        message: err.message,
                        response_code: 500
                    });
                });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err.message,
            response_code: 500
        });
    }
}

loginUser = (req, res) => {
    try {
        let params = req.body;
        userModel.find({ email: params.email })
            .then(data => {
                if (data.length === 1) {
                    bcrypt.compare(params.password, data[0].password, function (err, result) {
                        if (err) {
                            res.status(500).send(RESPONSE(err.toString(), 500));
                        }
                        if (result) {
                            const token = jwt.sign({ check: true }, CONSTANT.JWT_SECRET_KEY, { expiresIn: '24h' });
                            delete data[0].password
                            res.status(200).send({
                                data: data[0],
                                token: token,
                                response_code: 200
                            });
                        }
                        else {
                            res.status(403).send({
                                message: 'Wrong password',
                                response_code: 403
                            });
                        }
                    });
                }
                else if (data.length > 1) {
                    res.status(500).send({
                        message: 'Multiple user with same phone',
                        response_code: 500
                    });
                }
                else {
                    res.status(404).send({
                        message: 'No user found',
                        response_code: 404
                    });
                }
            }).catch(err => {
                res.status(500).send({
                    message: err.message,
                    response_code: 500
                });
            });
    }
    catch (e) {
        res.status(500).send({
            message: err.message,
            response_code: 500
        });
    }
}

module.exports = {
    addUser,
    getUsers,
    updateUser,
    deleteUsers,
    loginUser
}
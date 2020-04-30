import Joi from '@hapi/joi';
import HttpStatus, { NON_AUTHORITATIVE_INFORMATION } from 'http-status-codes';

function register (req) {
    const schema = Joi.object({
        fullname: Joi.string()
            .required()
            .messages({
                'string.base': 'format fullname salah',
                'string.empty': 'fullname masih kosong',
            }),
        email: Joi.string().email()
            .required()
            .messages({
                'string.email': "format email salah",
                'string.empty': "email masih kosong",
            }),
        password: Joi.string().min(8).max(16)
            .required()
            .messages({
                'string.base': "format password salah",
                'string.empty': "password masih kosong",
                'string.min': "password harus memiliki minimal 8 karakter",
                'string.max': "password maksimal 16 karakter",
            }),
        confirm_password: Joi.string().min(8).max(16).required(),
    });

    const {error} = schema.validate(req.body);
    return error
};

export default {
    register,
};
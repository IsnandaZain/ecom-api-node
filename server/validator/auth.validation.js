import Joi from '@hapi/joi';

function login (req) {
    const schema = Joi.object({
        identifier: Joi.string()
            .required()
            .messages({
                'string.empty': "username / email masih kosong",
            }),
        password: Joi.string().min(8).max(16)
            .required()
            .messages({
                'string.base': "format password salah",
                'string.min': "password harus memiliki minimal 8 karakter",
                'string.max': "password maksimal 16 karakter",
                'string.empty': "password masih kosong",
            }),
    });

    const {error} = schema.validate(req.body);
    return error
}

function logout (req) {
    const schema = Joi.object({
        token: Joi.string()
            .required()
            .messages({
                'string.base': 'format token salah',
                'string.empty': 'token masih kosong'
            })
    });

    const { error } = schema.validate(req.body);
    return error;
}

function forgot_password (req) {
    const schema = Joi.object({
        email: Joi.string().email()
            .required()
            .messages({
                'string.email': "format email salah",
                'string.empty': "email masih kosong",
            }),
    });

    const {error} = schema.validate(req.body);
    return error
}

function change_password_forgot (req) {
    const schema = Joi.object({
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
}

function register (req) {
    const schema = Joi.object({
        fullname: Joi.string()
            .required()
            .messages({
                'string.base': 'format fullname salah',
                'string.empty': 'fullname masih kosong',
            }),
        roles: Joi.string().valid('user', 'administrator')
            .required()
            .messages({
                'string.base': 'role user tidak diketahui',
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
    login,
    forgot_password,
    logout,
    change_password_forgot,
};
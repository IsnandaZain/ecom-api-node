import Joi from '@hapi/joi';

function create (req) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50)
            .required()
            .messages({
                "string.base": "format category salah",
                "string.empty": "category masih kosong",
                "string.min": "category harus memiliki minimal 2 karakter",
                "string.max": "category maksimal 50 karakter"
            }),
        parent_id: Joi.number().integer()
            .optional(),
    });

    const {error} = schema.validate(req.body);
    return error
};

function update (req) {
    const schema = Joi.object({
        id: Joi.number.integer()
            .required()
            .messages({
                "string.base": "id harus integer",
                "string.empty": "id masih kosong"
            }),
        name: Joi.string().min(2).max(50)
            .required()
            .messages({
                "string.base": "format category salah",
                "string.empty": "category masih kosong",
                "string.min": "category harus memiliki minimal 2 karakter",
                "string.max": "category maksimal 50 karakter"
            }),
    });

    const {error} = schema.validate(req.body);
    return error
};

export default {
    create,
    update,
};
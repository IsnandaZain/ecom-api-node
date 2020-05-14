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

export default {
    create,
};
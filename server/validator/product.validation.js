import Joi from '@hapi/joi';

function create (req) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(160)
            .required()
            .messages({
                "string.base": "format title salah",
                "string.empty": "title masih kosong",
                "string.min": "title harus memiliki minimal 5 karakter",
                "string.max": "title maksimal 160 karakter"
            }),
        description: Joi.string().min(255).max(500)
            .required()
            .messages({
                "string.base": "format description salah",
                "string.empty": "description masih kosong",
                "string.min": "description harus memiliki minimal 255 karakter",
                "string.max": "description maksimal 500 karakter"
            }),
        price: Joi.number().integer()
            .required()
            .messages({
                "string.base": "harga harus berupa angka",
                "string.empty": "harga masih kosong"
            }),
        stok: Joi.number().integer()
            .required()
            .messages({
                "string.base": "stok harus berupa angka",
                "string.empty": "stok masih kosong"
            })
    });

    const {error} = schema.validate(req.body);
    return error
};

export default {
    create
};
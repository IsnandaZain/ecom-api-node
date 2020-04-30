import HttpStatus from 'http-status-codes';
import db from '../../config/sequelize_master';

const Product = db.Product;

/**
 * Create a new product
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
function create(req, res, next) {
    const product = Product.build({
        title: req.body.title,
    });

    product.save()
        .then(saved => res.json(saved))
        .catch(e => next(e))
}


export {
    create
};
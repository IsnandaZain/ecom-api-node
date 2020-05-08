import HttpStatus from 'http-status-codes';
import {Sequelize} from 'sequelize';
import moment from 'moment';

import db from '../../config/sequelize_master';
import * as authData from '../helpers/auth';
import * as APIError from '../helpers/APIError';

const User = db.User;
const Product = db.Product;

/**
 * Create a new product
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
function create(req, res, next) {
    console.log(authData.dataUser);
    Product.create({
        user_id: authData.dataUser.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        stok: req.body.stok,
    }).then( (product_saved) => {
        const response = {
            "status": HttpStatus.OK,
            "product": {
                "id": product_saved.id,
                "title": product_saved.title,
                "description": product_saved.description,
                "price": product_saved.price,
                "stok": product_saved.stok,
                "is_deleted": product_saved.is_deleted,
                "created_at": moment(product_saved.created_at).unix(),
            }
        }
        return res.json(response);
    }).catch( error => {
        console.log(error);
        return res.json(APIError.InternalServerError());
    })
}


export {
    create
};
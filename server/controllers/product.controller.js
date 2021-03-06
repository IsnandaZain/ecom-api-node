import HttpStatus from 'http-status-codes';
import {Sequelize} from 'sequelize';
import moment from 'moment';

import db from '../../config/sequelize_master';
import * as authData from '../helpers/auth';
import * as APIError from '../helpers/APIError';

const User = db.User;
const Product = db.Product;
const ProductSize = db.ProductSize;
const ProductColor = db.ProductColor;
const ProductMaterial = db.ProductMaterial;
const ProductCategory = db.ProductCategory;

/**
 * Create a new product
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
function create(req, res) {
    Product.create({
        user_id: authData.dataUser.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        stok: req.body.stok,
    }).then( (product_saved) => {
        if (req.body.size) {
            for (let index in req.body.size){
                ProductSize.create({
                    product_id: product_saved.id,
                    size_:req.body.size[index],
                })
            }
        }

        if (req.body.color) {
            for (let index in req.body.color) {
                ProductColor.create({
                    product_id: product_saved.id,
                    color: req.body.color[index]
                })
            }
        }

        if (req.body.material) {
            for (let index in req.body.material) {
                ProductMaterial.create({
                    product_id: product_saved.id,
                    material: req.body.material[index]
                })
            }
        }

        let category = []
        for (let index in req.body.category) {
            category.push(JSON.parse(req.body.category[index]))
            ProductCategory.create({
                product_id: product_saved.id,
                category_id: JSON.parse(req.body.category[index]).id,
            })
        } 
        
        const response = {
            "id": product_saved.id,
            "title": product_saved.title,
            "description": product_saved.description,
            "price": product_saved.price,
            "stok": product_saved.stok,
            "size": req.body.size,
            "color": req.body.color,
            "material": req.body.material,
            "category": category,
        }

        return res.json(response);
    }).catch( error => {
        console.log(error);
        return APIError.InternalServerError(res);
    })
}


function get(req, res) {
    Product.findOne({
        where: Sequelize.and(
            {is_deleted: 0},
            {id: req.body.id},
        ), include: [{
            model: ProductSize,
            as: 'product_size',
            order: [
                ['id', 'desc']
            ]
        }, {
            model: ProductColor,
            as: 'product_color',
            order: [
                ['id', 'desc']
            ]
        }, {
            model: ProductMaterial,
            as: 'product_material',
            order: [
                ['id', 'desc']
            ]
        }]
    }).then ( (product) => {
        if (!product) {
            return APIError.NotFound(res, "product tidak ditemukan");
        } else {
            const response = {
                "status": HttpStatus.OK,
                "product": {
                    "id": product.id,
                    "title": product.title,
                    "description": product.description,
                    "price": product.price,
                    "stok": product.stok,
                    "is_deleted": product.is_deleted,
                }
            }
        }
    })
}

export {
    create,
    get,
};
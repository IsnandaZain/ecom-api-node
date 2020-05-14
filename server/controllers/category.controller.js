import HttpStatus from 'http-status-codes';
import {Sequelize} from 'sequelize';

import db from '../../config/sequelize_master';
import * as APIError from '../helpers/APIError';

const Category = db.Category;

/**
 * Carete a new category
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
function create(req, res) {
    Category.create({
        name: req.body.name,
        parent_id: req.body.parent_id ? req.body.parent_id : null,
    }).then( (category_saved) => {
        const response = {
            "id": category_saved.id,
            "name": category_saved.name,
            "parent_id": category_saved.parent_id,
            "is_deleted": category_saved.is_deleted,
        }

        return res.json(response);
    }).catch( error => {
        console.log(error);
        return APIError.InternalServerError(res);
    })
}

function get(req, res) {
    Category.findOne({
        where: Sequelize.and(
            {is_deleted: 0},
            {id: req.params.id}
        )
    }).then( (category_saved) => {
        if (!category_saved) {
            return APIError.NotFound(res, "category tidak ditemukan");
        } else {
            const response = {
                "id": category_saved.id,
                "name": category_saved.name,
                "parent_id": category_saved.parent_id,
                "is_deleted": category_saved.is_deleted,
            }
            return res.json(response);
        }
    }).catch( error => {
        console.log(error);
        return APIError.InternalServerError(res);
    })
}

function update(req, res) {
    Category.findOne({
        where: Sequelize.and(
            {is_deleted: 0},
            {id: req.body.id}
        )
    }).then( (category_saved) => {
        if (!category_saved) {
            return APIError.NotFound(res, "category tidak ditemukan");
        } else {
            category_saved.update({name: req.body.name})
            return res.json({
                "status": HttpStatus.OK,
                "messages": "berhasil mengupdate category"
            })
        }
    }).catch( error => {
        console.log(error);
        return APIError.InternalServerError(res);
    })
}

function remove(req, res) {
    Category.findOne({
        where: Sequelize.and(
            {is_deleted: 0},
            {id: req.params.id}
        )
    }).then( (category_saved) => {
        if (!category_saved) {
            return APIError.NotFound(res, "category tidak ditemukan");
        } else {
            category_saved.update({ is_deleted: 1})
            return res.json({
                "status": HttpStatus.OK,
                "messages": "berhasil menghapus category"
            })
        }
    }).catch( error => {
        console.log(error);
        return APIError.InternalServerError(res);
    })
}

export {
    create,
    get,
    update,
    remove,
}
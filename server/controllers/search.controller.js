import HttpStatus from 'http-status-codes';
import {Sequelize} from 'sequelize';

import db from '../../config/sequelize_master';
import * as APIError from '../helpers/APIError';

const Category = db.Category;


function search_category(req, res) {
    let filter = [
        {is_deleted: 0}
    ]

    if (req.query.name) {
        filter.push({name: req.query.name})
    }

    if (req.query.parent_id) {
        filter.push({parent_id: req.query.parent_id})
    }

    Category.findAll({
        where: Sequelize.and(
            filter
        )
    }).then( (category_saved) => {
        if (!category_saved) {
            return APIError.NotFound(res, "category tidak ditemukan");
        } else {
            let result = []
            for (let index in category_saved) {
                result.push({
                    "id": category_saved[index].id,
                    "name": category_saved[index].name,
                    "parent_id": category_saved[index].parent_id,
                    "is_deleted": category_saved[index].is_deleted
                })
            }

            const response = {
                "status": HttpStatus.OK,
                "category": result
            }
            return res.json(response);
        }
    }).catch( error => {
        console.log(error);
        return APIError.InternalServerError(res);
    })
}

export {
    search_category
};
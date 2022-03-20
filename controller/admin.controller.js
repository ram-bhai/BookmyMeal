const express = require('express');
const { validationResult } = require('express-validator');
const Admin = require('../models/admin.model');
const user = require('../models/user.model');;
const category = require("../models/category.model");
const food = require('../models/foods.model');


exports.signup = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(403).json({ errors: errors.array() })
    }
    let adminName = request.body.userName;
    let adminEmail = request.body.email;
    let adminPassword = request.body.password;
    Admin.create({ userName: adminName, email: adminEmail, password: adminPassword })
        .then(result => {
            console.log(result);
            return response.status(201).json(result);
        }).catch(err => {
            return response.status(500).json({ message: 'Oops! something went wrong' })
        });


}

exports.signin = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(403).json({ errors: errors.array() });
    Admin.findOne({ email: request.body.email, password: request.body.password })
        .then(result => {
            if (result)
                return response.status(200).json(result);
            else
                return response.status(404).json({ message: 'Invalid user' })
        }).catch(err => {
            return response.status(500).json({ message: 'Oops something went wrong' });
        })
}

exports.viewUser = (request, response) => {
    user.find().then(results => {
            return response.status(200).json(results);
        })
        .catch(err => {
            return response.status(500).json({ message: 'Sever issues' });
        });
}


exports.addCategory = (request, response) => {
    // console.log(request.body);
    // console.log(request.file);

    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });

    category.create({
            categoryName: request.body.categoryName,
            categoryImageUrl: "http://localhost:3000/images/" + request.file.filename
        })
        .then(result => {
            return response.status(201).json(result);
        }).catch(err => {
            return response.status(403).json({ message: 'Oops Something went wrong' })
        })
}


exports.viewCategory = (request, response) => {
    category.find().then(results => {
            return response.status(200).json(results);
        })
        .catch(err => {
            return response.status(500).json({ message: 'Sever issues' });
        });
}


exports.deleteCategory = (request, response) => {
    console.log(request);
    category.deleteOne({ _id: request.params.id })
        .then(result => {
            if (result.deletedCount)
                return response.status(202).json({ message: 'Category has been deleted successfully' });
            else
                return response.status(204).json({ message: 'unable to delete category' });
        })
        .catch(err => {
            return response.status(500).json({ message: 'Something went wrong' });
        });
}


exports.updateCategory = (request, response) => {
    let id = request.params._id;
    console.log(request);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    category.updateOne({ _id: id }, {
        $set: {
            categoryName: request.body.categoryName,
            categoryImageUrl: "http://localhost:3000/images/" + request.file.filename,
        }
    }).then(result => {
        if (result.modifiedCount)
            return response.status(204).json(result);
        else
            return response.status(404).json({ message: 'record not found' });
    }).catch(err => {
        return response.status(500).json({ message: 'Something went wrong..' });
    });
}



exports.addFood = (request, response) => {
    console.log(request.body);

    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        console.log(errors);
        return response.status(400).json({ errors: errors.array() });
    }

    let foodImageUrl1 = "";
    let foodImageUrl2 = "";
    let foodImageUrl3 = "";
    if (request.files.length > 0) {
        foodImageUrl1 = "http://localhost:3000/images/" + request.files[0].filename;
        if (request.files.length > 1) {
            foodImageUrl2 = "http://localhost:3000/images/" + request.files[1].filename;
            if (request.files.length > 2) {
                foodImageUrl3 = "http://localhost:3000/images/" + request.files[2].filename;
            }
        }
    }


    food.create({
        foodName: request.body.foodName,
        foodImageUrl1: foodImageUrl1,
        foodImageUrl2: foodImageUrl2,
        foodImageUrl3: foodImageUrl3,
        foodPrice: request.body.price,

        foodQty: request.body.quantity,
        foodDescription: request.body.description,
        foodDiscount: request.body.discount,
        categoryId: request.body.id


    }).then(result => {
        console.log(result);
        return response.status(202).json(result);
    }).catch(err => {
        return response.status(403).json(err)
    })
}

exports.viewFood = (request, response) => {
    food.find().populate('categoryId').then(results => {
            return response.status(200).json(results);
        })
        .catch(err => {
            return response.status(500).json({ message: 'Sever issues' });
        });
}

exports.deleteFood = (request, response) => {
    food.deleteOne({ _id: request.params.id })
        .then(result => {
            if (result.deletedCount)
                return response.status(202).json({ message: 'Food has been deleted successfully' });
            else
                return response.status(204).json({ message: 'unable to delete' });
        })
        .catch(err => {
            return response.status(500).json({ message: 'Something went wrong' });
        });
}


exports.updateFood = (request, response) => {
    let id = request.params.productId;
    console.log(request);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    let foodImageUrl1 = "";
    let foodImageUrl2 = "";
    let foodImageUrl3 = "";
    if (request.files.length > 0) {
        foodImageUrl1 = "http://localhost:3000/images/" + request.files[0].filename;
        if (request.files.length > 1) {
            foodImageUrl2 = "http://localhost:3000/images/" + request.files[1].filename;
            if (request.files.length > 2) {
                foodImageUrl3 = "http://localhost:3000/images/" + request.files[2].filename;

            }
        }
    }

    food.updateOne({ _id: id }, {
        $set: {
            foodName: request.body.foodName,
            foodImageUrl1: foodImageUrl1,
            foodImageUrl2: foodImageUrl2,
            foodImageUrl3: foodImageUrl3,
            foodPrice: request.body.Price,
            foodQty: request.body.quantity,
            foodDescription: request.body.description,
            foodDiscount: request.body.discount
        }
    }).then(result => {
        if (result.modifiedCount)
            return response.status(204).json({ message: 'product updated successfully' }, result);
        else
            return response.status(404).json({ message: 'record not found' });
    }).catch(err => {
        return response.status(500).json({ message: 'Something went wrong..' });
    });
}
const nodemailer = require("nodemailer");
const { validationResult } = require('express-validator');
const user = require('../models/user.model');
const cartmodel = require('../models/cart.model');
const favouritem = require('../models/favourite.model');
const package = require("../models/package.model");
const orderModel = require('../models/order.model');
const { request } = require("express");
const { response } = require("express");
const { json } = require("express/lib/response");

exports.signup = (request, response) => {


    const errors = validationResult(request);
    if (!errors.isEmpty) {
        return response.status(403).json({ errors: errors.array() })
    }
    let userName = request.body.username;
    let contact = request.body.mobile;
    let userEmail = request.body.email;
    let userPassword = request.body.password;


    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "officialgourmand@gmail.com",
            pass: "bhukh@Lgi",
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    let mailOptions = {
        from: "officialgourmand@gmail.com",
        to: userEmail,
        subject: "Your login credentials",


        text: JSON.stringify({
            email: userEmail,
            password: userPassword
        })

    }
    transporter.sendMail(mailOptions, function(err, success) {
        if (err)
            console.log(err);
        else
            console.log("Email has been sent successfully");
    });

    user.create({ username: userName, mobile: contact, email: userEmail, password: userPassword })
        .then(result => {
            console.log(result);
            return response.status(201).json(result);

        }).catch(err => {
            return response.status(500).json({ message: 'Oops! something went wrong' })
        });


}

exports.signin = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty)
        return response.status(403).json({ errors: errors.array() });
    user.findOne({ email: request.body.email, password: request.body.password })
        .then(result => {
            if (result)
                return response.status(200).json(result);
            else
                return response.status(404).json({ message: 'Invalid user' })
        }).catch(err => {
            return response.status(500).json({ message: 'Oops something went wrong' });
        })
}




exports.addtoCart = async(request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        console.log(errors);
        return response.status(400).json({ errors: errors.array() });
    }
    let cart = await cartmodel.findOne({ userId: request.body.userId });
    if (!cart) {
        cart = new cartmodel();
        cart.userId = request.body.userId
    }
    cart.foodList.push(request.body.foodId);
    cart.save().then(result => {
        return response.status(201).json(result)
    }).catch(
        err => {
            return response.status(500).json({ message: 'Oops! Something went wrong' });
        })
}


exports.viewCart = (request, response) => {
    cartmodel.findOne({ userId: request.params.userId })
        .populate("foodList").populate("userId")
        .then(result => {
            return response.status(201).json(result)
        }).catch(error => {
            return response.status(500).json({ message: 'Oops! Something went wrong' });
        })
}


exports.removeCart = (request, response) => {
    cartmodel.updateOne({ userId: request.body.userId }, {
            $pullAll: {
                foodList: [{
                    _id: request.body.foodId
                }]
            }
        })
        .then(result => {
            return response.status(202).json({ message: 'Updated successfully' });
        }).catch(error => {
            return response.status(500).json({ message: 'Oops! Something went wrong' });
        })


}


exports.addtoFavourite = async(request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        console.log(errors);
        return response.status(400).json({ errors: errors.array() });
    }
    let favourite = await favouritem.findOne({ userId: request.body.userId });
    if (!favourite) {
        favourite = new favouritem();
        favourite.userId = request.body.userId
    }
    favourite.foodList.push(request.body.foodId);
    favourite.save().then(result => {
        return response.status(201).json(result)
    }).catch(
        err => {
            return response.status(500).json({ message: 'Oops! Something went wrong' });
        })
}

exports.viewfavourites = (request, response) => {
    favouritem.findOne({ userId: request.params.userId })
        .populate("foodList").populate("userId")
        .then(result => {
            return response.status(201).json(result)
        }).catch(error => {
            return response.status(500).json({ message: 'Oops! Something went wrong' });
        })
}



exports.viewPackage = (request, response) => {
    package.find(request.body)
        .then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            return response.status(500).json(err);
        });
}

exports.availablePackage = (request, response) => {
    package.find({ quantity: { $gt: 0 } })
        .then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            return response.status(500).json(err);
        });
}

exports.todayMealOption = (request, response) => {
    var date = new Date();
    var day;
    if (date.getDay() == 0)
        day = "sunday";
    else if (date.getDay() == 1)
        day = "monday";
    else if (date.getDay() == 2)
        day = "tuesday";
    else if (date.getDay() == 3)
        day = "wednesday";
    else if (date.getDay() == 4)
        day = "thursday";
    else if (date.getDay() == 5)
        day = "friday";
    else if (date.getDay() == 6)
        day = "saturday";

    package.find({ $or: [{ day: { $eq: day } }, { day: 'daily' }] })
        .then(result => {
            response.status(200).json(result);
        })
        .catch(err => {
            response.status(500).json(err);
        });

}

exports.place_order = (request, response) => {
    orderModel.create(request.body)
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ err: "OOPS SOMETHING WENT WRONG" });
        });
}

exports.viewOrderhistory = (request, response) => {
    orderModel.findOne({ userId: request.params.uid })
        .then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            return response.status(500).json(err);
        })
}
const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');
const { body } = require('express-validator');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: 'public/images',
    filename: function(request, file, callback) {
        callback(null, Date.now() + "-" + file.originalname);
    }
});

var upload = multer({ storage: storage });

router.post("/signup",
    body('userName').not().isEmpty(),
    body('email').not().isEmpty(),
    body('password').not().isEmpty(),
    adminController.signup);


router.post("/signin",
    body('email').not().isEmpty(),
    body('password').not().isEmpty(), adminController.signin);

router.post("/add-category", upload.single('categoryImage'),
    body('categoryName').not().isEmpty(), adminController.addCategory);

router.get("/view-users", adminController.viewUser);

router.get("/view-category-list", adminController.viewCategory);

router.delete("/delete-category/:id", adminController.deleteCategory);

router.post("/edit-category/:_id", upload.single('categoryImage'),
    body('packageName').not().isEmpty(), adminController.updateCategory);

router.post("/add-food", upload.array('foodImages'),
    body('foodName').not().isEmpty(),
    body('price').not().isEmpty(),
    body('quantity').not().isEmpty(),
    body('description').not().isEmpty(),
    body('discount').not().isEmpty(),
    adminController.addFood);


router.get("/view-food-list", adminController.viewFood);

router.delete("/delete-food/:foodId", adminController.deleteFood);

router.post("/edit-food/:foodId",
    upload.array('foodImages'),
    body('foodName').not().isEmpty(),
    body('Price').not().isEmpty(),
    body('quantity').not().isEmpty(),
    body('Description').not().isEmpty(),
    body('discount').not().isEmpty(), adminController.updateFood);



module.exports = router;